import apiClient from "./apiClient";

export const createMemorial = async (payload) => {
  try {
    const memorialRes = await apiClient.post(
      `/memorials/create`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return memorialRes || null;
  } catch (err) {
    console.warn("Create Memorial Failed", err);
    return null;
  }
};