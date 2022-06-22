import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import ownerServices from "./owenerServices";

const initialState = {
  adminsList: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

//Get All Admins
export const getAllAdmins = createAsyncThunk(
  "owner/admin/getAllAdmins",
  async (adminData, thunkAPI) => {
    try {
      return await ownerServices.getAllAdmins(adminData);
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete Admin
export const deleteAdmin = createAsyncThunk(
  "owner/admin/deleteAdmin",
  async (adminData, thunkAPI) => {
    try {
      return await ownerServices.deleteAdmin(adminData);
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Update Admin Role
export const updateAdminRole = createAsyncThunk(
  "owner/admin/updateAdminRole",
  async (adminData, thunkAPI) => {
    try {
      return await ownerServices.updateAdminRole(adminData);
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ownerSlice = createSlice({
  name: "OwnerData",
  initialState,
  reducers: {
    resetOwnerStatus: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAdmins.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getAllAdmins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
        state.adminsList = action.payload;
      })
      .addCase(getAllAdmins.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(deleteAdmin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
        state.adminsList = state.adminsList.filter(
          (admin) => admin.id !== action.payload.id
        );
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(updateAdminRole.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(updateAdminRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
        state.adminsList = state.adminsList.map((admin) => {
          if (admin.id === action.payload.id) {
            return action.payload;
          }
          return admin;
        });
      })
      .addCase(updateAdminRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

export const { resetOwnerStatus } = ownerSlice.actions;

export default ownerSlice.reducer;
