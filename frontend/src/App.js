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


function App() {
  return (

   
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AddStudent/>} />
      <Route path="/table" element={<DataTableTest/>}/>
     
    </Routes>
  </BrowserRouter>
    


//Commit1

  );
}

export default App;
