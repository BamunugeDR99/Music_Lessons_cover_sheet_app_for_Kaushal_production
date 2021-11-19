import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from '../../images/logo.jfif';
export default function InitialPage(props) {

    return(
    <div className="container">

            <div className="row justify-content-end">
                <div className="col-xl-7">

                <div className="align-bottom ">
                    <br/>
                    <br/>
                    <img className="rounded  " src={Logo}  alt="" />
                </div>
               
                
                </div>

                <div className="col-xl-5 justify-content-end">

                <div className="justify-content-end mt-5">
                <button type="button" class="btn btn-primary " style={{ float: 'right' , margin : "0" }} id="GPackageBtn2" >Register</button>
                <button type="button" class="btn btn-primary " style={{ float: 'right' , margin : "0" }} id="GDisItemsBtn2" >Login</button>
                
                </div>

               
                </div>

            </div>

            <div className="row justify-content-start">

                <div className="col-xl-6">

                    <p style={{fontSize:"18px" , padding : "0", margin : "0"}}>Kaushal Music</p>
                    <p style={{fontSize:"18px" , padding : "0", margin : "0"}}>Productions</p>
                    <p style={{fontSize:"16px" , padding : "0", margin : "0"}}>Let Music Speak!</p>
                </div>

                <div className="col-xl-6">
                <button type="button" class="btn btn-primary " style={{ float: 'right' }} id="GDisItemsBtn2" >Get Started</button>
                
                </div>


            </div>
    </div>
    )
}