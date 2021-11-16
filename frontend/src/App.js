import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import AddStudent from "./components/addstudent";
import "./App.css";
import React, { Component } from "react";
import DataTableTest from "./components/dataTableTest";
import MusicCart from "./components/customerRole/music_cart";
import MusicCart2 from "./components/customerRole/music_cart2";
import Footer from "./components/customerRole/footer";
import Login from "./components/customerRole/loginpage";
import MainHeader from "./components/customerRole/header";

function App() {
  return (

   
    <BrowserRouter>
    <MainHeader/>
    <Routes>
      <Route path="/" element={<AddStudent/>} />
      <Route path="/table" element={<DataTableTest/>}/>
      <Route path="/cart" element={<MusicCart/>}/>
      <Route path="/cart2" element={<MusicCart2/>}/>
      <Route path="/login" element={<Login/>}/>
 
     
    </Routes>
    <Footer/>
  </BrowserRouter>
    



  );
}

export default App;
