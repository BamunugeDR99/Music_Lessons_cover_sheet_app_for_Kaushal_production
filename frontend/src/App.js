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
import CustomerRegistration from "./components/customerRole/CustomerRegistration";
import CustomerForgotPassword from "./components/customerRole/CustomerForgotPassword";

function App() {
  return (

   
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<CustomerForgotPassword/>} />
      <Route path="/table" element={<DataTableTest/>}/>
     
    </Routes>
  </BrowserRouter>
    


//Commit1

  );
}

export default App;
