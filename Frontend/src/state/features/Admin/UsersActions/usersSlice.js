import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import usersServices from "./usersServices";

const initialState = {
  usersList: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

//Get All users
export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (adminData, thunkAPI) => {
    try {
      return await usersServices.getAllUsers(adminData);
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete User
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (payload, thunkAPI) => {
    try {
      return await usersServices.deleteUser(payload);
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Update User Status
export const updateUserStatus = createAsyncThunk(
  "admin/updateUserStatus",
  async (payload, thunkAPI) => {
    try {
      return await usersServices.updateUserStatus(payload);
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Logout
export const adminsLogout = createAsyncThunk("admins/logout", async () => {
  usersServices.adminsLogout();
});

export const usersSlice = createSlice({
  name: "UsersData",
  initialState,
  reducers: {
    resetUsersStatus: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
        state.usersList = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "User Deleted Successfully!";
        state.usersList = state.usersList.filter(
          (user) => Number(user._id) !== Number(action.payload.id)
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(updateUserStatus.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "User's Status Updated Successfully!";
        state.usersList = state.usersList.map((user) => {
          if (Number(user._id) === Number(action.payload._id)) {
            return action.payload;
          }
          return user;
        });
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(adminsLogout.fulfilled, (state) => {
        state.usersList = null;
      });
  },
});

export const { resetUsersStatus } = usersSlice.actions;

export default usersSlice.reducer;
