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
import { useDispatch, useSelector } from "react-redux";
import NotFoundPage from "./views/NotFound";
import { getUser, resetUserStatus } from "./features/User/userSlice";
import UpdateUser from "./components/forms/UpdateUser";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  console.log(user);

  useEffect(() => {
    if (user) {
      const userData = {
        token: user.token,
        id: user.id,
      };
      console.log("get user info");

      dispatch(getUser(userData));
    }
  }, [user]);

  return (
    <Router>
      {!user && (
        <Routes>
          <Route index element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}

      {user && (
        <Routes>
          <Route index element={<Home />} />
          <Route exact path="/register" element={<Navigate to={"/"} />} />
          <Route exact path="/login" element={<Navigate to={"/"} />} />
          <Route exact path="/profile/:id" element={<ProfilePage />} />
          <Route exact path="/profile/:id/update" element={<UpdateUser />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
