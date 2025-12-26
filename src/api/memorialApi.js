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
    const dummyData = {
      Id: "6231d3e5-14d2-4990-9309-d2355628b701",
      FirstName: "test",
      MiddleName: "user",
      LastName: "test",
      Prefix: "Rev Fr",
      Suffix: "Sr",
      NickName: "test",
      MaidenName: "user",
      Gender: "male",
      DateOfBirth: "1990-05-19T00:00:00",
      DateOfDeath: "2023-08-20T00:00:00",
      Biography: "\u003Cp\u003Etes bio\u003C/p\u003E",
      DateOfBirthLocation: "North America, Belize",
      DateOfDeathLocation:
        "North America, United States of America, Connecticut",
      GraveMarkerIncludeAge: false,
      BurialInformation: {
        Id: "2527a04e-a779-4281-a4c5-e58a86b48d9f",
        BurialType: "Roseland",
        PlotNumber: "24",
        Longitude: "77.209000",
        Latitude: "28.613900",
        Inscription: "test ins",
        Gravesite: "test grave details",
        Cenotaph: false,
        Monument: true,
      },
      Veteran: true,
      Famous: false,
      CloseRelative: true,
      CemetryDetail: null,
      CreatedBy: "2de4bf04-792f-4d83-b775-e64423feb0d7",
      CreatedAt: "2025-12-26T06:27:49.2253726Z",
      UpdatedAt: null,
    };
    const res = await apiClient.get(
      `/memorials/${memorialId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res || dummyData;
  } catch (err) {
    console.warn("Get Memorial Failed", err);
    return null;
  }
};
