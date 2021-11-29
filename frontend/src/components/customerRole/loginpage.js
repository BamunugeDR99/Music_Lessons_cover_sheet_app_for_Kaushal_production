
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "../../css/login.css";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const eye = <FontAwesomeIcon icon={faEye} />;



export default function Login(props) {


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

    // axios.interceptors.request.use( async(config)=>{

    //         let currentDate = new Date();

    // }
    // );

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
            // alert(err);
            console.log(err);
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
       
<div className="loginpage">
<div class="container-fluid">
    <div class="row no-gutter">
        
        <div class="col-md-6 d-none d-md-flex bg-image"></div>


        <div class="col-md-6 bg-light">
            <div class="login d-flex align-items-center py-5">

        
                <div class="container">
                    <div class="row">
                        <div class="col-lg-10 col-xl-7 mx-auto">
                            <h3 class="display-4" style={{ fontWeight: "bold" }}>Sign In</h3>
                            <h6 id="CusLoginError" style={{color:"red", fontWeight:"bold"}}>{errorMsg}</h6>
                          <br/><br/>
                            <form  onSubmit={loginUser}>

                                 {/* Username label & input field  */}

                                <div class="form-group mb-3">
                                    
                                <label for="exampleInputEmail1" style={{ fontWeight: "bold" }}>Username</label>

                                    <input id="inputEmail" type="text" placeholder="Username"  autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4"
                                    
                                    defaultValue={Username}
                                    name="Username"
                                    onChange={handleChange}
                                    onChange={(e) => {
                                        setUsername(e.target.value);    
                                    }}

                                    required
                                  
                               

                                    />
                                      
                                </div>

                                 {/* Password label & input field  */}

                                <div class="form-group mb-3">
                                <label for="exampleInputEmail1" style={{ fontWeight: "bold" }}>Password</label>

                                <input id="inputPassword" type="password" placeholder="Password" class="form-control rounded-pill border-0 shadow-sm px-4"
                                    
                                    name="password"
                                    type={passwordShown ? "text" : "password"}
                                    onChange={(e) => {
                                        setPassword(e.target.value);  
                                    }}

                                    required 
                                    />
                                    <span class="p-viewer">
                                    <i style={{color:"#764A34"}} onClick={togglePasswordVisiblity}>{eye}</i>
                                     </span>
                                </div>

                                {/* Remember me */}

                                <div class="custom-control custom-checkbox mb-3">
                                    <input id="customCheck1" type="checkbox" class="custom-control-input"
                                    
                                    name="rememberMe"
                                    checked={rememberMe}
                                    onChange={handleChange}
                                    
                                    
                                    />
                                    <label for="customCheck1" class="custom-control-label">Remember Me </label> 
                                    
                                </div>

                                
                             {/* Submit Button */}
                                
                               
                                <button type="submit" class="btn btn-block text-uppercase mb-2 rounded-pill shadow-sm" style={{ backgroundColor: "#764A34", color: "#ffffff", fontWeight: "bold" }}>Sign in</button>
                               
                               
                            {/* forgot password */}

                                <div class="text-center d-flex-center justify-content-between mt-4"> <p style={{textAlign:"center"}}><Link to="/CustomerForgotPassword" style={{ color: "#764A34", fontWeight: "bold" }}>Forgot Password?</Link></p>
                               
                                </div>
                
                              {/* Not a member link */}

                                <div class="text-center d-flex-center justify-content-between mt-4"><p style={{ fontWeight: "bold" }}>Don't have an account? <Link style={{ color: "#764A34" }} to="/CustomerForgotPassword">Create One</Link></p>
                               
                               </div>
                                
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</div>



</div>

       
    )

}
