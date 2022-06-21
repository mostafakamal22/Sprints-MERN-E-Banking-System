import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../User/userSlice";

export default function UseDetectUser() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log("user", user);

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

  return user;
}
