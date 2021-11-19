import React, { useState } from "react";
import axios from "axios";
import "../../css/CustomerHeaderStyles.css";
export default function CustomerHeader(props) {
  return (
    <div>
      <br />
      <br />
      <nav
        class="navbar fixed-top navbar-expand-lg navbar-light"
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
          <svg
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
          </svg>
          <span> </span>
          <font style={{ fontFamily: "Old Standard TT", fontSize: "20px" }}>
            Rashmika Productions
          </font>
        </a>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#" id="classicalHeader">
                <font>Classical Guitar Covers </font>
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="#"
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
              </a>
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
            <span className="userProfileSpan">
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
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="#764A34"
              class="bi bi-bag-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
            </svg>
          </div>
        </div>
      </nav>
    </div>
  );
}
