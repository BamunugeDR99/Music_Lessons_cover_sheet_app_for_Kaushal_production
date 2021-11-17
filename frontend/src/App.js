import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddStudent from "./components/addstudent";
import AddCustomerStudent from "./components/customerRole/addstudent";
import "./App.css";
import React, { Component } from "react";
import DataTableTest from "./components/dataTableTest";
import MusicCoverPage from "./components/customerRole/musiccoverpage";
import AdminHeader from "./components/adminRole/adminheader";

function App() {
  return (
    <BrowserRouter>
   
      <Routes>
        {/* <Route path="/" element={<AddStudent />} /> */}
        <Route path="/customer" element={<AddCustomerStudent />} />
        <Route path="/adminheader" element={<AdminHeader />} />
        <Route path="/musiccoverpage" element={<MusicCoverPage />} />
        <Route path="/table" element={<DataTableTest />} />
      </Routes>
    </BrowserRouter>

    //Commit1
  );
}

export default App;
