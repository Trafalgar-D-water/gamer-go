import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: '',
  email: '',
  bio: '',
  avatar: '',
  role: { isPlayer: true, isCoach: false },
  skills: [],
  gamePreferences: [],
  rank: '',
  coachProfile: {
    experience: '',
    coachingSpecializations: [],
    rates: 0,
    availability: { days: [], times: { start: '', end: '' } },
  },
  preferences: { theme: 'dark', notifications: true },
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    fetchProfileStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProfileSuccess(state, action) {
      const { data } = action.payload;
      return { ...state, ...data, loading: false, error: null };
    },
    fetchProfileFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileField(state, action) {
      const { field, value } = action.payload;
      return { ...state, [field]: value };
    },
  },
});

export const { fetchProfileStart, fetchProfileSuccess, fetchProfileFailure, updateProfileField } = profileSlice.actions;

export default profileSlice.reducer;