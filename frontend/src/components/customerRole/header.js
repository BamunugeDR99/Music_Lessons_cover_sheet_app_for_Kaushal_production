import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Logo from '../../images/logo.jfif';

export default function MainHeader(props) {

const [username, setUsername] = useState("");
const [userImage,setUserImage] = useState("");



  return (
    <div style = {{marginTop : "65px"}}>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <img className="card-img-top" src = {Logo} style = {{width: "55px"}}alt="Card image cap"/>

  <a class="navbar-brand" href="#">Rashmika Productions</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item ">
        <Link class="nav-link" to="/Customer/Home">Classical Guitar Covers</Link>
      </li>
      <li class="nav-item ">
        <Link class="nav-link" to="/Customer/AllItmes">Guitar Techniques & Lessons</Link>
      </li>
{/* applw */}
     
     
    </ul>

    <form class="form-inline">
      
        <input class="form-control" type="search" placeholder="Search Music Covers and Lessons" aria-label="Search"/>
      <button class="btn  " type="submit" style={{color:"#764A34", border: "2px solid #764A34"}}>Search</button>
       
      
    </form>

    <form class="form-inline my-2 my-lg-0">
    
     <b>{username}</b>
     
    
    </form>
  </div>
</nav>

    </div>
  );
}
