import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddStudent from "./components/customerRole/addstudent";
import "./App.css";
import "./css/DiscoverMoreCoversStyles.css";
import "./css/initial.css";
import "./css/home.css";
import React, { Component } from "react";
import CustomerFeedback from "./components/customerRole/CustomerFeedback";
import CustomerRegistration from "./components/customerRole/CustomerRegistration";
import CustomerHeader from "./components/customerRole/CustomerHeaderTemp";


function App() {
  return (
    <BrowserRouter>
       <CustomerHeader/>
      <Routes>
        <Route path="/feedback" element={<CustomerFeedback/>}/>
        <Route path="/register" element={<CustomerRegistration/>}/>
     
      </Routes>
    </BrowserRouter>
  );
}

export default App;
