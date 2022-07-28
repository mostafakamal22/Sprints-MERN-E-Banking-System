import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../User/UserData/userSlice";

export default function UseDetectUser() {
  const { user } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const userData = {
        token: user.token,
        id: user.id,
      };

      dispatch(getUser(userData));
    }
  }, [user]);

  return user;
}
