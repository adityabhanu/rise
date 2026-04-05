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


export const getMemorialList = async () => {
  try {
    const res = await apiClient.get(
      `/memorials/list`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res || null;
  } catch (err) {
    console.warn("Get Memorial List Failed", err);
    return null;
  }
};

export const deleteMemorial = async (memorialId) => {
  try {
    const res = await apiClient.delete(`/memorials/${memorialId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res || true;
  } catch (err) {
    console.warn("Delete Memorial Failed", err);
    return null;
  }
};

export const updateMemorial = async (memorialId, payload) => {
  try {
    const res = await apiClient.put(
      `/memorials/${memorialId}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res || null;
  } catch (err) {
    console.warn("Update Memorial Failed", err);
    return null;
  }
};