import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddStudent from "./components/customerRole/addstudent";
import "./App.css";
import "./css/DiscoverMoreCoversStyles.css";
import React, { Component } from "react";
import CustomerRegistration from "./components/customerRole/CustomerRegistration";
import CustomerForgotPassword from "./components/customerRole/CustomerForgotPassword";
import LessonsAndCoversDetailed from "./components/customerRole/LessonsAndCoversDetailed";
import CustomerHeader from "./components/customerRole/CustomerHeaderTemp";
import Footer from "./components/customerRole/footer";
import ViewCovers from "./components/adminRole/ViewCovers";
import CoverManagementPage from "./components/adminRole/CoverManagementPage";
import ViewLessons from "./components/adminRole/ViewLessons";
import AdminHeader from "./components/adminRole/adminheader";
import Login from "./components/customerRole/loginpage";
import DiscoverMoreCovers from "./components/customerRole/DicoverMoreCovers";
import CoverUpdate from "./components/adminRole/CoverUpdate";
import ViewDetailedCoverPage from "./components/adminRole/ViewDetailedCoverPage";

function App() {
  return (
    <BrowserRouter>
      <CustomerHeader />
      <Routes>
        <Route path="/" element={<LessonsAndCoversDetailed />} />
        <Route path="/b" element={<CustomerForgotPassword />} />

        <Route path="/CoverManagement" element={<CoverManagementPage />} />
        <Route path="/c" element={<ViewCovers />} />
        <Route path = "/h" element = {<CoverUpdate/>}/>
        <Route path = "/detailed/:id" element = {<ViewDetailedCoverPage/>}/>
        <Route path="/d" element={<ViewLessons />} />
        <Route path = "/e" element = {<AdminHeader/>}/>

        <Route path="/a" element={<CustomerRegistration />} />
        <Route path="/login" element={<Login />} />

        <Route path = "/g" element = {<DiscoverMoreCovers/>}/>
        {/* <Route path="/table" element={<DataTableTest />} /> */}
        {/* <Route path="/d" element={<ViewCategories />} /> */}
        {/* <Route path="/e" element={<MainCategoriesDataTable />} /> */}
        {/* <Route path="/e" element={<BootstrapDataTable />} /> */}
        {/* <Route path="/f" element={<AddStudent />} /> */}
        {/* <Route path="/g" element={<ViewStudentDetails/>} /> */}
        <Route path="/feedback" element={<CustomerFeedback/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
