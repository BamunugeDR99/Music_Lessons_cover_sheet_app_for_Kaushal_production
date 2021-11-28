import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddStudent from "./components/customerRole/addstudent";
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
import ViewStudentDetails from "./components/testingComponents/ViewStudentdetails";
import CustomerHeader from "./components/customerRole/CustomerHeaderTemp";
import CustomerFooter from "./components/customerRole/CustomerFooterTemp";
import MusicCart from "./components/customerRole/music_cart";
import Lessons from "./components/customerRole/TechniquesAndLessons";

import DataTableTest3 from "./components/dataTableTest";
import MusicCoverPage from "./components/customerRole/musiccoverpage";
import AdminHeader from "./components/adminRole/adminheader";
import AdminHeader2 from "./components/adminRole/adminHeader2";
import DashBoard from "./components/adminRole/dashboard";
import Login from "./components/customerRole/loginpage";
function App() {
  return (
    <BrowserRouter>
      <CustomerHeader />
      <Routes>
        <Route path="/" element={<LessonsAndCoversDetailed />} />
        <Route path="/a" element={<CustomerRegistration />} />
        <Route path="/b" element={<CustomerForgotPassword />} />
        {/* <Route path = "/c" element = {<DiscoverMoreCovers/>}/> */}
        <Route path="/table" element={<DataTableTest />} />
        <Route path="/d" element={<ViewCategories />} />
        <Route path="/e" element={<MainCategoriesDataTable />} />
        {/* <Route path="/e" element={<BootstrapDataTable />} /> */}
        <Route path="/f" element={<AddStudent />} />
        <Route path="/l" element={<Login />} />
        {/* <Route path="/g" element={<ViewStudentDetails/>} /> */}

        <Route path="/header" element={<AdminHeader2 />} />
        <Route path="/adminheader" element={<AdminHeader />} />
        <Route path="/musiccoverpage" element={<MusicCoverPage />} />
        <Route path="/table" element={<DataTableTest />} />
        <Route path="/table3" element={<DataTableTest3 />} />
        <Route path="/musiccart" element={<MusicCart />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
      <CustomerFooter />
    </BrowserRouter>

    //Commit1
  );
}

export default App;
