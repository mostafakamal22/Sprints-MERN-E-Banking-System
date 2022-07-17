import { useEffect } from "react";

//reset state when component mounts or unmount
export const UseResetStatus = (resetFunction) => useEffect(resetFunction, []);
