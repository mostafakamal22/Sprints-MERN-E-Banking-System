import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdmin } from "../Admin/Auth/adminAuthSlice";

export default function UseDetectAdmin() {
  const { info } = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();

  console.log("admin", info);

  useEffect(() => {
    if (info) {
      const adminData = {
        token: info.token,
        id: info.id,
      };
      console.log("get admin info");

      dispatch(getAdmin(adminData));
    }
  }, [admin]);

  return admin;
}
