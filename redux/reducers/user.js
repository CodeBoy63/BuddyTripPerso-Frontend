import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  value: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state, action) => {
      state.value = initialState.value;
    },
    update: (state, action) => {
      const { username, email, image, friends } = action.payload;
      if (username) {
        state.value.username = username;
      }
      if (email) {
        state.value.email = email;
      }
      if (image) {
        state.value.image = image;
      }
      if (friends) {
        state.value.friends = friends;
      }
    },
  },
});

export const { login, logout, update } = userSlice.actions;
export default userSlice.reducer;
