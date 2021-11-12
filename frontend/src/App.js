import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import AddStudent from "./components/addstudent";
import "./App.css";
import React, { Component } from "react";


function App() {
  return (

   
    <BrowserRouter>
    <Routes>
      <Route path="/add" element={<AddStudent/>} />
     
    </Routes>
  </BrowserRouter>
    


//Commit1

  );
}

export default App;
