// import doms
import React, { Component, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./private/ProtectedRoute";
import authentication from "./security/authentication";

// import css
import "./App.css";
import "./css/DiscoverMoreCoversStyles.css";
import "./css/initial.css";
import "./css/home.css";

// import components (Customer)
// import InitialPage from "./components/customerRole/initialpage";
// import CustomerHeaderTemp from "./components/customerRole/CustomerHeaderTemp";
// import CustomerHeaderTempBeforeLogin from "./components/customerRole/CustomerHeaderTempBeforeLogin";
// import Loginpage from "./components/customerRole/loginpage";
// import CustomerRegistration from "./components/customerRole/CustomerRegistration";
import CustomerForgotPassword from "./components/customerRole/CustomerForgotPassword";
// import Home from "./components/customerRole/home";
// import MusicCoverPage from "./components/customerRole/musiccoverpage";
// import TechniquesAndLessons from "./components/customerRole/TechniquesAndLessons";
// import PurchaseHistory from "./components/customerRole/purchaseHistory";
// import MusicCart from "./components/customerRole/music_cart";
// import LessonAndCoversDetailed from "./components/customerRole/LessonsAndCoversDetailed";
// import Footer from "./components/customerRole/footer";

//import Test Components
// import Search from "./components/testingComponents/search";
// import Search2 from "./components/testingComponents/search2";
// import SearchBar from "./components/testingComponents/searchBar";
// import TestLogin from "./components/testingComponents/LoginTest";
// import TestCustomerRegistration from "./components/testingComponents/RegisterTest";
// import JWTCustomerHeader from "./components/testingComponents/JWTTestHeader";
// import TestLessonsAndCoversDetailed from "./components/testingComponents/LessonsAndCoversDetailedTest";
// import TestCustomerUI from "./components/testingComponents/testCustomer";

// import Search from "./components/testingComponents/search";

//import components (Admin)
// import AdminLogin from "./components/adminRole/adminLogin";
// import AdminHeaderTemp from "./components/adminRole/adminHeaderTemo";
// import Dashboard from "./components/adminRole/dashboard";
// import ViewCovers from "./components/adminRole/ViewCovers";
// import ViewDetailedCoverPage from "./components/adminRole/ViewDetailedCoverPage";
// import CustomerFeedback from "./components/adminRole/CustomerFeedback";
// import AdminVwCustomer from "./components/adminRole/AdminVwCustomer";
// import EditMainCategories from "./components/adminRole/EditMainCategory";
// import NotFound from "./components/NotFound";
import IdelTimer from "./components/timeRelatedComponents/IdelTimer";
// import PurchasedCoverDetailedPage from "./components/customerRole/PurchasedCoverDetailedPage";

function App() {
  return (
    <Router>
      <IdelTimer />

      <Switch>
       <div>
       <Route
            path="/a"
            exact
            component={CustomerForgotPassword}
          />

       </div>
      </Switch>
    </Router>
  );
}

export default App;
