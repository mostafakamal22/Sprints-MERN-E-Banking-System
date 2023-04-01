import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminProfilePage from "./views/admin/ProfilePage";
import NotFoundPage from "./views/NotFound";
import UseDetectUser from "./state/features/Hooks/DetectUser";
import UseDetectAdmin from "./state/features/Hooks/DetectAdmin";
import AdminDashboard from "./views/admin/AdminDashboardPage";
import UpdateAdminProfile from "./views/admin/UpdateProfilePage";
import { AdminLoginPage } from "./views/admin/AdminLoginPage";
import { UserLoginPage } from "./views/user/UserLoginPage";
import { RegisterPage } from "./views/guest/RegisterPage";
import { useSelector } from "react-redux";
import { MainSpinner } from "./components/shared/MainSpinner";
import { Index } from "./components/home/Index";
import { WindowFit } from "./components/shared/WindowFit";
import { MainLayout } from "./components/shared/MainLayout";
import { UserProfile } from "./components/profile/UserProfile";
import UpdateUser from "./components/forms/userForms/UpdateUser";
import { NotificationOverView } from "./components/profile/NotificationOverView";
import { Notification } from "./components/profile/Notification";
import { AccountRequest } from "./components/forms/userForms/AccountRequest";
import { IncomingTransactions } from "./components/account/IncomingTransactions";
import { OutgoingTransactions } from "./components/account/OutgoingTransactions";
import { Withdraw } from "./components/account/Withdraw";
import { Deposit } from "./components/account/Deposit";
import { Transfer } from "./components/account/Transfer";
import { DepositLogs } from "./components/account/DepositLogs";
import { WithdrawLogs } from "./components/account/WithdrawLogs";
import { RetrieveBalance } from "./components/account/RetrieveBalance";
import { Contact } from "./components/forms/userForms/Contact";
import { UnactiveSuspendedUser } from "./components/shared/UnactiveSuspendedUser";
import { Account } from "./components/account/Account";

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

  const spinnerSize = window.innerWidth < 400 ? 30 : 45;

  //Loading Spinner After Login Waiting Until UserData if Fetched.
  if (!info && !admin && isLoading)
    return (
      <div className="w-full min-h-screen">
        <div className="w-full h-full min-h-screen flex justify-center items-center mx-auto bg-slate-50">
          <MainSpinner spinnerSize={spinnerSize} />
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
          <Route element={<MainLayout />}>
            <Route index element={<Account />} />
            <Route exact path="/register" element={<Navigate to={"/"} />} />
            <Route exact path="/login" element={<Navigate to={"/"} />} />
            <Route exact path="/profile/:id" element={<UserProfile />} />
            <Route exact path="/profile/:id/update" element={<UpdateUser />} />
            <Route
              exact
              path="/notifications"
              element={<NotificationOverView />}
            />
            <Route exact path="/notifications/:id" element={<Notification />} />
            <Route exact path="/account-request" element={<AccountRequest />} />
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
            <Route
              exact
              path="/account/deposit-logs/:id"
              element={<DepositLogs />}
            />
            <Route
              exact
              path="/account/withdraw-logs/:id"
              element={<WithdrawLogs />}
            />
            <Route
              exact
              path="/retrieve-balance"
              element={<RetrieveBalance />}
            />
            <Route exact path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      )}

      {/*Unactive-Suspended Users Routes */}
      {user &&
        info?.userStatus !== 0 &&
        info?.userStatus !== undefined &&
        !admin && (
          <Routes>
            <Route element={<MainLayout />}>
              <Route
                index
                element={
                  <UnactiveSuspendedUser userStatus={info?.userStatus} />
                }
              />
              <Route exact path="/register" element={<Navigate to={"/"} />} />
              <Route exact path="/login" element={<Navigate to={"/"} />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        )}

      {/* Admin Routes */}
      {admin && !user && (
        <Routes>
          <Route element={<WindowFit />}>
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
          </Route>
        </Routes>
      )}
    </Router>
  );
}

export default App;
