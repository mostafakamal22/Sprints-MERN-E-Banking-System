import { useEffect, useState } from "react";
import { FaMobileAlt } from "react-icons/fa";
import { Outlet } from "react-router-dom";

export const WindowFit = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (e) => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  let content = <Outlet />;

  if (windowWidth <= 800) {
    content = (
      <div className="w-full min-h-screen p-4 flex justify-center items-center">
        <div className="flex justify-center items-center flex-col gap-4 max-w-5xl min-h-[350px] w-full p-6 bg-slate-50 rounded shadow-lg shadow-black/30">
          <FaMobileAlt size={64} className="text-blue-500" />

          <p className="w-full my-4 p-6 text-lg md:text-xl text-center font-semibold bg-red-500 text-white border-r-4 border-red-800 rounded shadow max-w-lg">
            For a better experience, please use a device with a minimum width of
            800px.
          </p>
        </div>
      </div>
    );
  }
  return content;
};
