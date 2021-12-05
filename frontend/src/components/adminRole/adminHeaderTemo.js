import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/CustomerHeaderStyles.css";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import authentication from "../../security/authentication";


const bcrypt = require("bcryptjs");
export default function AdminHeaderTemp(props) {

  const [profilemodelOpen, setProfilemodelOpen] = useState(false);
 
  //useStates to store user inputs
  let [Username, SetUsername] = useState("");
  let [Email, SetEmail] = useState("");
  let [FirstName, setFirstName] = useState("");
  let [LastName, setLastName] = useState("");
 

  let [Admin, SetAdmin] = useState([]);

 
  function Profilemodalopen() {
    // alert("This is alert");
    getAdminDetails();

    setProfilemodelOpen(true);
  }
  function ProfilemodalClose() {
    setProfilemodelOpen(false);
   
  }


  function getAdminDetails() {

    axios.get("https://kaushal-rashmika-music.herokuapp.com/admin/getAdmin/" + localStorage.getItem("AdminID")).then((res) => {

    
      SetAdmin(res.data);

      SetUsername(res.data.Username);
      setFirstName(res.data.FirstName);
      setLastName(res.data.LastName);
      SetEmail(res.data.Email);
    
    }).catch((err) => {
      alert(err.message);
    })
  }

  useEffect(() => {

    function getOne() {

      axios.get("https://kaushal-rashmika-music.herokuapp.com/admin/getAdmin/" + localStorage.getItem("AdminID")).then((res) => {

        SetUsername(res.data.Username);
        setFirstName(res.data.FirstName);
        setLastName(res.data.LastName);
        SetEmail(res.data.Email);
     


      }).catch((err) => {
        alert(err.message);
      })
    }

    getOne();
  }, [])

  return (
    <div className = "customerHeader">
     
      <nav
        class="navbar sticky-top navbar-expand-lg navbar-light"
        style={{ background: "#ffffff" }}
      >
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="#764A34"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
        <a class="navbar-brand" href="#">

          <img src={"/images/KaushalOfficialLogo.jpeg"} class="img-fluid" alt="Responsive image" style={{ width: "40px", borderRadius: "8px" }} />
          <span> </span>
          <font style={{ fontFamily: "Old Standard TT", fontSize: "20px" }}>
            <b>KAUSHAL</b></font> <font style={{ fontFamily: "Old Standard TT", fontSize: "18px" }}>RASHMIKA
          </font>
        </a>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
              <Link class="nav-link" to = "/admin/dashboard" id="classicalHeader">
                <font> Dashboard </font>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to = "/admin/allcovers" id="classicalHeader">
                <font> Covers </font>
              </Link>
            </li>

            <li class="nav-item">
              <Link
                class="nav-link"
                to = "/admin/viewcategories"
                tabindex="-1"
                aria-disabled="true"
                id="classicalHeader"
              >
                <font
                  style={{
                    fontFamily: "Abel",
                    fontSize: "18px",
                    color: "#764A34",
                  }}
                >
               Sub Categories
                </font>
              </Link>
            </li>
            <li class="nav-item">
              <Link
                class="nav-link"
                to = "/admin/allcustomers"
                tabindex="-1"
                aria-disabled="true"
                id="classicalHeader"
              >
                <font
                  style={{
                    fontFamily: "Abel",
                    fontSize: "18px",
                    color: "#764A34",
                  }}
                >
               Customers
                </font>
              </Link>
            </li>
          </ul>
    
          <div>
            <span className="userProfileSpan" onClick={Profilemodalopen}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="#764A34"
                class="bi bi-person-fill"
                viewBox="0 0 16 16"
                id="icons"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
              <font id="myAccount">My Account </font>
            </span>
     
          </div>


          <span
                  className="userProfileSpan ml-1 mt-1"
                  onClick={() => {

                    const updateloginStatus = {
                      LoginStatus: false,
                    };
            
                    axios
                      .put(
                        "http://localhost:8070/admin/loginStatus/" + localStorage.getItem("AdminID"),
                        updateloginStatus
                      )
                      .then((res) => {


                        authentication.logout(() => {
                          props.history.push("/adminlogin")
                          localStorage.removeItem("AdminID");
    
                         })
                      }).catch((err)=>{
            
                      });

                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="#764A34"
                    class="bi bi-box-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                    />
                  </svg>
                </span>
        </div>
      </nav>

  

       {/* My Profile model */}
       <Modal show={profilemodelOpen} size="lg">
        <Modal.Header>

          <h1 >My Profile</h1>

          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={ProfilemodalClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
      
            <div className="row ">
              <div className="col-sm-6">
                <center>
                  <br />
                  <div className="col-md-9 col-sm-6 input-group-append">
                    <h6 style={{ color: "#764A34" }} >
                      <strong>User Name</strong>: {Admin.Username}
                    </h6>
                  </div>
                  <br />
                  <div className="col-md-9 col-sm-6 input-group-append">

                    <label for="test"><svg style={{ color: "#764A34" }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-person-fill"
                      viewBox="0 0 16 16"

                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg></label>
                    <span>
                      <p className="ml-2" style={{ color: "#764A34", fontWeight: "bold" }}> <span style={{ color: "black", fontWeight: "normal" }} >{`${FirstName}`}</span></p>
                    </span>


                  </div>
                  <br />
                 
                  <br />

                </center>
              </div>
              <div className="col-sm-6">
                <center>
                  <br />
                  <div className="col-md-9 col-sm-6 input-group-append">
                    <h6 style={{ color: "#764A34" }}>
                      <strong>Email</strong>:{" "}
                      <a href="">
                        <u>{Admin.Email}</u>
                      </a>
                    </h6>
                  </div>
                  <br />
                  <div className="col-md-9 col-sm-6 input-group-append">
                    <label for="test"><svg style={{ color: "#764A34" }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-person-fill"
                      viewBox="0 0 16 16"

                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg> </label>
                    <span>
                      <p className="ml-2" style={{ color: "#764A34", fontWeight: "bold" }}> <span style={{ color: "black", fontWeight: "normal" }} >{`${LastName}`}</span></p>
                    </span>
                  </div>
                  <br />
                 
                  <br />

                  <br />
                </center>
              </div>

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
      </Modal.Footer>
      </Modal>



    </div>



  );
}