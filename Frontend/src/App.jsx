import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProfilePage from "./views/user/ProfilePage";
import AdminProfilePage from "./views/admin/ProfilePage";
import NotFoundPage from "./views/NotFound";
import UseDetectUser from "./state/features/Hooks/DetectUser";
import UseDetectAdmin from "./state/features/Hooks/DetectAdmin";
import AdminDashboard from "./views/admin/AdminDashboardPage";
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
import { ContactPage } from "./views/user/ContactPage";
import { useSelector } from "react-redux";
import { UnactiveSuspendedUserPage } from "./views/user/UnactiveSuspendedUserPage";
import { MainSpinner } from "./components/shared/MainSpinner";
import { Index } from "./components/home/Index";
import { RetrieveBalancePage } from "./views/user/RetrieveBalancePage";

function App() {
  //Detect user
  const user = UseDetectUser();
  //Detect admin
  const admin = UseDetectAdmin();

  const { info, isLoading } = useSelector((state) => state.userData);

  //User And Admin Paths
  const paths = [
    "/profile",
    "/profile/:id",
    "/profile/:id/update",
    "/notifications",
    "/notifications/:id",
    "/account-request",
    "/account/in/:id",
    "/account/out/:id",
    "/account/withdraw/:id",
    "/account/transfer/:id",
    "/account/deposit/:id",
    "/account/deposit-logs/:id",
    "/account/withdraw-logs/:id",
    "/contact",
    "/admins/profile/:id",
    "/admins/profile/:id/update",
  ];

  //Loading Spinner After Login Waiting Until UserData if Fetched.
  if (!info && !admin && isLoading)
    return (
      <div className="mx-5 h-min-screen">
        <div className="max-w-5xl w-full h-full flex justify-center items-center mx-auto my-10 p-6 bg-slate-50 rounded shadow-lg shadow-black/30">
          <div className="flex justify-center items-center">
            <MainSpinner />
          </div>
        </div>
      </div>
    );

  return (
    <Router>
      {/* Guest Routes */}
      {!user && !admin && (
        <Routes>
          <Route index element={<Index />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/admins/login" element={<AdminLoginPage />} />
          <Route exact path="/login" element={<UserLoginPage />} />
          {paths.map((stringPath) => (
            <Route
              key={"Home"}
              exact
              path={stringPath}
              element={<Navigate to={"/"} />}
            />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}

      {/*Active Users Routes */}
      {user && info?.userStatus === 0 && !admin && (
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
            path="/account-request"
            element={<AccountRequestPage />}
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
          <Route
            exact
            path="/retrieve-balance"
            element={<RetrieveBalancePage />}
          />
          <Route exact path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}

      {/*Unactive-Suspended Users Routes */}
      {user && info?.userStatus !== 0 && !admin && (
        <Routes>
          <Route index element={<UnactiveSuspendedUserPage />} />
          <Route exact path="/register" element={<Navigate to={"/"} />} />
          <Route exact path="/login" element={<Navigate to={"/"} />} />
          <Route exact path="/contact" element={<ContactPage />} />
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
