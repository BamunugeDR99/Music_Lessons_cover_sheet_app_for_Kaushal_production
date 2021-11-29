import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import LogoImage from '../../images/loginback.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

// import "../../css/login.css";

import { useNavigate } from 'react-router-dom';
const eye = <FontAwesomeIcon icon={faEye} />;





export default function Login(props) {


    const styles = {
        container: {
            backgroundImage: `url(${LogoImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh'
        }
    };



    const [passwordShown, setPasswordShown] = useState(false);

    let navigate = useNavigate();

    // Password toggle handler
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };


    function navCheck(){

        navigate('/cart');
    }

    return (
        <div   >
            <div className=" container  ">

                <div className="row  justify-content-center">
                    <div className="col-sm-5">
                        <h3 style={{ fontWeight: "bold" }} className="mt-5 mb-5">Sign In</h3>
                    </div>

                </div>

                <form className="mb-10">

                    {/* Username label & input field  */}

                    <div class="form-group row justify-content-center">

                        <div className="col-sm-5">
                            <label for="exampleInputEmail1" style={{ fontWeight: "bold" }}>Username</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username" />
                        </div>
                    </div>

                     {/* Password label & input field  */}

                    <div class="form-group row justify-content-center">

                        <div className="col-sm-5">

                            <label for="exampleInputEmail1" style={{ fontWeight: "bold" }}>Password</label>

                            <div class="input-group mb-3">
                                <input
                                    placeholder="Password"
                                    class="form-control"
                                    name="password"
                                    type={passwordShown ? "text" : "password"}


                                />

                                {/* eye icon */}
                                <div class="input-group-append">
                                    <span class="input-group-text" id="basic-addon2"> <i onClick={togglePasswordVisiblity}>{eye}</i></span>
                                </div>
                            </div>


                        </div>
                    </div>


                    {/* Submit Button */}
                    <div class="form-group row justify-content-center">
                        <div className="col-sm-5">
                            <div className="container-sm">
                                <button type="submit" class="btn btn-lg btn-block rounded" style={{ backgroundColor: "#764A34", color: "#ffffff", fontWeight: "bold" }}  onClick={navCheck}>Sign in</button>

                            </div>

                        </div>
                    </div>


                    {/* Remember me & Forgot Password */}
                    <div class="form-group row justify-content-center">
                        <div className="col-xl-2 col-md-6 col-sm-3 col-6">
                            <input type="checkbox" class="form-check-input ml-1" id="exampleCheck1" />
                            <label class="form-check-label ml-4 " for="exampleCheck1" style={{ color: "#764A34", fontWeight: "bold" }}>Remember me</label>

                        </div >
                        <div className="col-xl-3 col-md-6 col-sm-3   col-6">
                            <Link to="/CustomerForgotPassword" style={{ color: "#000000", fontWeight: "bold" }}>Forgot Password?</Link>

                        </div>
                    </div>

                     {/* Not a member link */}
                    <div class="form-group row justify-content-center">
                        <div className="col-sm-5">
                            <p style={{ fontWeight: "bold" }}> Not a Member ?  <Link style={{ color: "#764A34" }} to="/CustomerForgotPassword">Sign Up</Link> </p>
                        </div>
                    </div>




                </form>
            </div>






        </div>
    )

}
