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
import CustomTable from "./components/CustomTable";
import AdminFeedback2 from "./components/AdminFeedback2";
import UserManagement2 from "./components/UserManagement2";


function App() {
  return (

   
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AddStudent/>} />
      <Route path="/table" element={<DataTableTest/>}/>
      <Route path="/history" element={<PurchaseHistory/>}/>
      <Route path="/feedback" element={<AdminFeedback/>}/>
      <Route path="/user" element={<UserManagement/>}/>
      <Route path="/custom" element={<CustomTable/>}/>
      <Route path="/feedback2" element={<AdminFeedback2/>}/>
      <Route path="/user2" element={<UserManagement/>}/>

    </Routes>
  </BrowserRouter>
    


//Commit1

  );
}

export default App;
