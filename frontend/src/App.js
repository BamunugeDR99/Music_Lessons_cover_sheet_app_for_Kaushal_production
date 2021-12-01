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
import MusicCoverPage from "./components/customerRole/musiccoverpage";
import PurchaseHistory from "./components/customerRole/purchaseHistory";
import CustomerFeedback from "./components/customerRole/CustomerFeedback";
import AdminTempHeader from "./components/adminRole/adminHeaderTemp";

function App() {
  return (
    <BrowserRouter>
      <CustomerHeader />
      <Routes>
        <Route path="/" element={<LessonsAndCoversDetailed />} />
        <Route path="/a" element={<MusicCoverPage />} />
        <Route path="/register" element={<CustomerRegistration />} />
        <Route path= "/history" element={<PurchaseHistory/>}/>
         <Route path= "/feedback" element={<CustomerFeedback/>}/>

        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
