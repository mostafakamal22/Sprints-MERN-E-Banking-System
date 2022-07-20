import "./App.css";
import Register from "./components/forms/Register";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProfilePage from "./views/ProfilePage";
import AdminProfilePage from "./views/admin/ProfilePage";
import NotFoundPage from "./views/NotFound";
import UpdateUser from "./components/forms/UpdateUser";
import UseDetectUser from "./features/Hooks/DetectUser";
import UseDetectAdmin from "./features/Hooks/DetectAdmin";
import AdminDashboard from "./views/admin/AdminDashboardPage";
import { NotificationOverView } from "./components/profile/NotificationOverView";
import { Notification } from "./components/profile/Notification";
import { ChooseAccount } from "./components/account/ChooseAccount";
import { Account } from "./components/account/Account";
import { IncomingTransactions } from "./components/account/IncomingTransactions";
import { OutgoingTransactions } from "./components/account/OutgoingTransactions";
import { Withdraw } from "./components/account/Withdraw";
import { Deposit } from "./components/account/Deposit";
import { Transfer } from "./components/account/Transfer";
import { AccountRequest } from "./components/forms/AccountRequest";
import UpdateAdminProfile from "./views/admin/UpdateProfilePage";
import { AdminLoginPage } from "./views/admin/AdminLoginPage";
import { UserLoginPage } from "./views/user/UserLoginPage";

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
          <Route index element={<UserLoginPage />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/admins/login" element={<AdminLoginPage />} />
          <Route exact path="/login" element={<UserLoginPage />} />
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
          <Route exact path="/account-request" element={<AccountRequest />} />
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
          <Route exact path="/account/withdraw/:id" element={<Withdraw />} />
          <Route exact path="/account/deposit/:id" element={<Deposit />} />
          <Route exact path="/account/transfer/:id" element={<Transfer />} />
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
          <Route
            exact
            path="/admins/profile/:id"
            element={<AdminProfilePage />}
          />
          <Route
            exact
            path="/admins/profile/:id/update"
            element={<UpdateAdminProfile />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
