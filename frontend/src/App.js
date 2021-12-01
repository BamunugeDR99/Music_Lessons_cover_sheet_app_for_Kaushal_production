import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import AddStudent from "./components/customerRole/addstudent";
import "./App.css";
import "./css/DiscoverMoreCoversStyles.css";
import "./css/initial.css";
import "./css/home.css";
import CustomerForgotPassword from "./components/customerRole/CustomerForgotPassword";
// import LessonsAndCoversDetailed from "./components/customerRole/LessonsAndCoversDetailed";
// import ViewCovers from "./components/adminRole/ViewCovers";
// import ViewDetailedCoverPage from "./components/adminRole/ViewDetailedCoverPage";

function App() {
  return (
    <Router>
      <div>
        <Route path = "/" exact component = {CustomerForgotPassword}/>
      </div>
    </Router>
  );
}

export default App;
