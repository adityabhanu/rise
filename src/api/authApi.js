import apiClient from "./apiClient";

export const loginUser = async (payload) => {
  const loginRes = await apiClient.post("/auth/login", payload);
  if (!loginRes?.success) {
    return loginRes;
  }
  const userId = loginRes.user?.id;

  // const profilePic = userId ? await fetchUserProfilePic(userId) : null;

  return {
    ...loginRes,
    user: {
      ...loginRes.user,
      profilePic: `${import.meta.env.VITE_BLOB_URL}profile-uploads/${userId}`,
    },
  };
};

export const fetchUserProfilePic = async (userId) => {
  try {
    const profileRes = await apiClient.patch(
      `/auth/users/${userId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return profileRes?.profilePic || null;
  } catch (err) {
    console.warn("Profile image fetch failed", err);
    return null;
  }
};

export const registerUser = (payload) => {
  return apiClient.post("/auth/register", payload);
};

export const uploadProfileImage = async (userId, file) => {
  // Ask backend for SAS / Blob upload details
  const sasResponse = await apiClient.get(
    `/utils/generate-upload-url?type=profile&id=${userId} `,
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { FullUploadUrl, BlobPath, ExpiresAt } = sasResponse;

  if (!FullUploadUrl) {
    throw new Error("Failed to get blob upload URL");
  }

  // Upload file directly to Azure Blob Storage
  const uploadRes = await fetch(FullUploadUrl, {
    method: "PUT",
    headers: {
      "x-ms-blob-type": "BlockBlob",
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error("Azure blob upload failed");
  }

  return {
    blobPath: BlobPath,
    expiresAt: ExpiresAt,
  };
};
