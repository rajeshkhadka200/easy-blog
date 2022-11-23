import React from "react";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import PopupContainer from "../components/PopupContainer";

const Home = () => {
  return (
    <>
      {/* <PopupContainer heading={"Thanks Mongo Db and Dev"} /> */}
      <Hero />
      <Features />
      <Footer />
    </>
  );
};

export default Home;
