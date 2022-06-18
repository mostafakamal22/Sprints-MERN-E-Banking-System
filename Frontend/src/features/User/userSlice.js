import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userServices from "./userServices";

const initialState = {
  info: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

//Get User
export const getUser = createAsyncThunk(
  "user/getUser",
  async (userData, thunkAPI) => {
    try {
      return await userServices.getUser(userData);
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    resetUser: (state) => {
      (state.isLoading = false),
        (state.isError = false),
        (state.isSuccess = false),
        (state.message = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = true),
          (state.info = action.payload);
      })
      .addCase(getUser.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.message = action.payload),
          (state.info = null);
      });
  },
});

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;
