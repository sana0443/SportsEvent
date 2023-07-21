// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  full_name: "",
  email: "",
  phone_number: "",
  age: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.full_name = action.payload.full_name;
      state.email = action.payload.email;
      state.phone_number = action.payload.phone_number;
      state.age = action.payload.age;
    },
    userLogout: (state) => {
      return initialState;
    }
  }
});

export const { setUserDetails, userLogout } = userSlice.actions;
export default userSlice.reducer;
