import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
      </Routes>
    </>
  );
}

export default App;
