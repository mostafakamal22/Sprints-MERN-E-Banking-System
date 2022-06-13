import React from "react";
export default function Home() {
  const token = localStorage.getItem("token");
  console.log(token);
  return <div className="text-center text-blue-800">Home</div>;
}
