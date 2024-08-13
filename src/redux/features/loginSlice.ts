import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  password: "",
};

const loginSLice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
});
export const { setName, setPassword } = loginSLice.actions;

export default loginSLice.reducer;
