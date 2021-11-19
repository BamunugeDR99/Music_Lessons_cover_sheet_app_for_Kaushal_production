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
import Header2 from "./components/customerRole/header2";
import InitialPage from "./components/customerRole/initialpage";
import Test from "./components/customerRole/test";

function App() {
  return (

   
    <BrowserRouter>
      <Header2/>
    <Routes>
      
    
      <Route path="/table" element={<DataTableTest/>}/>
      <Route path="/test" element={<Test/>}/>
      <Route path="/cart" element={<MusicCart/>}/>
      <Route path="/cart2" element={<MusicCart2/>}/>
      <Route path="/login" element={<Login/>}/>
    
   
     
    </Routes>

  </BrowserRouter>
    



  );
}

export default App;
