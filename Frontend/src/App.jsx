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

function App() {
  //Detect user
  const user = UseDetectUser();
  //Detect admin
  const admin = UseDetectAdmin();

  useEffect(() => {
    console.log(user);
    console.log(admin);
  }, [user, admin]);

  return (
    <Router>
      {/* Guest Routes */}
      {!user && !admin && (
        <Routes>
          <Route index element={<Login />} />
          <Route exact path="/register" element={<Register />} />
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}

      {/* Admin Routes */}
      {admin && !user && (
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
