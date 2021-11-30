import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import k from '../../images/initial.jpg';

export default function Initial(props) {

    return(

      <div className="initial">

<div class="hero-image">
  {/* <div clss="logo">
  <img src="images/KaushalOfficialLogo.jpeg" alt="logo" class="logo"></img>
    </div> */}
  <div class="hero-text">
    <h1 style={{fontWeight:"bold", fontSize:"36px"}}>KAUSHAL RASHMIKA<br/> PRODUCTIONS</h1>
  
    <button type="button" class="btn btn btn-lg" style={{background:"#764A34"}}>GET STARTED</button>
  </div>
</div>

    </div>





    )
}