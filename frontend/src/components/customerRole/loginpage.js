import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import LogoImage from '../../images/loginback.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;




export default function Login(props) {

    const sectionStyle = {
        backgroundImage: `url(${LogoImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    }
    const [passwordShown, setPasswordShown] = useState(false);

    // Password toggle handler
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };
    return (
        <div className="d-flex justify-content-center">


            

            <div className="container">


                <h3 style={{ fontWeight: "bold" }} className="mt-5 mb-5">Sign In</h3>
                <div >
                    <form className="mb-10">
                        <div class="form-group row">
                            <div className="col-xl-7">
                                <label for="exampleInputEmail1" style={{ fontWeight: "bold" }}>Username</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div className="col-xl-7">
                                <label for="exampleInputPassword1" style={{ fontWeight: "bold" }}>Password</label>
                                <input
          placeholder="Password"
          class="form-control"
          name="password"
          type={passwordShown ? "text" : "password"}
         
          
        />
         <i onClick={togglePasswordVisiblity}>{eye}</i>
                            </div>
                        </div>

                       
                        <div class="form-group row">
                        <div className="col-xl-5">
                            <button type="submit" class="btn btn-lg btn-block" style={{ backgroundColor: "#764A34", color: "#ffffff", fontWeight: "bold" }} >Sign in</button>

                        </div>
                        </div>
                        
                     

                        <div class="form-group row">
                            <div className="col-sm-2 ml-5">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1" style={{ color: "#764A34", fontWeight: "bold" }}>Remember me</label>
                            </div>



                            <div className="col-sm-2">
                                <p className="fp">
                                    {" "}
                                    <Link to="/CustomerForgotPassword" style={{ color: "#000000", fontWeight: "bold" }}>Forgot Password?</Link>
                                </p>
                            </div>
                        </div>
                      

                        <div class="form-group row">

                        <div className="col-sm-3">

                            <p style={{ fontWeight: "bold" }}> Not a Member ?  <Link style={{ color: "#764A34" }} to="/CustomerForgotPassword">Sign Up</Link> </p>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* <img class="bg-img" src="images/loginback.png" alt="..."/> */}
        </div>
    )

}
