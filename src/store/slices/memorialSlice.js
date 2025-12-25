import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  draft: {
    name: {
      firstName: "",
      middleName: "",
      lastName: "",
      prefix: "",
      suffix: "",
      nickname: "",
      maidenName: "",
      gender: "",
    },
    lifeEvents: {
      birth: {
        day: "",
        month: "",
        year: "",
        location: "",
      },
      death: {
        day: "",
        month: "",
        year: "",
        location: "",
      },
      ageAtDeath: {
        enabled: false,
        years: "",
        months: "",
        days: "",
      },
    },
  },
};

const memorialSlice = createSlice({
  name: "memorial",
  initialState,
  reducers: {
    updateName(state, action) {
      state.draft.name = {
        ...state.draft.name,
        ...action.payload,
      };
    },

    updateBirth(state, action) {
      state.draft.lifeEvents.birth = {
        ...state.draft.lifeEvents.birth,
        ...action.payload,
      };
    },

    updateDeath(state, action) {
      state.draft.lifeEvents.death = {
        ...state.draft.lifeEvents.death,
        ...action.payload,
      };
    },

    updateAgeAtDeath(state, action) {
      state.draft.lifeEvents.ageAtDeath = {
        ...state.draft.lifeEvents.ageAtDeath,
        ...action.payload,
      };
    },
  },
});

export const {
  updateName,
  updateBirth,
  updateDeath,
  updateAgeAtDeath,
} = memorialSlice.actions;

export default memorialSlice.reducer;
