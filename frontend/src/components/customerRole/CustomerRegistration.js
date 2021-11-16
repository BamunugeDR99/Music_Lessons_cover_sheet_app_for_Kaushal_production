import React, { useState } from "react";
import axios from "axios";

export default function CustomerRegistration(props) {
  return (
    <div className="container-sm">
      <br />
      <br />
      <div class="card" style={{ border: "solid #764A34" }}>
        <div class="card-body">
          <div class="text-center">
            <img
              src={"/images/Kaushal_temp_logo.png"}
              class="rounded img-responsive"
              alt="Production_logo"
              style={{ width: "150px" }}
            />
          </div>
          <br />
          <form>
            <div class="text-center">
              <h2 style={{ color: "#764A34" }}>REGISTER HERE</h2>
            </div>
            <br />
            {/* <div class="text-center">
                <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-person-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg></span>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div> */}
            <center>
            <div class="text-center">
            <div class = "container-fluid">
              <div class="form-group row">
                <span>
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
                <div class="col-sm">
                  <input
                    type="password"
                    class="form-control"
                    id="inputPassword"
                    placeholder="Password"
                  />
                </div>
              </div>

            </div></div></center>
      
          </form>
        </div>
      </div>
    </div>
  );
}
