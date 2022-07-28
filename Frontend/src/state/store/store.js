import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/User/Auth/authSlice";
import userReducer from "../features/User/UserData/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import thunk from "redux-thunk";
import adminAuthReducer from "../features/Admin/Auth/adminAuthSlice";
import ownerReducer from "../features/Admin/Owener/ownerSlice";
import usersReducer from "../features/Admin/UsersActions/usersSlice";
import accountRequestsReducer from "../features/Admin/AccountRequests/accountRequestsSlice";
import accountReducer from "../features/Account/accountSlice";

const persistConfig = {
  key: "root",
  storage,
  //encrypting state being stored in localstorage
  transforms: [
    encryptTransform({
      secretKey: "sprintsBankingSystemUsingREDUXPERSIST",
      onError: function (error) {
        // Handle the error.
        console.log(error);
      },
    }),
  ],
};

const appReducer = combineReducers({
  userAuth: authReducer,
  userData: userReducer,
  userAccount: accountReducer,
  adminAuth: adminAuthReducer,
  ownerData: ownerReducer,
  usersData: usersReducer,
  accountRequests: accountRequestsReducer,
});

//All Logout actions
const logoutActions = [
  "user/logout",
  "account/logout",
  "auth/logout",
  "auth/admin/logout",
  "owner/logout",
  "admins/logout",
];

//remove All Stored state in local storage when logging out
const rootReducer = (state, action) => {
  if (logoutActions.includes(action.type)) {
    // for all keys defined in your persistConfig(s)
    storage.removeItem("persist:root");
    // storage.removeItem('persist:otherKey')

    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
