import React from "react";
import Hero from "./components/home/Hero";
import Motivation from "./components/home/Motivation";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Reviews from "./components/home/Reviews";

export const Index = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Motivation />
      <Reviews />
      <Footer />
    </>
  );
};
