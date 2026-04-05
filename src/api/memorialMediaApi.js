import apiClient from "./apiClient";

/**
 * Media folder mapping inside blob
 *
 * memorial-uploads/{memorialId}/<folder>/<file>
 */
const MEDIA_FOLDERS = {
  photos: "photos",
  footprints: "footprints",
  familyPhotos: "familyphotos",
  weddingPhotos: "weddingphotos",
  videos: "videos",
  voiceNotes: "voicenotes",
  handwrittenNotes: "notes",
};

/**
 * STEP 1
 * Generate ONE SAS URL for a memorial upload session
 */
export const generateMemorialUploadSas = async (memorialId) => {
  try {
    const res = await apiClient.get(
      `/utils/generate-upload-url?type=memorial&id=${memorialId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const { FullUploadUrl, ExpiresAt } = res || {};

    if (!FullUploadUrl) {
      throw new Error("Failed to generate memorial SAS");
    }

    return {
      uploadBaseUrl: FullUploadUrl, // already points to memorialId
      expiresAt: ExpiresAt,
    };
  } catch (err) {
    console.warn("Generate memorial SAS failed", err);
    throw err;
  }
};

/**
 * STEP 2
 * Upload ONE file to Azure Blob using SAS
 */
const uploadFileToBlob = async ({ uploadBaseUrl, relativePath, file }) => {
  const [baseUrl, sas] = uploadBaseUrl.split("?");

  const uploadUrl = `${baseUrl}/${relativePath}?${sas}`;

  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "x-ms-blob-type": "BlockBlob",
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error(`Blob upload failed for ${relativePath}`);
  }

  return uploadUrl.split("?")[0]; // public blob URL
};

/**
 * STEP 3
 * Upload ALL memorial media to blob
 */
export const uploadMemorialMediaToBlob = async (memorialId, mediaFiles) => {
  const { uploadBaseUrl } = await generateMemorialUploadSas(memorialId);

  const uploadedMedia = {
    photos: [],
    footprints: [],
    familyPhotos: [],
    weddingPhotos: [],
    videos: [],
    voiceNotes: [],
    handwrittenNotes: [],
  };

  const uploadTasks = [];

  Object.entries(MEDIA_FOLDERS).forEach(([key, folder]) => {
    const files = mediaFiles[key];
    if (!Array.isArray(files) || files.length === 0) return;

    files.forEach((file) => {
      const safeFileName = `${file.name}`;

      const relativePath = `${folder}/${safeFileName}`;

      uploadTasks.push(
        uploadFileToBlob({
          uploadBaseUrl,
          relativePath,
          file,
        }).then((url) => {
          uploadedMedia[key].push(
            `${import.meta.env.VITE_BLOB_URL}memorial-uploads/${memorialId}/${relativePath}`,
          );
        }),
      );
    });
  });

  await Promise.all(uploadTasks);
  return uploadedMedia;
};

/**
 * STEP 4
 * PATCH uploaded media URLs to backend
 */
export const updateMemorialMedia = async (memorialId, mediaPayload) => {
  try {
    const payload = {};

    Object.entries(mediaPayload || {}).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        payload[key] = value.length ? JSON.stringify(value) : "[]";
      } else {
        payload[key] = null;
      }
    });

    // 🚫 Nothing to update
    if (Object.keys(payload).length === 0) {
      return null;
    }

    const res = await apiClient.patch(
      `/memorials/${memorialId}/media`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return res || null;
  } catch (err) {
    console.warn("Update Memorial Media Failed", err);
    return null;
  }
};

/**
 * STEP 5 (FINAL)
 * Upload all media + update DB
 */
export const saveMemorialMedia = async (memorialId, mediaFiles) => {
  // 1️⃣ Separate existing vs new
  const existingMedia = {};
  const newMedia = {};

  Object.entries(mediaFiles || {}).forEach(([key, items]) => {
    if (!Array.isArray(items)) return;

    existingMedia[key] = items.filter((i) => typeof i === "string");
    newMedia[key] = items.filter((i) => i instanceof File);
  });

  // 2️⃣ Upload new files
  const uploadedMedia = await uploadMemorialMediaToBlob(memorialId, newMedia);

  // 3️⃣ Merge existing + uploaded
  const finalMediaPayload = {};

  Object.keys(MEDIA_FOLDERS).forEach((key) => {
    const existing = existingMedia[key] || [];
    const uploaded = uploadedMedia[key] || [];

    const combined = [...existing, ...uploaded];

    // IMPORTANT: send even empty array []
    finalMediaPayload[key] = combined;
  });

  // 4️⃣ Call PATCH API
  return updateMemorialMedia(memorialId, finalMediaPayload);
};
