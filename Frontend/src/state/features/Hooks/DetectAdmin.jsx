import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdmin } from "../Admin/Auth/adminAuthSlice";

export default function UseDetectAdmin() {
  const { info } = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (info) {
      const adminData = {
        token: info.token,
        id: info.id,
      };

      dispatch(getAdmin(adminData));
    }
  }, []);

  return info;
}
