import React, { useState, useEffect } from "react";
import "./../../css/adminsidebar.css";
import "./../../js/adminsidebar.js";
import DashBoard from "./dashboard.js";
import Cover from "./../customerRole/musiccoverpage";

export default function AdminHeader2() {
  function w3_close() {
    document.getElementById("sidebar").style.display = "none";
  }

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <img
            className="rounded-circle"
            src="images/images.jpeg"
            width="40"
            height="40"
            alt=""
          />
        </a>
        <span
          class="navbar-brand mb-0 h1"
          style={{ fontWeight: "initial", fontFamily: "Old Standard TT" }}
        >
          Rashmika Productions
        </span>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
              <a
                class="nav-link "
                style={{
                  color: "#764A34",
                  fontWeight: "bolder",
                  fontFamily: "Abel",
                }}
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Classical Guitar Covers
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">
                  Action
                </a>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>

            <li class="nav-item dropdown">
              <a
                class="nav-link "
                style={{
                  color: "#764A34",
                  fontWeight: "bolder",
                  fontFamily: "Abel",
                }}
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Guitar Techniques & Lessons
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">
                  Action
                </a>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
          </ul>
        </div>
        <form class="form-inline">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <span>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </span>
          <div class="btn-group">
            <button
              class="btn btn-outline-none shadow-none my-2 my-sm-0"
              type="submit"
              disabled
            >
              <i class="fas fa-user"></i>
            </button>
            <button
              class="btn btn-outline-none shadow-none my-2 my-sm-0"
              type="submit"
              disabled
            >
              <i class="fas fa-user"></i>
            </button>
          </div>
        </form>
      </nav>
    </div>
  );
}
