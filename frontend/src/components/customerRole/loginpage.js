
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import LogoImage from '../../images/loginback.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "../../css/login.css";
import Swal from 'sweetalert2';
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

    const refreshToken = async () =>{

        try{

            const res = await axios.post("/refresh",{token: customer.refreshToken});
            setCustomer({
                
                ...customer,
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,

            })
        }catch (err){

            console.log(err);
        }

    }

    axios.interceptors.request.use( async(config)=>{

            let currentDate = new Date();

    }
    );

     //remember me

  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (event) => {
    const input = event.target;
    const value = input.type === "checkbox" ? input.checked : input.value;

    setRememberMe(value);

  };


    const [passwordShown, setPasswordShown] = useState(false);

    let navigate = useNavigate();

    // Password toggle handler
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    let[customer, setCustomer] = useState(null);
    let [Username, setUsername] = useState("");
    let [Password, setPassword] = useState("");
    let [errorMsg, setErrorMsg] = useState("");


    useEffect(() => {
        function RememberMe() {
          if (localStorage.getItem("rememberMe") === "true") {
            setUsername(localStorage.getItem("Username"));
          }else{
              setUsername("");
          }
        }
    
        RememberMe();
        // displayStudentdetails();
      }, []);


      function loginUser(e) {
        e.preventDefault();
    
        const loginCredentials = {
          Username,
          Password,
        };
    
        localStorage.setItem("rememberMe", rememberMe);
        localStorage.setItem("Username", rememberMe ? Username : "");
    
        axios
          .post("http://localhost:8070/Customer/loginCustomer", loginCredentials)
          .then((res) => {
            
            setCustomer(res.data.customerLogin);
            localStorage.setItem("CustomerID", res.data.customerLogin._id);
    
            // sessionStorage.setItem('userID',"sss");
    
            alert("Customer loggin Successfully!");
            //console.log("logging success");
            ///console.log(res.data);
           setErrorMsg("");
            // props.history.push("/Customer/Home");
    
          })
          .catch((err) => {
            //alert(err);
            console.log(err.response.data);
            // alert(err.response.data.error);
    
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Please Check Your Username & Password!',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
            setErrorMsg(err.response.data.error);
          });
      }
  


    // function navCheck(){

    //     navigate('/cart');
    // }

    return (
        <div   >
            <div className=" container  ">

                <div className="row  justify-content-center">
                    <div className="col-sm-5">
                        <h3 style={{ fontWeight: "bold" }} className="mt-5 mb-5">Sign In</h3>
                        <h6 id="CusLoginError">{errorMsg}</h6>
                    </div>

                </div>

                <form className="mb-10" onSubmit={loginUser}>

                    {/* Username label & input field  */}

                    <div class="form-group row justify-content-center">

                        <div className="col-sm-5">
                            <label for="exampleInputEmail1" style={{ fontWeight: "bold" }}>Username</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username"  defaultValue={Username} 
                                 name="Username"
                                 onChange={handleChange}
                                 onChange={(e) => {
                                 setUsername(e.target.value);
                             }}
                             required
                            />
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
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                      }}
                                      required


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
                                <button type="submit" class="btn btn-lg btn-block rounded" style={{ backgroundColor: "#764A34", color: "#ffffff", fontWeight: "bold" }}>Sign in</button>

                            </div>

                        </div>
                    </div>


                    {/* Remember me & Forgot Password */}
                    <div class="form-group row justify-content-center">
                        <div className="col-xl-2 col-md-6 col-sm-3 col-6">
                            <input type="checkbox" class="form-check-input ml-1" id="exampleCheck1" 
                                name="rememberMe"
                                checked={rememberMe}
                                onChange={handleChange}
                            />
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
