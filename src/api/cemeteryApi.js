import apiClient from "./apiClient";

export const createCemetery = async (payload) => {
  try {
    const cemeteryRes = await apiClient.post(`/cemeteries/create`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return cemeteryRes || null;
  } catch (err) {
    console.warn("Create Cemetery Failed", err);
    return null;
  }
};
