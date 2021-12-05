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
import InitialPage from "./components/customerRole/initialpage";
import CustomerHeaderTemp from "./components/customerRole/CustomerHeaderTemp";
import CustomerHeaderTempBeforeLogin from "./components/customerRole/CustomerHeaderTempBeforeLogin";
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
// import Search from "./components/testingComponents/search";

// import components (Admin)
import AdminLogin from "./components/adminRole/adminLogin";
import AdminHeaderTemp from "./components/adminRole/adminHeaderTemo";
import Dashboard from "./components/adminRole/dashboard";
import ViewCovers from "./components/adminRole/ViewCovers";
import ViewDetailedCoverPage from "./components/adminRole/ViewDetailedCoverPage";
import CustomerFeedback from "./components/adminRole/CustomerFeedback";
import AdminVwCustomer from "./components/adminRole/AdminVwCustomer";
import EditMainCategories from "./components/adminRole/EditMainCategory";
import NotFound from "./components/NotFound";
import IdelTimer from "./components/timeRelatedComponents/IdelTimer";

// dynamic header
function App() {

  // window.onload = function gg(){
  //     //localStorage.getItem("AdminID")
  //     // let loginStatus = false;
  //       if(localStorage.getItem("AdminID") != null){
  //         axios
  //         .get(
  //           "http://localhost:8070/admin/getAdminLoginStatus/61ac56a585716235690b414b"
              
  //         )
  //         .then((res) => {
  //           if(res.data){
  //             authentication.login(()=>{});
  //           }else{
  //             authentication.logout(()=>{});
  //           }
            
  //         })
  //         .catch((err) => {
  //           alert(err);
  //         });
  //       }else if(localStorage.getItem("AdminID") == null){
  //           return this.authenticated
  //       }
  // }
  const [loginStatus, setLoginStatus] = useState(true);

  return (
    <Router>
      <IdelTimer/>
      <Switch>
        <div>
          {/* Customer Routes */}
          <Route exact path="/" exact component={InitialPage} />
          {loginStatus == true ? (
            <div>
              <Route path="/customer" component={CustomerHeaderTemp} />
            </div>
          ) : (
            <div>
              <Route
                path="/customer"
                component={CustomerHeaderTempBeforeLogin}
              />
            </div>
          )}
          <Route path="/customer/login" exact component={Loginpage} />
          <Route
            path="/customer/registration"
            exact
            component={CustomerRegistration}
          />
          <Route
            path="/customer/forgotpassword"
            exact
            component={CustomerForgotPassword}
          />
          <Route path="/customer/home" exact component={Home} />
          <Route
            path="/customer/dicoversmusiccovers"
            exact
            component={MusicCoverPage}
          />
          <Route
            path="/customer/discovertechniquesandlessons"
            exact
            component={TechniquesAndLessons}
          />
          <Route
            path="/customer/purchasehistory"
            exact
            component={PurchaseHistory}
          />
          <Route path="/customer/shoppingcart" exact component={MusicCart} />
          <Route
            path="/customer/detailedcover/:id"
            exact
            component={LessonAndCoversDetailed}
          />
          <Route
            path="/customer/discovermorecover/:id"
            exact
            component={LessonAndCoversDetailed}
          />
          <Route path="/customer" component={Footer} />
          {/* Admin Routes  */}

          <ProtectedRoute path="/admin" component={AdminHeaderTemp} />
          <Route path="/adminlogin" exact component={AdminLogin} />
          <ProtectedRoute path="/admin/dashboard" exact component={Dashboard} />
          <ProtectedRoute
            path="/admin/allcovers"
            exact
            component={ViewCovers}
          />
          <ProtectedRoute
            path="/admin/viewmorecover/:id"
            exact
            component={ViewDetailedCoverPage}
          />
          <ProtectedRoute
            path="/admin/customerfeedbacks/:id"
            exact
            component={CustomerFeedback}
          />
          <ProtectedRoute
            path="/admin/allcustomers"
            exact
            component={AdminVwCustomer}
          />
          <ProtectedRoute
            path="/admin/viewcategories"
            exact
            component={EditMainCategories}
          />
          <ProtectedRoute path="/admin" component={Footer} />

          {/* Testing routes  */}
          {/* <Route path = "/search" exact component = {Search}/> */}
          <Route path="/notfound" component={NotFound} />

          {/* <Route path = "*" component = {}/> */}
          {/* <Route path="/admin/*" exact component={NotFound} /> */}
          {/* <Route path="*" exact component={NotFound} /> */}
       </div>
      </Switch>
    </Router>
  );
}

export default App;
