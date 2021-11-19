import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddStudent from "./components/customerRole/addstudent";
import "./App.css";
import "./css/DiscoverMoreCoversStyles.css";
import React, { Component } from "react";
import DataTableTest from "./components/dataTableTest";
<<<<<<< HEAD
import MusicCart from "./components/customerRole/music_cart";
import MusicCart2 from "./components/customerRole/music_cart2";
import Footer from "./components/customerRole/footer";
import Login from "./components/customerRole/loginpage";
import MainHeader from "./components/customerRole/header";
import Header2 from "./components/customerRole/header2";
import InitialPage from "./components/customerRole/initialpage";
import Test from "./components/customerRole/test";

=======
import CustomerRegistration from "./components/customerRole/CustomerRegistration";
import CustomerForgotPassword from "./components/customerRole/CustomerForgotPassword";
import LessonsAndCoversDetailed from "./components/customerRole/LessonsAndCoversDetailed";
import ViewCategories from "./components/adminRole/ViewCategories";
import BootstrapDataTable from "./components/adminRole/BootstrapDataTable";
import MainCategoriesDataTable from "./components/adminRole/MainCategoriesDataTable";
import ViewStudentDetails from "./components/testingComponents/ViewStudentdetails";
import CustomerHeader from "./components/customerRole/CustomerHeaderTemp";
import CustomerFooter from "./components/customerRole/CustomerFooterTemp";
>>>>>>> c1f42d06622ed6ec8aa464d290a50a688249fa2a
function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <Header2/>
    <Routes>
      
    
      <Route path="/table" element={<DataTableTest/>}/>
      <Route path="/test" element={<Test/>}/>
      <Route path="/cart" element={<MusicCart/>}/>
      <Route path="/cart2" element={<MusicCart2/>}/>
      <Route path="/login" element={<Login/>}/>
    
   
     
    </Routes>

  </BrowserRouter>
    


=======
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
        {/* <Route path="/g" element={<ViewStudentDetails/>} /> */}
      </Routes>
      <CustomerFooter />
    </BrowserRouter>
>>>>>>> c1f42d06622ed6ec8aa464d290a50a688249fa2a

    //Commit1
  );
}

export default App;
