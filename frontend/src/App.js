// import doms
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import css 
import "./App.css";
import "./css/DiscoverMoreCoversStyles.css";
import "./css/initial.css";
import "./css/home.css";

// import components 
import InitialPage from "./components/customerRole/initialpage";
import CustomerHeaderTemp from "./components/customerRole/CustomerHeaderTemp";
import Loginpage from "./components/customerRole/loginpage";
import CustomerRegistration from "./components/customerRole/CustomerRegistration";
import CustomerForgotPassword from "./components/customerRole/CustomerForgotPassword";
import Home from "./components/customerRole/home";
import MusicCoverPage from "./components/customerRole/musiccoverpage";
import TechniquesAndLessons from "./components/customerRole/TechniquesAndLessons";
import Footer from "./components/customerRole/footer";


function App() {
  return (
    <Router>
      <div>
        <Route path = "/" exact component = {InitialPage}/>
        <Route path = "/customer"  component = {CustomerHeaderTemp}/>
        <Route path = "/customer/login" exact component = {Loginpage}/>
        <Route path = "/customer/registration" exact component = {CustomerRegistration}/>
        <Route path = "/customer/forgotpassword" exact component = {CustomerForgotPassword}/>
        <Route path = "/customer/home" exact component = {Home}/>
        <Route path = "/customer/dicoversmusiccovers" exact component = {MusicCoverPage}/>
        <Route path = "/customer/discovertechniquesandlessons" exact component = {TechniquesAndLessons}/>
        <Route path = "/customer"  component = {Footer}/>



      </div>
    </Router>
  );
}

export default App;
