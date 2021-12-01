import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.jfif";
import "../../css/initialpage.css";

export default function InitialPage(props) {
  return (
    <div className="initp">
      <div id="header">
        <button
          type="button"
          class="login"
          onClick = {() => {
              props.history.push("/customer/login")
          }}
          style={{ float: "right", marginRight: "20px" }}
        >
          Login{" "}
        </button>
        <button
          type="button"
          class="register"
          onClick = {() => {
              props.history.push("/customer/registration")
          }}
          style={{ float: "right", marginRight: "20px" }}
        >
          Register
        </button>
      </div>

      <section id="hero">
        <div class="hero-container">
          <img
            src="images/KaushalOfficialLogo.jpeg"
            alt="logo"
            style={{ width: "120px", height: "120px", borderRadius: "35px" }}
          ></img>
          <h1>KAUSHAL RASHMIKA PRODUCTIONS</h1>

          <Link href="#about" class="btn-get-started"  to = "/customer/registration">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
