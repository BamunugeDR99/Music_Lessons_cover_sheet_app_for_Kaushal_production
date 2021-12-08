import React, { useState, useEffect } from "react";
import "../../css/CustomerHeaderStyles.css";

import { Link } from "react-router-dom";

const bcrypt = require("bcryptjs");
export default function CustomerHeaderTempBeforeLogin(props) {
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
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-music-note"
            viewBox="0 0 16 16"
          >
            <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2z" />
            <path fill-rule="evenodd" d="M9 3v10H8V3h1z" />
            <path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5V2.82z" />
          </svg> */}
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
          {/* <form class="form-inline my-2 my-lg-0">
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
          </form> */}

          <div>
            <div>
              <button
                id="SearchBtn"
                onClick={() => {
                  props.history.push("/customer/login");
                }}
                class="btn  my-2 my-sm-0 btn-sm"
                type="submit"
                style={{ color: "white", backgroundColor: "#764A34" }}
              >
                Sign In
              </button>
              <button
                id="SearchBtn"
                onClick={() => {
                  props.history.push("/customer/registration");
                }}
                class="btn  my-2 my-sm-0 btn-sm"
                type="submit"
                style={{ color: "white", backgroundColor: "#764A34" }}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
