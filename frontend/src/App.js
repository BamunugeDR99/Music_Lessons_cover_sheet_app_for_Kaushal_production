import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddStudent from "./components/addstudent";
import "./App.css";
import "./css/DiscoverMoreCoversStyles.css";
import React, { Component } from "react";
import DataTableTest from "./components/dataTableTest";
import CustomerRegistration from "./components/customerRole/CustomerRegistration";
import CustomerForgotPassword from "./components/customerRole/CustomerForgotPassword";
import LessonsAndCoversDetailed from "./components/customerRole/LessonsAndCoversDetailed";
import ViewCategories from "./components/adminRole/ViewCategories";
import BootstrapDataTable from "./components/adminRole/BootstrapDataTable";
import MainCategoriesDataTable from "./components/adminRole/MainCategoriesDataTable";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LessonsAndCoversDetailed />} />
        <Route path="/a" element={<CustomerRegistration />} />
        <Route path="/b" element={<CustomerForgotPassword />} />
        {/* <Route path = "/c" element = {<DiscoverMoreCovers/>}/> */}
        <Route path="/table" element={<DataTableTest />} />
        <Route path="/d" element={<ViewCategories />} />
        <Route path="/e" element={<MainCategoriesDataTable />} />
        {/* <Route path="/e" element={<BootstrapDataTable />} /> */}

      </Routes>
    </BrowserRouter>

    //Commit1
  );
}

export default App;
