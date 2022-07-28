import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/styles/App.css";
import "./assets/styles/index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./state/store/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
