import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/CustomerHeaderStyles.css";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
// import PasswordStrengthIndicator from "./passwordStrength";

const bcrypt = require("bcryptjs");
export default function AdminHeaderTemp(props) {

  const [profilemodelOpen, setProfilemodelOpen] = useState(false);
  const [editProfilemodelOpen, setEditProfilemodelOpen] = useState(false);
  const [changePasswordmodelOpen, setchangePasswordmodelOpen] = useState(false);

  let [ContactNumberError, SetContactNoError] = useState("");
  let [PasswordError, SetPasswordError] = useState("");
  let [confirmPasswordError, SetConfirmPasswordError] = useState("");
  let [currentPasswordError, SetCurrentPasswordError] = useState("");
  let [currentPasswordError2, SetCurrentPasswordError2] = useState("");
  let [FirstNameError, setFirstNameError] = useState("");
  let [LastNameError, setLastNameError] = useState("");
  let [GenderError, setGenderError] = useState("");
  let [CountryError, setCountryError] = useState("");
  let [ConfirmDeleteError, setConfirmDeleteError] = useState("");


  const [passwordShown, setPasswordShown] = useState(false);
  const [CpasswordShown, setCPasswordShown] = useState(false);
  const [CurrentpasswordShown, setCurrentPasswordShown] = useState(false);
  const [CurrentpasswordShown2, setCurrentPasswordShown2] = useState(false);

  const [eyeSlashIcon, setEyeSlashIcon] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(true);
  const [CeyeSlashIcon, setCEyeSlashIcon] = useState(false);
  const [CeyeIcon, setCEyeIcon] = useState(true);
  const [CurrenteyeSlashIcon, setCurrentEyeSlashIcon] = useState(false);
  const [CurrenteyeIcon, setCurrentEyeIcon] = useState(true);

  const [CurrenteyeSlashIcon2, setCurrentEyeSlashIcon2] = useState(false);
  const [CurrenteyeIcon2, setCurrentEyeIcon2] = useState(true);


  const [modalOpenForLoading, setmodalOpenForLoading] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  let [ExtraError, setExtraError] = useState("");



  const [passwordMatchDiv, setPasswordMatchDiv] = useState(true);
  const [passwordMisMatchDiv, setPasswordMisMatchDiv] = useState(true);

  const isNumberRegx = /\d/;
  const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  const [passwordValidity, setPasswordValidity] = useState({
    minChar: null,
    number: null,
    specialChar: null
  });

  let flag1 = 0;


  //useStates to store user inputs
  let [Username, SetUsername] = useState("");
  let [Email, SetEmail] = useState("");
  let [ContactNumber, SetContactNo] = useState("");
  let [Password, SetPassword] = useState("");
  let [ConfirmPassword, SetConfirmPassword] = useState("");
  let [CurrentPassword, SetCurrentPassword] = useState("");
  let [CurrentPassword2, SetCurrentPassword2] = useState("");
  let [FirstName, setFirstName] = useState("");
  let [LastName, setLastName] = useState("");
  let [Gender, setGender] = useState("");
  let [Country, setCountry] = useState("");

  let [Customer, SetCustomer] = useState([]);

  let [confirmDelete, setConfirmDelete] = useState(true);


  function clearErrors(){

    SetCurrentPasswordError("");
    SetCurrentPasswordError2("");
    SetPasswordError("");
    SetConfirmPasswordError("");
    setExtraError("");
    setFirstNameError("");
    setLastNameError("");
    setGenderError("");
    setCountryError("");
    SetContactNoError("");
    setConfirmDeleteError("");

  }

  function checkPasswords(confirmpassword) {

    if (Password.length !== 0 || confirmpassword.length !== 0) {

      if (Password === confirmpassword) {

        flag1 = 1;
        setPasswordMatchDiv(false);
        setPasswordMisMatchDiv(true);

      }

      else if (Password !== confirmpassword) {
        flag1 = 0;
        setPasswordMisMatchDiv(false);
        setPasswordMatchDiv(true);

      }

      else {
        flag1 = 0;
        setPasswordMatchDiv(true);
        setPasswordMisMatchDiv(true);
      }

    }

    else {
      flag1 = 0;
      setPasswordMatchDiv(true);
      setPasswordMisMatchDiv(true);
    }

  }


  function checkCurrentPassword() {


    let nCopsw = document.getElementById("CurrentPassword").value;
    console.log(CurrentPassword);

    if (nCopsw.length !== 0) {

      const isMatch = bcrypt.compareSync(nCopsw, CurrentPassword);
      console.log("Password Match : " + isMatch);
      if (!isMatch) {
        flag1 = 0;
        SetCurrentPasswordError("Invalid Current Password!");
      }

      else {
        flag1 = 1;
        SetCurrentPasswordError("");
      }

    }



  }

  function validatePasswords() {

    let Password = document.getElementById("CPPassword").value;
    let ConfirmPassword = document.getElementById("CPConfirmPassword").value;
    console.log(CurrentPassword2.length);
    console.log(Password.length);
    console.log(ConfirmPassword.length);
    if (CurrentPassword2.length === 0) {

      flag1 = 0;
      SetCurrentPasswordError2("Current password is required !");
    }

    
    else if (Password.length === 0) {

      flag1 = 0;
      SetPasswordError("New password is required !");
    }

    else if (ConfirmPassword.length === 0) {

      flag1 = 0;
      SetConfirmPasswordError("Confirm password is required !");
    }




    else if (Password !== ConfirmPassword) {
      flag1 = 0;
      setPasswordMisMatchDiv(false);
      setPasswordMatchDiv(true);

    } else if (passwordValidity.minChar !== true || passwordValidity.specialChar !== true || passwordValidity.number !== true) {
      flag1 = 0;
      setExtraError("Please give the password in required format")
    }

    else {

      flag1 = 1;
    }


  }

  function changePassword(e) {
    e.preventDefault();
    checkCurrentPassword();
    validatePasswords();

    console.log(flag1);

    if (flag1 === 1) {

      console.log(Password);
      Password = bcrypt.hashSync(Password, bcrypt.genSaltSync(12));
      SetPassword( bcrypt.hashSync(Password, bcrypt.genSaltSync(12)));
      console.log("Password : " + Password);

      updateProfile();


    }
  }



  function Profilemodalopen() {
    // alert("This is alert");
    getCustomerDetails();

    setProfilemodelOpen(true);
  }
  function ProfilemodalClose() {
    setProfilemodelOpen(false);
    clearErrors();
  }




  function EditProfilemodalopen() {
    // alert("This is alert");
    getCustomerDetails();
    setEditProfilemodelOpen(true);
  }
  function EditProfilemodalClose() {
    setEditProfilemodelOpen(false);
    setConfirmDelete(true);
    setConfirmDeleteError("");
    SetCurrentPasswordError("");
    clearErrors();

  }

  function ChangePasswordmodalopen() {
    getCustomerDetails();
    setchangePasswordmodelOpen(true)
  }

  function ChangePasswordmodalClose() {
    setchangePasswordmodelOpen(false);
    setConfirmDeleteError("");
  
  }


  function goToEditProfile() {

    ProfilemodalClose();
    EditProfilemodalopen();
  }

  function goToChangePassword() {
    EditProfilemodalClose();
    ChangePasswordmodalopen();

  }
  //Navigation Variable






  function validate() {

    if (FirstName.length === 0) {
      flag1 = 0
      setFirstNameError("First name is required ! ");
    }
    else if (LastName.length === 0) {
      flag1 = 0
      setLastNameError("Last name is required !");
    }
    else if (ContactNumber.length === 0) {
      flag1 = 0
      SetContactNoError("Contact number is required !");
    }
    else if (Gender.length === 0) {
      flag1 = 0
      setGenderError("Gender is required !")
    }
    else if (Country.length === 0) {
      flag1 = 0
      setCountryError("Country is required !")
    }

    else {
      flag1 = 1;
    }
  }

  function updateProfile() {


    console.log("Password : " + Password);


    const newCustomer = {
      FirstName,
      LastName,
      Email,
      ContactNumber,
      Gender,
      Country,
      Username,
      Password,

    }

    console.log(newCustomer);

    validate();
    console.log(flag1);

    if (flag1 === 1) {



      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

          setmodalOpenForLoading(true);

          
      axios.put("http://localhost:8070/customer/update/61a50a72a955b7198787942f", newCustomer).then(() => {

            setmodalOpenForLoading(false);
            Swal.fire('Saved!', '', 'success');

            ChangePasswordmodalClose();
      }).catch((err) => {

        console.log(err);
        setmodalOpenForLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Try again Later!',
         
        })
      })

        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })












    }


  }




  function deleteProfile() {

    checkCurrentPassword();
    console.log(flag1);


    if (confirmDelete === true) {
      setConfirmDeleteError("Enter the Current Password");
    }

    setConfirmDelete(false);

    if (flag1 === 1) {
      console.log("Delete Karamu");

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
  
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "Don't you enjoy our music anymore?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete Profile',
        cancelButtonText: 'Cancel',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
  
          axios
            .delete("http://localhost:8070/customer/delete/61a50a72a955b7198787942f")
            .then((res) => {
  
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your Profile has been deleted.',
                'success'
              )
              EditProfilemodalClose();
           
  
  
            }).catch((err) => {
  
              console.log(err);
            })
  
  
  
  
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Thank you for staying with us !',
            'error'
          )
        }
      })
    }
   
  }

  function getCustomerDetails() {

    axios.get("http://localhost:8070/customer/get/61a50a72a955b7198787942f").then((res) => {

      console.log(res.data);
      SetCustomer(res.data);

      SetUsername(res.data.Username);
      setFirstName(res.data.FirstName);
      setLastName(res.data.LastName);
      SetEmail(res.data.Email);
      SetContactNo(res.data.ContactNumber);
      setGender(res.data.Gender);
      setCountry(res.data.Country);
      SetCurrentPassword(res.data.Password);
      SetPassword(res.data.Password);


    }).catch((err) => {
      alert(err.message);
    })
  }

  useEffect(() => {

    function getOne() {

      axios.get("http://localhost:8070/customer/get/61a50a72a955b7198787942f").then((res) => {

        SetCustomer(res.data);

        SetUsername(res.data.Username);
        setFirstName(res.data.FirstName);
        setLastName(res.data.LastName);
        SetEmail(res.data.Email);
        SetContactNo(res.data.ContactNumber);
        setGender(res.data.Gender);
        setCountry(res.data.Country);
        SetCurrentPassword(res.data.Password);
        SetPassword(res.data.Password);


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
                      <strong>User Name</strong>: {Customer.Username}
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
                        <u>{Customer.Email}</u>
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