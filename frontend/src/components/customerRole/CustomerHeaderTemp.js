import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/CustomerHeaderStyles.css";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import PasswordStrengthIndicator from "./passwordStrength";
import "../../css/shoppingcartIncrementStyles.css";
import { Link } from "react-router-dom";

const bcrypt = require("bcryptjs");
export default function CustomerHeader(props) {
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
  const [statusHolder, setStatusHolder] = useState("1");
  let [ExtraError, setExtraError] = useState("");

  const [passwordMatchDiv, setPasswordMatchDiv] = useState(true);
  const [passwordMisMatchDiv, setPasswordMisMatchDiv] = useState(true);

  const isNumberRegx = /\d/;
  const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  const [passwordValidity, setPasswordValidity] = useState({
    minChar: null,
    number: null,
    specialChar: null,
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

  let CustomerIDTemp = "6199d490bfd483038f7067bf";

  function clearErrors() {
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
      } else if (Password !== confirmpassword) {
        flag1 = 0;
        setPasswordMisMatchDiv(false);
        setPasswordMatchDiv(true);
      } else {
        flag1 = 0;
        setPasswordMatchDiv(true);
        setPasswordMisMatchDiv(true);
      }
    } else {
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
      } else {
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
    } else if (Password.length === 0) {
      flag1 = 0;
      SetPasswordError("New password is required !");
    } else if (ConfirmPassword.length === 0) {
      flag1 = 0;
      SetConfirmPasswordError("Confirm password is required !");
    } else if (Password !== ConfirmPassword) {
      flag1 = 0;
      setPasswordMisMatchDiv(false);
      setPasswordMatchDiv(true);
    } else if (
      passwordValidity.minChar !== true ||
      passwordValidity.specialChar !== true ||
      passwordValidity.number !== true
    ) {
      flag1 = 0;
      setExtraError("Please give the password in required format");
    } else {
      flag1 = 1;
    }
  }

  function changePassword(e) {
    e.preventDefault();
    checkCurrentPassword();
    validatePasswords();

    console.log(flag1);

    if (flag1 === 1) {
      Password = bcrypt.hashSync(Password, bcrypt.genSaltSync(12));
      SetPassword(bcrypt.hashSync(Password, bcrypt.genSaltSync(12)));

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
    setchangePasswordmodelOpen(true);
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
  // let navigate = useNavigate();

  function validate() {
    if (FirstName.length === 0) {
      flag1 = 0;
      setFirstNameError("First name is required ! ");
    } else if (LastName.length === 0) {
      flag1 = 0;
      setLastNameError("Last name is required !");
    } else if (ContactNumber.length === 0) {
      flag1 = 0;
      SetContactNoError("Contact number is required !");
    } else if (Gender.length === 0) {
      flag1 = 0;
      setGenderError("Gender is required !");
    } else if (Country.length === 0) {
      flag1 = 0;
      setCountryError("Country is required !");
    } else {
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
    };

    console.log(newCustomer);

    validate();
    console.log(flag1);

    if (flag1 === 1) {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          setmodalOpenForLoading(true);

          axios
            .put(
              "https://kaushal-rashmika-music.herokuapp.com/customer/update/" +
                CustomerIDTemp,
              newCustomer
            )
            .then(() => {
              setmodalOpenForLoading(false);
              Swal.fire("Saved!", "", "success");

              ChangePasswordmodalClose();
            })
            .catch((err) => {
              console.log(err);
              setmodalOpenForLoading(false);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! Try again Later!",
              });
            });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
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
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "Don't you enjoy our music anymore?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Delete Profile",
          cancelButtonText: "Cancel",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(
                "https://kaushal-rashmika-music.herokuapp.com/customer/delete/" +
                  CustomerIDTemp
              )
              .then((res) => {
                swalWithBootstrapButtons.fire(
                  "Deleted!",
                  "Your Profile has been deleted.",
                  "success"
                );
                EditProfilemodalClose();
                // navigate('/');
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              "Cancelled",
              "Thank you for staying with us !",
              "error"
            );
          }
        });
    }
  }

  function getCustomerDetails() {
    axios
      .get(
        "https://kaushal-rashmika-music.herokuapp.com/customer/get/" +
          CustomerIDTemp
      )
      .then((res) => {
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
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  useEffect(() => {
    function getOne() {
      axios
        .get(
          "https://kaushal-rashmika-music.herokuapp.com/customer/get/" +
            CustomerIDTemp
        )
        .then((res) => {
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
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getOne();
  }, []);

  useEffect(() => {
    function getCartCount() {
      //const CoverID = props.match.params.id;

      const CustomerID = CustomerIDTemp;

      axios

        .get(
          "https://kaushal-rashmika-music.herokuapp.com/shoppingCart/getOneCart/" +
            CustomerID
        )

        .then((res) => {
          document.getElementById("countHolder").innerHTML =
            res.data.CoverIDs.length;
        })

        .catch((err) => {
          Swal.fire({
            icon: "error",

            title: "Oops...",

            text: "Somethi went wrong!",

            footer: '<p style = "color : #D0193A">Currently unavailable!',
          });
        });
    }

    getCartCount();
  }, []);
  return (
    <div className="customerHeader">
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
          <img
            src={"/images/KaushalOfficialLogo.jpeg"}
            class="img-fluid"
            alt="Responsive image"
            style={{ width: "40px", borderRadius: "8px" }}
          />
          <span> </span>
          <Link
            to="/customer/home"
            style={{ textDecoration: "none", color: "#764A34" }}
          >
            <font style={{ fontFamily: "Old Standard TT", fontSize: "18px" }}>
              <b>KAUSHAL</b>
            </font>{" "}
            <font style={{ fontFamily: "Old Standard TT", fontSize: "18px" }}>
              RASHMIKA
            </font>
          </Link>
        </a>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <Link
                class="nav-link"
                to="/customer/dicoversmusiccovers"
                id="classicalHeader"
              >
                <font> Guitar Covers </font>
              </Link>
            </li>
            <li class="nav-item">
              <Link
                class="nav-link"
                to="/customer/discovertechniquesandlessons"
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
                  Guitar Technics & Lessons
                </font>
              </Link>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input
              id="searchBar"
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              id="SearchBtn"
              class="btn  my-2 my-sm-0 btn-sm"
              type="submit"
            >
              Search
            </button>
          </form>

          <div>
            {statusHolder == 1 ? (
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
                <svg
                  id="Sicons"
                  onClick={() => {
                    props.history.push("/customer/shoppingcart");
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="#764A34"
                  class="bi bi-bag-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
                </svg>
                <span class="badge badge-warning" id="countHolder">
                  0
                </span>

                <span
                  className="userProfileSpan ml-1 mt-1"
                  onClick={() => {
                    props.history.push("/customer/login");
                    localStorage.removeItem("CustomerID");
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
            ) : (
              <div>
                <button
                  id="SearchBtn"
                  class="btn  my-2 my-sm-0 btn-sm"
                  type="submit"
                  style={{ color: "white", backgroundColor: "#764A34" }}
                >
                  Sign In
                </button>
                <button
                  id="SearchBtn"
                  class="btn  my-2 my-sm-0 btn-sm"
                  type="submit"
                  style={{ color: "white", backgroundColor: "#764A34" }}
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* user details update model */}
      <Modal show={editProfilemodelOpen} size="lg">
        <Modal.Header>
          <h1>My Profile</h1>

          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              EditProfilemodalClose();
              Profilemodalopen();
            }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row text-center">
              <div className="col-sm-6">
                <h6 style={{ color: "#764A34" }}>
                  <strong>User Name</strong>: {Customer.Username}
                </h6>
              </div>
              <div className="col-sm-6">
                <h6 style={{ color: "#764A34" }}>
                  <strong>Email</strong>:{" "}
                  <a href="">
                    <u>{Customer.Email}</u>
                  </a>
                </h6>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <center>
                  <br />
                  <div className="col-md-9 input-group">
                    <div class="input-group-append">
                      <span className="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-person-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                      </span>
                    </div>
                    <input
                      required
                      type="text"
                      class="form-control"
                      placeholder="First Name"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        setFirstNameError("");
                      }}
                      Value={Customer.FirstName}
                    />
                  </div>
                  <p
                    className="mt-1 mb-0"
                    style={{ color: "red", fontWeight: "bold" }}
                  >
                    {FirstNameError}
                  </p>
                  <br />
                  <div className="col-md-9 input-group">
                    <div class="input-group-append">
                      <span className="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-telephone-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                          />
                        </svg>
                      </span>
                    </div>
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Contact Number"
                      onChange={(e) => {
                        SetContactNo(e.target.value);
                        SetContactNoError("");
                      }}
                      Value={Customer.ContactNumber}
                      required
                    />
                  </div>
                  <p
                    className=" mt-1 mb-0"
                    style={{ color: "red", fontWeight: "bold" }}
                  >
                    {ContactNumberError}
                  </p>
                  <br />

                  <div className="col-md-9 input-group">
                    <div class="input-group-append">
                      <span className="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-gender-ambiguous"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M11.5 1a.5.5 0 0 1 0-1h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-3.45 3.45A4 4 0 0 1 8.5 10.97V13H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V14H6a.5.5 0 0 1 0-1h1.5v-2.03a4 4 0 1 1 3.471-6.648L14.293 1H11.5zm-.997 4.346a3 3 0 1 0-5.006 3.309 3 3 0 0 0 5.006-3.31z"
                          />
                        </svg>
                      </span>
                    </div>
                    <select
                      className="form-control"
                      id="gender"
                      name="gender"
                      onChange={(e) => {
                        setGender(e.target.value);
                        setGenderError("");
                      }}
                      value={Gender}
                      required
                    >
                      <option>Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  <p
                    className=" mt-1 mb-0"
                    style={{ color: "red", fontWeight: "bold" }}
                  >
                    {GenderError}
                  </p>
                </center>
              </div>

              <div className="col-sm-6">
                <center>
                  <br />
                  <div className="col-md-9 input-group">
                    <div class="input-group-append">
                      <span className="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-person-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                      </span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Last Name"
                      onChange={(e) => {
                        setLastName(e.target.value);
                        setLastNameError("");
                      }}
                      Value={Customer.LastName}
                      required
                    />
                  </div>
                  <p
                    className=" mt-1 mb-0"
                    style={{ color: "red", fontWeight: "bold" }}
                  >
                    {LastNameError}
                  </p>
                  <br />
                  <div className="col-md-9 input-group">
                    <div class="input-group-append">
                      <span className="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-globe"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                        </svg>
                      </span>
                    </div>
                    <select
                      required
                      value={Country}
                      className="form-control"
                      id="country"
                      name="country"
                      onChange={(e) => {
                        setCountry(e.target.value);
                        setCountryError("");
                      }}
                      required
                    >
                      <option>Select Country</option>
                      <option value="Afganistan">Afghanistan</option>
                      <option value="Albania">Albania</option>
                      <option value="Algeria">Algeria</option>
                      <option value="American Samoa">American Samoa</option>
                      <option value="Andorra">Andorra</option>
                      <option value="Angola">Angola</option>
                      <option value="Anguilla">Anguilla</option>
                      <option value="Antigua & Barbuda">
                        Antigua & Barbuda
                      </option>
                      <option value="Argentina">Argentina</option>
                      <option value="Armenia">Armenia</option>
                      <option value="Aruba">Aruba</option>
                      <option value="Australia">Australia</option>
                      <option value="Austria">Austria</option>
                      <option value="Azerbaijan">Azerbaijan</option>
                      <option value="Bahamas">Bahamas</option>
                      <option value="Bahrain">Bahrain</option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="Barbados">Barbados</option>
                      <option value="Belarus">Belarus</option>
                      <option value="Belgium">Belgium</option>
                      <option value="Belize">Belize</option>
                      <option value="Benin">Benin</option>
                      <option value="Bermuda">Bermuda</option>
                      <option value="Bhutan">Bhutan</option>
                      <option value="Bolivia">Bolivia</option>
                      <option value="Bonaire">Bonaire</option>
                      <option value="Bosnia & Herzegovina">
                        Bosnia & Herzegovina
                      </option>
                      <option value="Botswana">Botswana</option>
                      <option value="Brazil">Brazil</option>
                      <option value="British Indian Ocean Ter">
                        British Indian Ocean Ter
                      </option>
                      <option value="Brunei">Brunei</option>
                      <option value="Bulgaria">Bulgaria</option>
                      <option value="Burkina Faso">Burkina Faso</option>
                      <option value="Burundi">Burundi</option>
                      <option value="Cambodia">Cambodia</option>
                      <option value="Cameroon">Cameroon</option>
                      <option value="Canada">Canada</option>
                      <option value="Canary Islands">Canary Islands</option>
                      <option value="Cape Verde">Cape Verde</option>
                      <option value="Cayman Islands">Cayman Islands</option>
                      <option value="Central African Republic">
                        Central African Republic
                      </option>
                      <option value="Chad">Chad</option>
                      <option value="Channel Islands">Channel Islands</option>
                      <option value="Chile">Chile</option>
                      <option value="China">China</option>
                      <option value="Christmas Island">Christmas Island</option>
                      <option value="Cocos Island">Cocos Island</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Comoros">Comoros</option>
                      <option value="Congo">Congo</option>
                      <option value="Cook Islands">Cook Islands</option>
                      <option value="Costa Rica">Costa Rica</option>
                      <option value="Cote DIvoire">Cote DIvoire</option>
                      <option value="Croatia">Croatia</option>
                      <option value="Cuba">Cuba</option>
                      <option value="Curaco">Curacao</option>
                      <option value="Cyprus">Cyprus</option>
                      <option value="Czech Republic">Czech Republic</option>
                      <option value="Denmark">Denmark</option>
                      <option value="Djibouti">Djibouti</option>
                      <option value="Dominica">Dominica</option>
                      <option value="Dominican Republic">
                        Dominican Republic
                      </option>
                      <option value="East Timor">East Timor</option>
                      <option value="Ecuador">Ecuador</option>
                      <option value="Egypt">Egypt</option>
                      <option value="El Salvador">El Salvador</option>
                      <option value="Equatorial Guinea">
                        Equatorial Guinea
                      </option>
                      <option value="Eritrea">Eritrea</option>
                      <option value="Estonia">Estonia</option>
                      <option value="Ethiopia">Ethiopia</option>
                      <option value="Falkland Islands">Falkland Islands</option>
                      <option value="Faroe Islands">Faroe Islands</option>
                      <option value="Fiji">Fiji</option>
                      <option value="Finland">Finland</option>
                      <option value="France">France</option>
                      <option value="French Guiana">French Guiana</option>
                      <option value="French Polynesia">French Polynesia</option>
                      <option value="French Southern Ter">
                        French Southern Ter
                      </option>
                      <option value="Gabon">Gabon</option>
                      <option value="Gambia">Gambia</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Germany">Germany</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Gibraltar">Gibraltar</option>
                      <option value="Great Britain">Great Britain</option>
                      <option value="Greece">Greece</option>
                      <option value="Greenland">Greenland</option>
                      <option value="Grenada">Grenada</option>
                      <option value="Guadeloupe">Guadeloupe</option>
                      <option value="Guam">Guam</option>
                      <option value="Guatemala">Guatemala</option>
                      <option value="Guinea">Guinea</option>
                      <option value="Guyana">Guyana</option>
                      <option value="Haiti">Haiti</option>
                      <option value="Hawaii">Hawaii</option>
                      <option value="Honduras">Honduras</option>
                      <option value="Hong Kong">Hong Kong</option>
                      <option value="Hungary">Hungary</option>
                      <option value="Iceland">Iceland</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="India">India</option>
                      <option value="Iran">Iran</option>
                      <option value="Iraq">Iraq</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Isle of Man">Isle of Man</option>
                      <option value="Israel">Israel</option>
                      <option value="Italy">Italy</option>
                      <option value="Jamaica">Jamaica</option>
                      <option value="Japan">Japan</option>
                      <option value="Jordan">Jordan</option>
                      <option value="Kazakhstan">Kazakhstan</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Kiribati">Kiribati</option>
                      <option value="Korea North">Korea North</option>
                      <option value="Korea Sout">Korea South</option>
                      <option value="Kuwait">Kuwait</option>
                      <option value="Kyrgyzstan">Kyrgyzstan</option>
                      <option value="Laos">Laos</option>
                      <option value="Latvia">Latvia</option>
                      <option value="Lebanon">Lebanon</option>
                      <option value="Lesotho">Lesotho</option>
                      <option value="Liberia">Liberia</option>
                      <option value="Libya">Libya</option>
                      <option value="Liechtenstein">Liechtenstein</option>
                      <option value="Lithuania">Lithuania</option>
                      <option value="Luxembourg">Luxembourg</option>
                      <option value="Macau">Macau</option>
                      <option value="Macedonia">Macedonia</option>
                      <option value="Madagascar">Madagascar</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Malawi">Malawi</option>
                      <option value="Maldives">Maldives</option>
                      <option value="Mali">Mali</option>
                      <option value="Malta">Malta</option>
                      <option value="Marshall Islands">Marshall Islands</option>
                      <option value="Martinique">Martinique</option>
                      <option value="Mauritania">Mauritania</option>
                      <option value="Mauritius">Mauritius</option>
                      <option value="Mayotte">Mayotte</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Midway Islands">Midway Islands</option>
                      <option value="Moldova">Moldova</option>
                      <option value="Monaco">Monaco</option>
                      <option value="Mongolia">Mongolia</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Morocco">Morocco</option>
                      <option value="Mozambique">Mozambique</option>
                      <option value="Myanmar">Myanmar</option>
                      <option value="Nambia">Nambia</option>
                      <option value="Nauru">Nauru</option>
                      <option value="Nepal">Nepal</option>
                      <option value="Netherland Antilles">
                        Netherland Antilles
                      </option>
                      <option value="Netherlands">
                        Netherlands (Holland, Europe)
                      </option>
                      <option value="Nevis">Nevis</option>
                      <option value="New Caledonia">New Caledonia</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Nicaragua">Nicaragua</option>
                      <option value="Niger">Niger</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Niue">Niue</option>
                      <option value="Norfolk Island">Norfolk Island</option>
                      <option value="Norway">Norway</option>
                      <option value="Oman">Oman</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="Palau Island">Palau Island</option>
                      <option value="Palestine">Palestine</option>
                      <option value="Panama">Panama</option>
                      <option value="Papua New Guinea">Papua New Guinea</option>
                      <option value="Paraguay">Paraguay</option>
                      <option value="Peru">Peru</option>
                      <option value="Phillipines">Philippines</option>
                      <option value="Pitcairn Island">Pitcairn Island</option>
                      <option value="Poland">Poland</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Puerto Rico">Puerto Rico</option>
                      <option value="Qatar">Qatar</option>
                      <option value="Republic of Montenegro">
                        Republic of Montenegro
                      </option>
                      <option value="Republic of Serbia">
                        Republic of Serbia
                      </option>
                      <option value="Reunion">Reunion</option>
                      <option value="Romania">Romania</option>
                      <option value="Russia">Russia</option>
                      <option value="Rwanda">Rwanda</option>
                      <option value="St Barthelemy">St Barthelemy</option>
                      <option value="St Eustatius">St Eustatius</option>
                      <option value="St Helena">St Helena</option>
                      <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                      <option value="St Lucia">St Lucia</option>
                      <option value="St Maarten">St Maarten</option>
                      <option value="St Pierre & Miquelon">
                        St Pierre & Miquelon
                      </option>
                      <option value="St Vincent & Grenadines">
                        St Vincent & Grenadines
                      </option>
                      <option value="Saipan">Saipan</option>
                      <option value="Samoa">Samoa</option>
                      <option value="Samoa American">Samoa American</option>
                      <option value="San Marino">San Marino</option>
                      <option value="Sao Tome & Principe">
                        Sao Tome & Principe
                      </option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Senegal">Senegal</option>
                      <option value="Seychelles">Seychelles</option>
                      <option value="Sierra Leone">Sierra Leone</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Slovakia">Slovakia</option>
                      <option value="Slovenia">Slovenia</option>
                      <option value="Solomon Islands">Solomon Islands</option>
                      <option value="Somalia">Somalia</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Spain">Spain</option>
                      <option value="Sri Lanka">Sri Lanka</option>
                      <option value="Sudan">Sudan</option>
                      <option value="Suriname">Suriname</option>
                      <option value="Swaziland">Swaziland</option>
                      <option value="Sweden">Sweden</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Syria">Syria</option>
                      <option value="Tahiti">Tahiti</option>
                      <option value="Taiwan">Taiwan</option>
                      <option value="Tajikistan">Tajikistan</option>
                      <option value="Tanzania">Tanzania</option>
                      <option value="Thailand">Thailand</option>
                      <option value="Togo">Togo</option>
                      <option value="Tokelau">Tokelau</option>
                      <option value="Tonga">Tonga</option>
                      <option value="Trinidad & Tobago">
                        Trinidad & Tobago
                      </option>
                      <option value="Tunisia">Tunisia</option>
                      <option value="Turkey">Turkey</option>
                      <option value="Turkmenistan">Turkmenistan</option>
                      <option value="Turks & Caicos Is">
                        Turks & Caicos Is
                      </option>
                      <option value="Tuvalu">Tuvalu</option>
                      <option value="Uganda">Uganda</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Ukraine">Ukraine</option>
                      <option value="United Arab Erimates">
                        United Arab Emirates
                      </option>
                      <option value="United States of America">
                        United States of America
                      </option>
                      <option value="Uraguay">Uruguay</option>
                      <option value="Uzbekistan">Uzbekistan</option>
                      <option value="Vanuatu">Vanuatu</option>
                      <option value="Vatican City State">
                        Vatican City State
                      </option>
                      <option value="Venezuela">Venezuela</option>
                      <option value="Vietnam">Vietnam</option>
                      <option value="Virgin Islands (Brit)">
                        Virgin Islands (Brit)
                      </option>
                      <option value="Virgin Islands (USA)">
                        Virgin Islands (USA)
                      </option>
                      <option value="Wake Island">Wake Island</option>
                      <option value="Wallis & Futana Is">
                        Wallis & Futana Is
                      </option>
                      <option value="Yemen">Yemen</option>
                      <option value="Zaire">Zaire</option>
                      <option value="Zambia">Zambia</option>
                      <option value="Zimbabwe">Zimbabwe</option>
                    </select>
                  </div>
                  <p
                    className=" mt-1 mb-0"
                    style={{ color: "red", fontWeight: "bold" }}
                  >
                    {CountryError}
                  </p>
                  <br />

                  <div className="col-md-9 input-group" hidden={confirmDelete}>
                    <div class="input-group-append">
                      <span className="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-lock-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                        </svg>
                      </span>
                    </div>

                    <input
                      type={CurrentpasswordShown2 ? "text" : "password"}
                      class="form-control border-right-0"
                      id="CurrentPassword"
                      placeholder="Password*"
                      onChange={(e) => {
                        SetCurrentPassword2(e.target.value);
                        setConfirmDeleteError("");
                        SetCurrentPasswordError("");
                      }}
                      required
                    />
                    <span class="input-group-append bg-white border-left-0">
                      <span class="input-group-text bg-transparent">
                        <div hidden={CurrenteyeSlashIcon2}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-eye-slash-fill"
                            viewBox="0 0 16 16"
                            onClick={() => {
                              setCurrentPasswordShown2(true);
                              setCurrentEyeSlashIcon2(true);
                              setCurrentEyeIcon2(false);
                            }}
                          >
                            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                          </svg>
                        </div>
                        <div hidden={CurrenteyeIcon2}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-eye-fill"
                            viewBox="0 0 16 16"
                            onClick={() => {
                              setCurrentPasswordShown2(false);
                              setCurrentEyeSlashIcon2(false);
                              setCurrentEyeIcon2(true);
                            }}
                          >
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                          </svg>
                        </div>
                      </span>
                    </span>
                  </div>
                  <p
                    className="  mt-1 mb-0"
                    style={{ color: "red", fontWeight: "bold" }}
                  >
                    {ConfirmDeleteError}
                  </p>
                  <p
                    className="  mt-1 mb-0"
                    style={{ color: "red", fontWeight: "bold" }}
                  >
                    {currentPasswordError}
                  </p>
                  <br />
                </center>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="row">
            <div className="col-md-4">
              <center>
                <button
                  type="button"
                  class="btn btn"
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#28A745",
                    color: "white",
                    fontSize: "16px",
                  }}
                  onClick={updateProfile}
                >
                  <strong>Update</strong>
                </button>
              </center>
            </div>

            <div className="col-md-4">
              <center>
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{
                    borderRadius: "10px",
                    fontSize: "9px",
                    color: "white",
                  }}
                  onClick={goToChangePassword}
                >
                  <strong>Change Password</strong>
                </button>
              </center>
            </div>

            <div className="col-md-4">
              <center>
                <button
                  type="button"
                  class="btn "
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#D0193A",
                    color: "white",
                    fontSize: "16px",
                  }}
                  onClick={deleteProfile}
                >
                  <strong>Delete</strong>
                </button>
              </center>
            </div>
          </div>
        </Modal.Footer>
      </Modal>

      {/* My Profile model */}
      <Modal show={profilemodelOpen} size="lg">
        <Modal.Header>
          <h1>My Profile</h1>

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
                    <h6 style={{ color: "#764A34" }}>
                      <strong>User Name</strong>: {Customer.Username}
                    </h6>
                  </div>
                  <br />
                  <div className="col-md-9 col-sm-6 input-group-append">
                    <label for="test">
                      <svg
                        style={{ color: "#764A34" }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-person-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      </svg>
                    </label>
                    <span>
                      <p
                        className="ml-2"
                        style={{ color: "#764A34", fontWeight: "bold" }}
                      >
                        {" "}
                        <span
                          style={{ color: "black", fontWeight: "normal" }}
                        >{`${FirstName} ${LastName}`}</span>
                      </p>
                    </span>
                  </div>
                  <br />
                  <div className="col-md-9 col-sm-6 input-group-append">
                    <label for="test">
                      <svg
                        style={{ color: "#764A34" }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-telephone-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                        />
                      </svg>
                    </label>
                    <span>
                      <p
                        className="ml-2"
                        style={{ color: "#764A34", fontWeight: "bold" }}
                      >
                        {" "}
                        <span
                          style={{ color: "black", fontWeight: "normal" }}
                        >{`${ContactNumber}`}</span>
                      </p>
                    </span>
                  </div>
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
                    <label for="test">
                      {" "}
                      <svg
                        style={{ color: "#764A34" }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-globe"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                      </svg>
                    </label>
                    <span>
                      <p
                        className="ml-2"
                        style={{ color: "#764A34", fontWeight: "bold" }}
                      >
                        {" "}
                        <span
                          style={{ color: "black", fontWeight: "normal" }}
                        >{`${Country}`}</span>
                      </p>
                    </span>
                  </div>
                  <br />
                  <div className="col-md-9 col-sm-6 input-group">
                    <label for="test">
                      <svg
                        style={{ color: "#764A34" }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-gender-ambiguous"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M11.5 1a.5.5 0 0 1 0-1h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-3.45 3.45A4 4 0 0 1 8.5 10.97V13H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V14H6a.5.5 0 0 1 0-1h1.5v-2.03a4 4 0 1 1 3.471-6.648L14.293 1H11.5zm-.997 4.346a3 3 0 1 0-5.006 3.309 3 3 0 0 0 5.006-3.31z"
                        />
                      </svg>
                    </label>
                    <span>
                      <p
                        className="ml-2"
                        style={{ color: "#764A34", fontWeight: "bold" }}
                      >
                        {" "}
                        <span
                          style={{ color: "black", fontWeight: "normal" }}
                        >{`${Gender}`}</span>
                      </p>
                    </span>
                  </div>
                  <br />

                  <br />
                </center>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="row">
            <div className="col-md-6 col-sm-6 mb-2">
              <button
                type="button"
                class="btn  btn-block"
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#764A34",
                  color: "white",
                  fontSize: "18px",
                }}
                onClick={goToEditProfile}
              >
                <strong>Edit Profile</strong>
              </button>
            </div>
            <div className="col-md-6 col-sm-6">
              <button
                type="button"
                class="btn  btn-block"
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#764A34",
                  color: "white",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  props.history.push("/customer/purchasehistory");
                  ProfilemodalClose();
                }}
              >
                <strong>Purchase History</strong>
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Change Password */}
      <Modal show={changePasswordmodelOpen} size="lg">
        <Modal.Header>
          <h1>Change Password</h1>

          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              ChangePasswordmodalClose();
              EditProfilemodalopen();
            }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="text-center" hidden={passwordMatchDiv}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="#279B14"
                class="bi bi-check-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
              <p style={{ color: "#279B14" }}>
                <b>Password Match</b>
              </p>
            </div>
            <div className="text-center" hidden={passwordMisMatchDiv}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="#D0193A"
                class="bi bi-x-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
              </svg>
              <p style={{ color: "#D0193A" }}>
                <b>Password MisMatch</b>
              </p>
            </div>

            <div className="row justify-content-center">
              <div className="col-sm-6">
                <div class="text-center">
                  <div class="container-fluid">
                    <div class="form-group row">
                      <div class="input-group">
                        <span
                          class="input-group-addon"
                          style={{ marginRight: "5px" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            fill="currentColor"
                            class="bi bi-lock-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                          </svg>
                        </span>
                        <input
                          type={CurrentpasswordShown ? "text" : "password"}
                          style={{
                            borderTopLeftRadius: "5px",
                            borderBottomLeftRadius: "5px",
                          }}
                          class="form-control border-right-0"
                          id="CurrentPassword"
                          placeholder="Current Password*"
                          onChange={(e) => {
                            SetCurrentPassword2(e.target.value);
                            SetCurrentPasswordError2("");
                            SetCurrentPasswordError("");
                          }}
                          required
                        />
                        <span class="input-group-append bg-white border-left-0">
                          <span class="input-group-text bg-transparent">
                            <div hidden={CurrenteyeSlashIcon}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                class="bi bi-eye-slash-fill"
                                viewBox="0 0 16 16"
                                onClick={() => {
                                  setCurrentPasswordShown(true);
                                  setCurrentEyeSlashIcon(true);
                                  setCurrentEyeIcon(false);
                                }}
                              >
                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                              </svg>
                            </div>
                            <div hidden={CurrenteyeIcon}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                class="bi bi-eye-fill"
                                viewBox="0 0 16 16"
                                onClick={() => {
                                  setCurrentPasswordShown(false);
                                  setCurrentEyeSlashIcon(false);
                                  setCurrentEyeIcon(true);
                                }}
                              >
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                              </svg>
                            </div>
                          </span>
                        </span>
                      </div>
                      <p
                        className=" mt-1 mb-0"
                        style={{ color: "red", fontWeight: "bold" }}
                      >
                        {currentPasswordError2}
                      </p>
                      <p
                        className=" mt-1 mb-0"
                        style={{ color: "red", fontWeight: "bold" }}
                      >
                        {currentPasswordError}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row  justify-content-center">
              <div className="col-sm-6">
                <div class="text-center">
                  <div class="container-fluid">
                    <div class="form-group row">
                      <div class="input-group">
                        <span
                          class="input-group-addon"
                          style={{ marginRight: "5px" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            fill="currentColor"
                            class="bi bi-lock-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                          </svg>
                        </span>
                        <input
                          type={passwordShown ? "text" : "password"}
                          style={{
                            borderTopLeftRadius: "5px",
                            borderBottomLeftRadius: "5px",
                          }}
                          class="form-control  border-right-0"
                          id="CPPassword"
                          placeholder="New Password*"
                          onFocus={() => setPasswordFocused(true)}
                          onBlur={() => setPasswordFocused(false)}
                          onChange={(e) => {
                            SetPassword(e.target.value);
                            SetPasswordError("");
                            setExtraError("");
                            setPasswordValidity({
                              minChar:
                                e.target.value.length >= 8 ? true : false,
                              number: isNumberRegx.test(e.target.value)
                                ? true
                                : false,
                              specialChar: specialCharacterRegx.test(
                                e.target.value
                              )
                                ? true
                                : false,
                            });
                          }}
                          required
                        />

                        <span class="input-group-append bg-white border-left-0">
                          <span class="input-group-text bg-transparent">
                            <div hidden={eyeSlashIcon}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                class="bi bi-eye-slash-fill"
                                viewBox="0 0 16 16"
                                onClick={() => {
                                  setPasswordShown(true);
                                  setEyeSlashIcon(true);
                                  setEyeIcon(false);
                                }}
                              >
                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                              </svg>
                            </div>
                            <div hidden={eyeIcon}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                class="bi bi-eye-fill"
                                viewBox="0 0 16 16"
                                onClick={() => {
                                  setPasswordShown(false);
                                  setEyeSlashIcon(false);
                                  setEyeIcon(true);
                                }}
                              >
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                              </svg>
                            </div>
                          </span>
                        </span>
                      </div>
                      <p
                        className=" mt-1 mb-0"
                        style={{ color: "red", fontWeight: "bold" }}
                      >
                        {PasswordError}
                      </p>
                      <p
                        className=" mt-1 mb-0"
                        style={{ color: "red", fontWeight: "bold" }}
                      >
                        {ExtraError}
                      </p>
                      {passwordFocused && (
                        <PasswordStrengthIndicator
                          validity={passwordValidity}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-sm-6">
                <div class="text-center">
                  <div class="container-fluid">
                    <div class="form-group row">
                      <div class="input-group">
                        <span
                          class="input-group-addon"
                          style={{ marginRight: "5px" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            fill="currentColor"
                            class="bi bi-lock-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                          </svg>
                        </span>
                        <input
                          type={CpasswordShown ? "text" : "password"}
                          style={{
                            borderTopLeftRadius: "5px",
                            borderBottomLeftRadius: "5px",
                          }}
                          class="form-control border-right-0"
                          id="CPConfirmPassword"
                          placeholder="Re-type Password*"
                          onChange={(e) => {
                            SetConfirmPassword(e.target.value);
                            SetConfirmPasswordError("");
                            checkPasswords(e.target.value);
                          }}
                          onBlur={() => {
                            setPasswordMatchDiv(true);
                            setPasswordMisMatchDiv(true);
                          }}
                          required
                        />
                        <span class="input-group-append bg-white border-left-0">
                          <span class="input-group-text bg-transparent">
                            <div hidden={CeyeSlashIcon}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                class="bi bi-eye-slash-fill"
                                viewBox="0 0 16 16"
                                onClick={() => {
                                  setCPasswordShown(true);
                                  setCEyeSlashIcon(true);
                                  setCEyeIcon(false);
                                }}
                              >
                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                              </svg>
                            </div>
                            <div hidden={CeyeIcon}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                class="bi bi-eye-fill"
                                viewBox="0 0 16 16"
                                onClick={() => {
                                  setCPasswordShown(false);
                                  setCEyeSlashIcon(false);
                                  setCEyeIcon(true);
                                }}
                              >
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                              </svg>
                            </div>
                          </span>
                        </span>
                      </div>
                      <p
                        className=" mt-1 mb-0"
                        style={{ color: "red", fontWeight: "bold" }}
                      >
                        {confirmPasswordError}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="row">
            <div className="col-md-10">
              <button
                type="button"
                class="btn btn-lg btn-block"
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#D0193A",
                  color: "white",
                  fontSize: "9px",
                }}
                onClick={changePassword}
              >
                <strong>Change Password</strong>
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal show={modalOpenForLoading} size="md">
        <Modal.Header></Modal.Header>

        <Modal.Body>
          <div class="d-flex justify-content-center">
            <div class="spinner-border text-success" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <br />
          <h1 style={{ textAlign: "center", color: "#764A34" }}>
            Please wait!
          </h1>
          <h6 style={{ textAlign: "center", color: "#764A34" }}>
            Your changes are being saved...
          </h6>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
