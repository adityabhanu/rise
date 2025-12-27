import apiClient from "./apiClient";

export const createMemorial = async (payload) => {
  try {
    const memorialRes = await apiClient.post(`/memorials/create`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return memorialRes || null;
  } catch (err) {
    console.warn("Create Memorial Failed", err);
    return null;
  }
};

export const getMemorialDetails = async (memorialId) => {
  try {
    const res = await apiClient.get(
      `/memorials/${memorialId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res || null;
  } catch (err) {
    console.warn("Get Memorial Failed", err);
    return null;
  }
};
