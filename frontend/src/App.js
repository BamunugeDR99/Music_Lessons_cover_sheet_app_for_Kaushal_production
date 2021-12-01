import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddStudent from "./components/customerRole/addstudent";
import "./App.css";
import "./css/DiscoverMoreCoversStyles.css";
import "./css/initial.css";
import "./css/home.css";
import React, { Component } from "react";
import EditMainCategories from "./components/adminRole/EditMainCategory";
import AdminVwCustomer from "./components/adminRole/AdminVwCustomer";
import PurchaseHistory from "./components/customerRole/purchaseHistory";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EditMainCategories/>}/>
        <Route path="/a" element={<AdminVwCustomer/>}/>
        <Route path="/b" element={<PurchaseHistory/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
