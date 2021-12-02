import React, { useState, useEffect } from "react";
// import "./../../css/adminsidebar.css";
// import "./../../js/adminsidebar.js";
// import DashBoard from "./dashboard.js";
import Cover from "./../customerRole/musiccoverpage";

export default function AdminHeader() {
  const [num, setNum] = useState("0");
  const [num2, setNum2] = useState("0");

  function open(n) {
    // alert(n);
    document.getElementById("sidebar").classList.toggle("active");
    if (document.getElementById("sidebar").style.display == "none") {
      alert("asd");
    }
    if (n == 0) {
      document.getElementById("content2").style.display = "none";
      setNum(1);
    } else if (n == 1) {
      document.getElementById("content2").style.display = "block";
      setNum(0);
    }
  }

  function w3_close() {
    document.getElementById("sidebar").style.display = "none";
  }

  return (
    <div>
      <div>
        <nav
          className="topnav navbar navbar-expand shadow navbar-light bg-white"
          id="sidenavAccordion"
        >
          {/* <input type="text" id="hiddenvalue" className=" d-sm-none" /> */}
          <a className="navbar-brand d-none d-sm-block" href="#">
            <img
              src="images/mike.jpeg"
              style={{ borderRadius: "50%", width: "50px", height: "50px" }}
            />{" "}
            Kaushal Productions
          </a>
          <button
            id="sidebarCollapse"
            onClick={() => open(num)}
            className="btn btn-outline-primary btn-sm d-lg-none  d-sm-none"
          >
            <i className="fas fa-align-left"></i>
            <span>Toogle Button</span>
          </button>
          {/* <ul className="navbar-nav align-items-center ml-auto">
            <li className="nav-item dropdown no-caret mr-3 dropdown-user">
              <a
                className="btn btn-icon btn-transparent-dark dropdown-toggle"
                id="navbarDropdownUserImage"
                href="javascript:void(0);"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="far fa-user"></i>
              </a>

              <div
                className="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up"
                aria-labelledby="navbarDropdownUserImage"
              >
                <h6 className="dropdown-header d-flex align-items-center">
                  <img className="dropdown-user-img" src="images/user.jpg" />
                  <div className="dropdown-user-details">
                    <div className="dropdown-user-details-name">
                      Super Administrator
                    </div>
                    <div className="dropdown-user-details-email">
                      Super Administrator
                    </div>
                  </div>
                </h6>
                <div className="dropdown-divider"></div>

                <a className="dropdown-item" href="process/logoutprocess.php">
                  <div className="dropdown-item-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-log-out"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                  </div>
                  Logout
                </a>
              </div>
            </li>
          </ul> */}
        </nav>
      </div>
      <div className="sidenav-menu wrapper" style={{ marginTop: "-40px" }}>
        {/* <!-- Sidebar  --> */}
        <nav id="sidebar">
          <div className="sidebar-header d-lg-none">
            <a className="navbar-brand  d-sm-block text-center" href="#">
              <img
                src="images/mike.jpeg"
                style={{ borderRadius: "50%", width: "80px", height: "80px" }}
              />
              <br />
              Kaushal Productions
            </a>
          </div>

          <ul className="list-unstyled components">
            <li>
              <a href="#">DashBoard</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a
                href="#pageSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle"
              >
                Pages
              </a>
              <ul className="collapse list-unstyled" id="pageSubmenu">
                <li>
                  <a href="#">Page 1</a>
                </li>
                <li>
                  <a href="#">Page 2</a>
                </li>
                <li>
                  <a href="#">Page 3</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Portfolio</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>

        {/* <!-- Page Content  --> */}

        <div id="content">
          <div id="content2">
            <DashBoard />
          </div>
        </div>
      </div>
    </div>
  );
}

// {
/* <div>
<button onClick={w3_close} className="w3-bar-item w3-large">
  Close &times;
</button>
</div>
<div class="w3-teal">
<button class="w3-button w3-teal w3-xlarge" onClick={open}>
  ☰
</button>
<div class="w3-container">
  <h1>My Page</h1>
</div>
</div>
<div class="wrapper d-flex">
<div class="sidebar" id="mySidebar" style={{ display: "none" }}>
  {" "}
  <small class="text-muted pl-3">WIDR PAY</small>
  <ul>
    <li>
      <a href="#">
        <i class="fas fa-home"></i>Dashboard
      </a>
    </li>
    <li>
      <a href="#">
        <i class="far fa-credit-card"></i>Payment Page{" "}
        <img src="https://img.icons8.com/material-outlined/24/000000/new.png" />
      </a>
    </li>
    <li>
      <a href="#">
        <i class="fas fa-file-invoice"></i>Invoices{" "}
        <img src="https://img.icons8.com/material-outlined/24/000000/2.png" />
      </a>
    </li>
  </ul>{" "}
  <small class="text-muted px-3">PRODUCTIVITY TOOLS</small>
  <ul>
    <li>
      <a href="#">
        <i class="far fa-calendar-alt"></i>Online Scheduler
      </a>
    </li>
    <li>
      <a href="#">
        <i class="fas fa-video"></i>Video Meeting
      </a>
    </li>
    <li>
      <a href="#">
        <i class="fas fa-id-badge"></i>Public Profile
      </a>
    </li>
  </ul>{" "}
  <small class="text-muted px-3">GROW YOUR CLIENT BASE</small>
  <ul>
    <li>
      <a href="#">
        <i class="fas fa-external-link-alt"></i>Share
      </a>
    </li>
    <li>
      <a href="#">
        <i class="fas fa-code"></i>Add to Website
      </a>
    </li>
  </ul>
</div>
</div> */
// }

// function w3_close() {
//     document.getElementById("sidebar").style.display = "none";
//   }
