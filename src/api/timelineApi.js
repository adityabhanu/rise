import apiClient from "./apiClient";

/**
 * Upload timeline media to blob
 * Uses existing memorial SAS generation
 */
export const uploadTimelineMediaToBlob = async (
  memorialId,
  mediaFiles
) => {
  if (!mediaFiles) return { photos: [], video: [], audio: [] };

  // Reuse your existing SAS generator
  const res = await apiClient.get(
    `/utils/generate-upload-url?type=memorial&id=${memorialId}`
  );

  const { FullUploadUrl } = res || {};

  if (!FullUploadUrl) {
    throw new Error("Failed to generate SAS URL");
  }

  const [baseUrl, sas] = FullUploadUrl.split("?");

  const uploadSingle = async (folder, file) => {
    const relativePath = `timeline/${folder}/${file.name}`;
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
      throw new Error("Timeline blob upload failed");
    }

    return `${import.meta.env.VITE_BLOB_URL}memorial-uploads/${memorialId}/${relativePath}`;
  };

  const uploaded = {
    photos: [],
    video: [],
    audio: [],
  };

  const tasks = [];

  mediaFiles.photos?.forEach((file) => {
    tasks.push(
      uploadSingle("photos", file).then((url) =>
        uploaded.photos.push(url)
      )
    );
  });

  mediaFiles.video?.forEach((file) => {
    tasks.push(
      uploadSingle("videos", file).then((url) =>
        uploaded.video.push(url)
      )
    );
  });

  mediaFiles.audio?.forEach((file) => {
    tasks.push(
      uploadSingle("audio", file).then((url) =>
        uploaded.audio.push(url)
      )
    );
  });

  await Promise.all(tasks);

  return uploaded;
};

/**
 * FINAL STEP
 * Create timeline event
 */
export const createTimelineEvent = async (payload) => {
  try {
    const res = await apiClient.post(
      `/memorials/timeline`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res || null;
  } catch (err) {
    console.warn("Create Timeline Failed", err);
    return { error: true };
  }
};

/**
 * FULL FLOW
 * Upload media + save timeline
 */
export const saveTimelineEvent = async (
  memorialId,
  formData
) => {
  const uploadedMedia = await uploadTimelineMediaToBlob(
    memorialId,
    formData.mediaFiles
  );

  const finalPayload = {
    memorialId,
    title: formData.title,
    date: formData.date,
    description: formData.description,
    media: {
      photos: uploadedMedia.photos,
      video: uploadedMedia.video,
      audio: uploadedMedia.audio,
    },
  };

  return createTimelineEvent(finalPayload);
};