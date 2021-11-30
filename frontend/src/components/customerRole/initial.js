import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function Initial(props) {

    return(

      <div className="initial">
       

<div class="hero-image">

  
    <br/>
   
   <div className="col-xl-5 justify-content-end">

<div className="justify-content-end mt-5">
<button type="button" class="btn btn " style={{backgroundColor:"#764A34", color:"white"}}>Register</button>
<button type="button" class="btn btn "style={{backgroundColor:"#764A34", color:"white"}}>Login</button>

</div>
</div>

<br/>

<div clss="logo">
  <img src="images/KaushalOfficialLogo.jpeg" alt="logo" class="logo"></img>
    </div>

  <br/>

  <div class="hero-text">
    <h1 style={{fontWeight:"bold", fontSize:"36px"}}>KAUSHAL RASHMIKA<br/> PRODUCTIONS</h1>
  
    <button type="button" class="btn btn btn-lg" id="bt">GET STARTED</button>
  </div>
</div>

    </div>





    )
}