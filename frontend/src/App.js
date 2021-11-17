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
import PurchaseHistory from "./components/purchaseHistory";
import AdminFeedback from "./components/AdminFeedback";
import UserManagement from "./components/UserManagement";


function App() {
  return (

   
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AddStudent/>} />
      <Route path="/table" element={<DataTableTest/>}/>
      <Route path="/history" element={<PurchaseHistory/>}/>
      <Route path="/feedback" element={<AdminFeedback/>}/>
      <Route path="/User" element={<UserManagement/>}/>

    </Routes>
  </BrowserRouter>
    


//Commit1

  );
}

export default App;
