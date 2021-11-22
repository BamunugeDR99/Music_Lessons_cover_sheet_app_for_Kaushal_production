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
import Footer from "./components/customerRole/footer";
import ViewCovers from "./components/adminRole/ViewCovers";
import CoverManagementPage from "./components/adminRole/CoverManagementPage";
import ViewLessons from "./components/adminRole/ViewLessons";
function App() {
  return (
    <BrowserRouter>
      <CustomerHeader />
      <Routes>
        <Route path="/" element={<LessonsAndCoversDetailed />} />
        <Route path="/b" element={<CustomerForgotPassword />} />

        <Route path="/CoverManagement" element={<CoverManagementPage />} />
        <Route path="/c" element={<ViewCovers />} />
        <Route path="/d" element={<ViewLessons />} />
        

        {/* <Route path="/a" element={<CustomerRegistration />} /> */}
        {/* <Route path = "/c" element = {<DiscoverMoreCovers/>}/> */}
        {/* <Route path="/table" element={<DataTableTest />} /> */}
        {/* <Route path="/d" element={<ViewCategories />} /> */}
        {/* <Route path="/e" element={<MainCategoriesDataTable />} /> */}
        {/* <Route path="/e" element={<BootstrapDataTable />} /> */}
        {/* <Route path="/f" element={<AddStudent />} /> */}
        {/* <Route path="/g" element={<ViewStudentDetails/>} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
