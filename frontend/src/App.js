import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddStudent from "./components/customerRole/addstudent";
import "./App.css";
import "./css/DiscoverMoreCoversStyles.css";
import "./css/initial.css";
import "./css/home.css";
import React, { Component } from "react";
import MusicCover from "./components/customerRole/musiccoverpage";
import MusicCart from "./components/customerRole/music_cart";
import DashBoard from "./components/adminRole/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/c" element={<MusicCover />} />
        <Route path="/" element={<MusicCart />} />
        <Route path="/d" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
