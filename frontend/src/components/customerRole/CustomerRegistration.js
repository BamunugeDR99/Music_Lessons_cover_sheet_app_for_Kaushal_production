import React, { useState, useEffect } from "react";
import axios from "axios";
import PasswordStrengthIndicator from "./passwordStrength";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

export default function CustomerRegistration(props) {
  const [passwordShown, setPasswordShown] = useState(false);
  const [CpasswordShown, setCPasswordShown] = useState(false);
  const [eyeSlashIcon, setEyeSlashIcon] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(true);
  const [CeyeSlashIcon, setCEyeSlashIcon] = useState(false);
  const [CeyeIcon, setCEyeIcon] = useState(true);

  //useStates to store user inputs
  let [Username, SetUsername] = useState("");
  let [Email, SetEmail] = useState("");
  let [ContactNumber, SetContactNo] = useState("");
  let [Password, SetPassword] = useState("");
  let [ConfirmPassword, SetConfirmPassword] = useState("");
  let [FirstName, setFirstName] = useState("");
  let [LastName, setLastName] = useState("");
  let [Gender, setGender] = useState("");
  let [Country, setCountry] = useState("");
  let [Allcustomers, setAllCustomers] = useState([]);
  let [Allusername, setAllusernames] = useState([]);
  let [Allemails, setAllemails] = useState([]);

  let [UsernameError, SetUsernameError] = useState("");
  let [EmailError, SetEmailError] = useState("");
  let [ContactNumberError, SetContactNoError] = useState("");
  let [PasswordError, SetPasswordError] = useState("");
  let [confirmPasswordError, SetConfirmPasswordError] = useState("");
  let [FirstNameError, setFirstNameError] = useState("");
  let [LastNameError, setLastNameError] = useState("");
  let [GenderError, setGenderError] = useState("");
  let [CountryError, setCountryError] = useState("");
  let [TnCError, setTnCError] = useState("");
  let [ExtraError, setExtraError] = useState("");

  const [passwordMatchDiv, setPasswordMatchDiv] = useState(true);
  const [passwordMisMatchDiv, setPasswordMisMatchDiv] = useState(true);

  let flag1 = 0;

  const [passwordFocused, setPasswordFocused] = useState(false);

  const isNumberRegx = /\d/;
  const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  const [passwordValidity, setPasswordValidity] = useState({
    minChar: null,
    number: null,
    specialChar: null,
  });

  const [modalOpenForLoading, setmodalOpenForLoading] = useState(false);
  useEffect(() => {
    // function getCustomers() {
    //   axios.get("https://kaushal-rashmika-music.herokuapp.com/customer/getUsernames").then((res) => {
    //     Allusername = res.data;
    //     setAllusernames(res.data);
    //     axios.get("https://kaushal-rashmika-music.herokuapp.com/customer/getAllEmails").then((res)=>{
    //       Allemails = res.data;
    //       setAllemails(res.data);
    //     }).catch((err)=>{
    //       alert(err.message);
    //     })
    //   }).catch((err) => {
    //     alert(err.message);
    //   })
    // }
    // getCustomers();
  }, []);

  async function checkUserName(username) {
    await axios("https://kaushal-rashmika-music.herokuapp.com/customer/getUsernames")
      .then((res) => {
        Allusername = res.data;
        setAllusernames(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    if (username.length == 0) {
      SetUsernameError("");
    } else {
      // console.log(result);
      if (Allusername.includes(username) === true) {
        flag1 = 0;
        SetUsernameError("UserName Already Exists");
      } else {
        SetUsernameError("");
      }
    }
  }

  async function checkEmail(email) {
    await axios("https://kaushal-rashmika-music.herokuapp.com/customer/getAllEmails")
      .then((res) => {
        Allemails = res.data;
        setAllemails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    if (email.length == 0) {
      SetEmailError("");
    } else {
      if (Allemails.includes(email) === true) {
        flag1 = 0;
        SetEmailError("Email Already Exists");
      } else {
        SetEmailError("");
      }
    }
  }

  function validate() {

    Country = document.getElementById("selectedCountry").value;

    if (Password !== ConfirmPassword) {
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
    } else if (Country.length === 0) {
      flag1 = 0;
      setCountryError("Country is required");
    } else {
      flag1 = 1;
    }
  }

  function checkNamePattern(word, type) {
    if (!/[^a-zA-Z]/.test(word) === false && type == "first") {
      setFirstNameError("First Name can only contain letters");
      flag1 = 0;
    } else if (!/[^a-zA-Z]/.test(word) === false && type == "last") {
      setLastNameError("Last Name can only contain letters");
      flag1 = 0;
    } else {
      flag1 = 1;
    }
  }

  function checkPasswords(confirmpassword) {
    if (Password.length !== 0 || confirmpassword.length !== 0) {
      if (Password === confirmpassword) {
        setPasswordMatchDiv(false);
        setPasswordMisMatchDiv(true);
      } else if (Password !== confirmpassword) {
        setPasswordMisMatchDiv(false);
        setPasswordMatchDiv(true);
      } else {
        setPasswordMatchDiv(true);
        setPasswordMisMatchDiv(true);
      }
    } else {
      setPasswordMatchDiv(true);
      setPasswordMisMatchDiv(true);
    }
  }

  function getDetails(e) {
    e.preventDefault();
    validate();
    //Reconfirm Email UserName!!!!
    console.log(Username);
    console.log(Email);
    checkUserName(Username);
    checkEmail(Email);
    console.log(flag1);
  
    Country = document.getElementById("selectedCountry").value;

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

    if (flag1 == 1) {
      console.log("gg");

      setmodalOpenForLoading(true);

      axios
        .post("https://kaushal-rashmika-music.herokuapp.com/customer/add", newCustomer)
        .then((res) => {
          console.log(res.data);
          console.log("Emal : " + Email);

          axios
            .get("https://kaushal-rashmika-music.herokuapp.com/customer/getEmail/" + Email)
            .then((res) => {
              console.log(res.data);

              const Cart = {
                CustomerID: res.data[0]._id,
                CoverIDs: [],
              };

              console.log(Cart);
              axios
                .post("https://kaushal-rashmika-music.herokuapp.com/shoppingCart/createCart", Cart)
                .then((res) => {
                  setmodalOpenForLoading(false);
                  Swal.fire(
                    "You're! All Set",
                    "You Account Has Been Created Successfully!",
                    "success"
                  );

                  props.history.push("/customer/login")

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
    }
  }

  return (
    <div>
      <br />
      <div className="d-flex justify-content-center">
        <div
          class="card shadow p-3 mb-5 bg-white rounded"
          style={{ border: "solid #764A34" }}
        >
          <div class="card-body">
            <div class="text-center">
              <img
                src={"/images/KaushalOfficialLogo.jpeg"}
                class="rounded img-responsive"
                alt="Production_logo"
                style={{ width: "150px" }}
              />
            </div>
            <br />
            <form onSubmit={getDetails}>
              <div class="text-center">
                <h2 style={{ color: "#764A34" }}>REGISTER HERE</h2>
                <p
                  className=" mt-1 mb-0"
                  style={{ color: "red", fontWeight: "bold" }}
                >
                  {FirstNameError}
                </p>
                <p
                  className=" mt-1 mb-0"
                  style={{ color: "red", fontWeight: "bold" }}
                >
                  {LastNameError}
                </p>
                <p
                  className=" mt-1 mb-0"
                  style={{ color: "red", fontWeight: "bold" }}
                >
                  {ExtraError}
                </p>

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
              </div>

              <br />
              {/* username */}
              <div class="text-center">
                <div class="container-fluid">
                  <div class="form-group row">
                    <div class="input-group">
                      <span
                        class="input-group-addon"
                        style={{ marginRight: "5px" }}
                      >
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="currentColor"
                          class="bi bi-person-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        class="form-control rounded"
                        id="inputUsername"
                        placeholder="Username*"
                        onChange={(e) => {
                          SetUsername(e.target.value);
                          SetUsernameError("");
                          checkUserName(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <p
                      className="ml-5 mt-1 mb-0"
                      style={{ color: "red", fontWeight: "bold" }}
                    >
                      {UsernameError}
                    </p>
                  </div>
                </div>
              </div>
              {/* email */}
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
                          class="bi bi-envelope-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                        </svg>
                      </span>
                      <input
                        type="email"
                        class="form-control rounded"
                        id="inputEmail"
                        placeholder="Email*"
                        onChange={(e) => {
                          SetEmail(e.target.value);
                          SetEmailError("");
                          checkEmail(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <p
                      className="ml-5 mt-1 mb-0"
                      style={{ color: "red", fontWeight: "bold" }}
                    >
                      {EmailError}
                    </p>
                  </div>
                </div>
              </div>
              {/* contact */}
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
                          class="bi bi-telephone-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                          />
                        </svg>
                      </span>
                      <input
                        type="number"
                        class="form-control rounded"
                        id="inputContact"
                        placeholder="Contact Number*"
                        onChange={(e) => {
                          SetContactNo(e.target.value);
                          SetContactNoError("");
                        }}
                        required
                      />
                    </div>
                    <p
                      className="ml-5 mt-1 mb-0"
                      style={{ color: "red", fontWeight: "bold" }}
                    >
                      {ContactNumberError}
                    </p>
                  </div>
                </div>
              </div>
              {/* password */}
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
                        id="inputpassword"
                        placeholder="Password*"
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                        onChange={(e) => {
                          SetPassword(e.target.value);
                          SetPasswordError("");
                          setExtraError("");
                          setPasswordValidity({
                            minChar: e.target.value.length >= 8 ? true : false,
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
                      className="ml-5 mt-1 mb-0"
                      style={{ color: "red", fontWeight: "bold" }}
                    >
                      {PasswordError}
                    </p>
                    {passwordFocused && (
                      <PasswordStrengthIndicator validity={passwordValidity} />
                    )}
                  </div>
                </div>
              </div>
              {/* retype password  */}
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
                        id="inputConfirmPassword"
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
                      className="ml-5 mt-1 mb-0"
                      style={{ color: "red", fontWeight: "bold" }}
                    >
                      {confirmPasswordError}
                    </p>
                  </div>
                </div>
              </div>
              {/* first name and last name  */}

              <div class="row">
                <div class="col-sm">
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
                              class="bi bi-person-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            </svg>
                          </span>
                          <input
                            type="text"
                            class="form-control rounded"
                            id="inputFirstname"
                            placeholder="First Name*"
                            onChange={(e) => {
                              setFirstName(e.target.value);
                              setFirstNameError("");
                              checkNamePattern(e.target.value, "first");
                            }}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm">
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
                              class="bi bi-person-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            </svg>
                          </span>
                          <input
                            type="text"
                            class="form-control rounded"
                            id="inputLastname"
                            placeholder="Last Name*"
                            onChange={(e) => {
                              setLastName(e.target.value);
                              setLastNameError("");
                              checkNamePattern(e.target.value, "last");
                            }}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* gender */}
              <div className="text-center">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="RadioMale"
                    value="Male"
                    onChange={(e) => {
                      setGender(e.target.value);
                      setGenderError("");
                    }}
                    required
                  />
                  <label class="form-check-label" for="inlineRadio1">
                    Male
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="RadioFemale"
                    value="Female"
                    onChange={(e) => {
                      setGender(e.target.value);
                      setGenderError("");
                    }}
                    required
                  />
                  <label class="form-check-label" for="inlineRadio2">
                    Female
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="RadioOther"
                    value="Other"
                    onChange={(e) => {
                      setGender(e.target.value);
                      setGenderError("");
                    }}
                    required
                  />
                  <label class="form-check-label" for="inlineRadio3">
                    Other
                  </label>
                </div>
                <p
                  className="ml-5 mt-1 mb-0"
                  style={{ color: "red", fontWeight: "bold" }}
                >
                  {GenderError}
                </p>
              </div>
              <br />
              {/* country */}
              <div class="text-center">
                <span style={{ marginRight: "5px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-globe"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                  </svg>
                </span>
                <select
                  onClick={(e) => {
                    setCountry(e.target.value);
                    setCountryError("");
                  }}
                  required
                  // class="selectpicker countrypicker"
                  id="selectedCountry"
                  style={{
                    width: "10rem",
                    background: "#764A34",
                    color: "#ffffff",
                    borderRadius: "2px",
                  }}
                >
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

                <p
                  className="ml-5 mt-1 mb-0"
                  style={{ color: "red", fontWeight: "bold" }}
                >
                  {CountryError}
                </p>
              </div>
              <br />
              {/* terms and condition */}
              <div class="text-center">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="TermsC"
                    onClick={(e) => {
                      setTnCError("");
                    }}
                    required
                  />
                  <label class="form-check-label" for="defaultCheck1">
                    Agree to terms and conditions.{" "}
                    <a href="#" className="text-decoration">
                      Click Here
                    </a>
                  </label>
                </div>
                <p
                  className="ml-5 mt-1 mb-0"
                  style={{ color: "red", fontWeight: "bold" }}
                >
                  {TnCError}
                </p>
              </div>
              <br />
              {/* submit button */}
              <div class="text-center mb-0">
                <button
                  type="submit"
                  class="btn"
                  style={{
                    backgroundColor: "#764A34",
                    color: "#ffffff",
                    borderRadius: "8px",
                  }}
                >
                  Submit
                </button>
              </div>

             


            </form>

            <div class="text-center mt-3">          
                  <label class="form-check-label" for="defaultCheck1">
                    Already have an account ? {" "}
                    <Link to="/customer/login" className="text-decoration">
                     Sign in
                    </Link>
                  </label>
              
              </div>
          </div>
        </div>
      </div>
      <br />

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
            Your Account is Being Created...
          </h6>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
