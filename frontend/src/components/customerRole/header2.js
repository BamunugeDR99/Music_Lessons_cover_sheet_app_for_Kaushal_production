import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from '../../images/logo.jfif';
export default function Header2(props) {

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img className="rounded-circle" src={Logo} width="40" height="40" alt="" />
      </a>
      <span class="navbar-brand mb-0 h1" style={{ fontWeight: "initial", fontFamily: "Old Standard TT" }}>Rashmika Productions</span>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">

          <li class="nav-item dropdown">
            <a class="nav-link " style={{ color: "#764A34", fontWeight: "bolder", fontFamily: "Abel" }} href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Classical Guitar Covers
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link " style={{ color: "#764A34", fontWeight: "bolder", fontFamily: "Abel" }} href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Guitar Techniques & Lessons
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>

        </ul>

        <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>

        <div>
          <button
            type="button"
            class="btn navbar-light shadow-none "
            style={{ color: "#764A34", marginLeft:"-45px"}}

          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" style={{ color: "#764A34" }} class="bi bi-person" viewBox="0 0 13 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
            </svg>
            My Account

          </button>
        </div>

        <div>
          <svg xmlns="http://www.w3.org/2000/svg" style={{ color: "#764A34" }} width="33" height="33" fill="currentColor" class="bi bi-bag-fill" viewBox="0 0 16 16">
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
          </svg>
        </div>


      </div>
    </nav>
  )
}