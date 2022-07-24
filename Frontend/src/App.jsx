import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProfilePage from "./views/user/ProfilePage";
import AdminProfilePage from "./views/admin/ProfilePage";
import NotFoundPage from "./views/NotFound";
import UseDetectUser from "./features/Hooks/DetectUser";
import UseDetectAdmin from "./features/Hooks/DetectAdmin";
import AdminDashboard from "./views/admin/AdminDashboardPage";
import { ChooseAccount } from "./components/account/ChooseAccount";
import { Account } from "./components/account/Account";
import UpdateAdminProfile from "./views/admin/UpdateProfilePage";
import { AdminLoginPage } from "./views/admin/AdminLoginPage";
import { UserLoginPage } from "./views/user/UserLoginPage";
import { HomePage } from "./views/user/HomePage";
import { AccountRequestPage } from "./views/user/AccountRequestPage";
import { NotificationsPage } from "./views/user/NotificationsPage";
import { UpdateProfilePage } from "./views/user/UpdateProfilePage";
import { RegisterPage } from "./views/guest/RegisterPage";
import { NotificationPage } from "./views/user/NotificationPage";
import { DepositPage } from "./views/user/DepositPage";
import { WithdrawPage } from "./views/user/WithdrawPage";
import { TransferPage } from "./views/user/TransferPage";
import { OutgoingTransactionsPage } from "./views/user/OutgoingTransactionsPage";
import { IncomingTransactionsPage } from "./views/user/IncomingTransactionsPage";
import { DepositLogsPage } from "./views/user/DepositLogsPage";
import { WithdrawLogsPage } from "./views/user/WithdrawLogsPage";

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
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/admins/login" element={<AdminLoginPage />} />
          <Route exact path="/login" element={<UserLoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}

      {/* Users Routes */}
      {user && !admin && (
        <Routes>
          <Route index element={<HomePage />} />
          <Route exact path="/register" element={<Navigate to={"/"} />} />
          <Route exact path="/login" element={<Navigate to={"/"} />} />
          <Route exact path="/profile/:id" element={<ProfilePage />} />
          <Route
            exact
            path="/profile/:id/update"
            element={<UpdateProfilePage />}
          />
          <Route exact path="/notifications" element={<NotificationsPage />} />
          <Route
            exact
            path="/notifications/:id"
            element={<NotificationPage />}
          />
          <Route
            exact
            path="/account/in/:id"
            element={<IncomingTransactionsPage />}
          />
          <Route
            exact
            path="/account/out/:id"
            element={<OutgoingTransactionsPage />}
          />
          <Route
            exact
            path="/account/withdraw/:id"
            element={<WithdrawPage />}
          />
          <Route exact path="/account/deposit/:id" element={<DepositPage />} />
          <Route
            exact
            path="/account/transfer/:id"
            element={<TransferPage />}
          />
          <Route
            exact
            path="/account/deposit-logs/:id"
            element={<DepositLogsPage />}
          />
          <Route
            exact
            path="/account/withdraw-logs/:id"
            element={<WithdrawLogsPage />}
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
