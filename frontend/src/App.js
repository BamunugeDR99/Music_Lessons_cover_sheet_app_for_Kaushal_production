// import doms
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import css 
import "./App.css";
import "./css/DiscoverMoreCoversStyles.css";
import "./css/initial.css";
import "./css/home.css";

// import components (Customer)
import InitialPage from "./components/customerRole/initialpage";
import CustomerHeaderTemp from "./components/customerRole/CustomerHeaderTemp";
import Loginpage from "./components/customerRole/loginpage";
import CustomerRegistration from "./components/customerRole/CustomerRegistration";
import CustomerForgotPassword from "./components/customerRole/CustomerForgotPassword";
import Home from "./components/customerRole/home";
import MusicCoverPage from "./components/customerRole/musiccoverpage";
import TechniquesAndLessons from "./components/customerRole/TechniquesAndLessons";
import PurchaseHistory from "./components/customerRole/purchaseHistory";
import MusicCart from "./components/customerRole/music_cart";
import LessonAndCoversDetailed from "./components/customerRole/LessonsAndCoversDetailed";
import Footer from "./components/customerRole/footer";

// import components (Admin)
// import AdminLogin from "./components/adminRole/adminLogin";
// import AdminHeaderTemp from "./components/adminRole/adminHeaderTemo";
// import Dashboard from "./components/adminRole/dashboard";
// import ViewCovers from "./components/adminRole/ViewCovers";
// import ViewDetailedCoverPage from "./components/adminRole/ViewDetailedCoverPage";
// import CustomerFeedback from "./components/adminRole/CustomerFeedback";
// import AdminVwCustomer from "./components/adminRole/AdminVwCustomer";
// import EditMainCategories from "./components/adminRole/EditMainCategory";
function App() {
  return (
    <Router>
      <div>
        {/* Customer Routes */}
        <Route path = "/" exact component = {InitialPage}/>
        <Route path = "/customer"  component = {CustomerHeaderTemp}/>
        <Route path = "/customer/login" exact component = {Loginpage}/>
        <Route path = "/customer/registration" exact component = {CustomerRegistration}/>
        <Route path = "/customer/forgotpassword" exact component = {CustomerForgotPassword}/>
        <Route path = "/customer/home" exact component = {Home}/>
        <Route path = "/customer/dicoversmusiccovers" exact component = {MusicCoverPage}/>
        <Route path = "/customer/discovertechniquesandlessons" exact component = {TechniquesAndLessons}/>
        <Route path = "/customer/purchasehistory" exact component = {PurchaseHistory}/>
        <Route path = "/customer/shoppingcart" exact component = {MusicCart}/>
        <Route path = "/customer/detailedcover/:id" exact component = {LessonAndCoversDetailed}/>
        <Route path = "/customer"  component = {Footer}/>

        {/* Admin Routes  */}
        {/* <Route path = "/admin" component = {AdminHeaderTemp}/>
        <Route path = "/adminlogin" exact component = {AdminLogin}/>
        <Route path = "/admin/dashboard" exact component = {Dashboard}/>
        <Route path = "/admin/allcovers" exact component = {ViewCovers}/>
        <Route path = "/admin/viewmorecover/:id" exact component = {ViewDetailedCoverPage}/>
        <Route path = "/admin/customerfeedbacks/:id" exact component = {CustomerFeedback}/>
        <Route path = "/admin/allcustomers" exact component = {AdminVwCustomer}/>
        <Route path = "/admin/viewcategories" exact component = {EditMainCategories}/>
        <Route path = "/admin" component = {Footer}/> */}




      </div>
    </Router>
  );
}

export default App;
