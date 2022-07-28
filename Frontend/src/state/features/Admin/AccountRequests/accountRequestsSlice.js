import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import accountRequestsServices from "./accountRequestsServices";

const initialState = {
  accountRequestsList: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

//Get All Account Requests
export const getAllAccountRequests = createAsyncThunk(
  "admin/getAllAccountRequests",
  async (adminData, thunkAPI) => {
    try {
      return await accountRequestsServices.getAllAccountRequests(adminData);
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Decline Account Request
export const declineAccountRequest = createAsyncThunk(
  "admin/declineAccountRequest",
  async (payload, thunkAPI) => {
    try {
      return await accountRequestsServices.declineAccountRequest(payload);
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Approve Account Request
export const ApproveAccountRequest = createAsyncThunk(
  "admin/ApproveAccountRequest",
  async (payload, thunkAPI) => {
    try {
      return await accountRequestsServices.ApproveAccountRequest(payload);
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Logout
export const adminsLogoutRequets = createAsyncThunk(
  "admins/logout",
  async () => {
    accountRequestsServices.adminsLogout();
  }
);

export const accountRequestsSlice = createSlice({
  name: "AccountRequests",
  initialState,
  reducers: {
    resetAccountRequestsStatus: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAccountRequests.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getAllAccountRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
        state.accountRequestsList = action.payload;
      })
      .addCase(getAllAccountRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(declineAccountRequest.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(declineAccountRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Request Declined Successfully!";
        state.accountRequestsList = state.accountRequestsList.filter(
          (request) => request._id !== action.payload.id
        );
      })
      .addCase(declineAccountRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(ApproveAccountRequest.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(ApproveAccountRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Request Approved Successfully!";
        state.accountRequestsList = state.accountRequestsList.filter(
          (request) => request._id !== action.payload.id
        );
      })
      .addCase(ApproveAccountRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(adminsLogoutRequets.fulfilled, (state) => {
        state.accountRequestsList = null;
      });
  },
});

export const { resetAccountRequestsStatus } = accountRequestsSlice.actions;

export default accountRequestsSlice.reducer;
