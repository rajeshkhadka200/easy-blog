import React from "react";
import { Routes, Route } from "react-router-dom";

// components
import Nav from "./components/Nav";
// pages
import Community from "./pages/Community";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Markdown from "./pages/Markdown";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/app" element={<Dashboard />}></Route>
        <Route path="/markdown" element={<Markdown />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/all-blogs" element={<Community />}></Route>
      </Routes>
    </>
  );
}

export default App;
