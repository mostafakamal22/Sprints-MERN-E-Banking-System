import "./App.css";
import { useEffect } from "react";
import Register from "./components/forms/Register";
import Login from "./components/forms/Login";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProfilePage from "./views/ProfilePage";
import NotFoundPage from "./views/NotFound";
import UpdateUser from "./components/forms/UpdateUser";
import UseDetectUser from "./features/Hooks/DetectUser";
import UseDetectAdmin from "./features/Hooks/DetectAdmin";
import AdminLogin from "./components/forms/adminForms/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminProfile from "./components/profile/AdminProfile";
import UpdateAdmin from "./components/forms/adminForms/UpdateAdmin";
import { NotificationOverView } from "./components/profile/NotificationOverView";
import { Notification } from "./components/profile/Notification";
import { ChooseAccount } from "./components/account/ChooseAccount";
import { Account } from "./components/account/Account";
import { IncomingTransactions } from "./components/account/IncomingTransactions";
import { OutgoingTransactions } from "./components/account/OutgoingTransactions";
import { PaymentMethods } from "./components/payment/PaymentMethods";

function App() {
  //Detect user
  const user = UseDetectUser();
  //Detect admin
  const admin = UseDetectAdmin();

  return (
    <Router>
      {/* Guest Routes */}
      {!user && !admin && (
        <Routes>
          <Route index element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/admins/login" element={<AdminLogin />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}

      {/* Users Routes */}
      {user && !admin && (
        <Routes>
          <Route index element={<Home />} />
          <Route exact path="/register" element={<Navigate to={"/"} />} />
          <Route exact path="/login" element={<Navigate to={"/"} />} />
          <Route exact path="/profile/:id" element={<ProfilePage />} />
          <Route exact path="/profile/:id/update" element={<UpdateUser />} />
          <Route
            exact
            path="/notifications"
            element={<NotificationOverView />}
          />
          <Route exact path="/notifications/:id" element={<Notification />} />
          <Route exact path="/choose-account" element={<ChooseAccount />} />
          <Route exact path="/account/:id" element={<Account />} />
          <Route
            exact
            path="/account/in/:id"
            element={<IncomingTransactions />}
          />
          <Route
            exact
            path="/account/out/:id"
            element={<OutgoingTransactions />}
          />
          <Route
            exact
            path="/account/withdraw/:id"
            element={<PaymentMethods />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}

      {/* Admin Routes */}
      {admin && !user && (
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route exact path="/register" element={<Navigate to={"/"} />} />
          <Route exact path="/login" element={<Navigate to={"/"} />} />
          <Route exact path="/admins/login" element={<Navigate to={"/"} />} />
          <Route exact path="/admins/profile/:id" element={<AdminProfile />} />
          <Route
            exact
            path="/admins/profile/:id/update"
            element={<UpdateAdmin />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
