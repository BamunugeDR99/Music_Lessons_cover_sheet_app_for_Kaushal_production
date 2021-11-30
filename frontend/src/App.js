import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddStudent from "./components/customerRole/addstudent";
import "./App.css";
import "./css/DiscoverMoreCoversStyles.css";
import "./css/initial.css";
import "./css/home.css";
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
import Footer from "./components/customerRole/footer";
import ViewCovers from "./components/adminRole/ViewCovers";
import CoverManagementPage from "./components/adminRole/CoverManagementPage";
import ViewLessons from "./components/adminRole/ViewLessons";
import AdminHeader from "./components/adminRole/adminheader";
import Login from "./components/customerRole/loginpage";
import DiscoverMoreCovers from "./components/customerRole/DicoverMoreCovers";
import CoverUpdate from "./components/adminRole/CoverUpdate";
import ViewDetailedCoverPage from "./components/adminRole/ViewDetailedCoverPage";
import MusicCoverPage from "./components/customerRole/musiccoverpage";
import PurchaseHistory from "./components/customerRole/purchaseHistory";
import AddStudent2 from "./components/customerRole/addStudent2";

function App() {
  return (
    <BrowserRouter>
        <CustomerHeader/>

      <Routes>
       <Route path = "/f" element = {<LessonsAndCoversDetailed/>}/>
       <Route path = "/b" element = {<AddStudent/>}/>

      </Routes>
      <Routes>

      </Routes>
      <Footer/>
    </BrowserRouter>

    //Commit1
  );
}

export default App;
