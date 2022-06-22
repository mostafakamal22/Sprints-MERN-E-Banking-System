import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import userReducer from "../features/User/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import thunk from "redux-thunk";
import adminAuthReducer from "../features/Admin/Auth/adminAuthSlice";
import ownerReducer from "../features/Admin/Owener/ownerSlice";

const persistConfig = {
  key: "root",
  storage,
  //encrypting state being stored in localstorage
  transforms: [
    encryptTransform({
      secretKey: "my-super-secret-key",
      onError: function (error) {
        // Handle the error.
        console.log(error);
      },
    }),
  ],
};

const appReducer = combineReducers({
  auth: authReducer,
  data: userReducer,
  adminAuth: adminAuthReducer,
  ownerData: ownerReducer,
});

//All Logout actions
const logoutActions = ["user/logout", "auth/logout", "auth/admin/logout"];

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
