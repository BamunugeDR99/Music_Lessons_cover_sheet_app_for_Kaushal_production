import React, { useState } from "react";
import axios from "axios";
import CoverTemplate from "./covercardtemplate";
import TopDownloadTemplate from "./topdownloadtemplate";
import Modal from "react-bootstrap/Modal";
import InputRange from "react-input-range";

export default function MusicCoverPage() {

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  let [component, setName] = useState([
    <CoverTemplate />,
    <CoverTemplate />,
    <CoverTemplate />,
    <CoverTemplate />,
    <CoverTemplate />,
    <CoverTemplate />,
    <CoverTemplate />,
    <CoverTemplate />,
  ]);


  function handleValue1(v) {
    setValue1(v);
  }
  function handleValue2(v) {
    setValue2(v);
  }

  return (
    <div>
      <br />
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10 input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Search Music Covers"
          />
          <div class="input-group-append">
            <button className="input-group-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="col-md-1"></div>
      </div>
      <br />
      <div class="container">
        <div className="row ">
          {/* left side of the page */}
          <div className="col-md-4">
            <div className="container">
              <ul class="list-group">
                <li class="list-group-item">Cras justo odio</li>
                <li class="list-group-item">Dapibus ac facilisis in</li>
                <li class="list-group-item">Morbi leo risus</li>
                <li class="list-group-item">Porta ac consectetur ac</li>
                <li class="list-group-item">Vestibulum at eros</li>
              </ul>

              <br />
              <div className="row">
                <div className="col-md-6">
                  <label>Price Range</label>
                  <div class="slidecontainer">
                    <input
                      id="typeinp"
                      type="range"
                      min="0"
                      max="5"
                      value={value1}
                      onChange={(e) => handleValue1(e.target.value)}
                      step="1"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label>Downloads</label>
                  <div class="slidecontainer">
                    <input
                      id="typeinp"
                      type="range"
                      min="0"
                      max="5"
                      value={value2}
                      onChange={(e) => handleValue2(e.target.value)}
                      step="1"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <h4 style={{ color: "#764A34" }}>
                  <strong>
                    <center>Most Downloaded Classical Guitar Cover</center>
                  </strong>
                </h4>

                <TopDownloadTemplate />
              </div>
            </div>
          </div>
          {/* right side of the page */}
          <div className="col-md-8">
            <h4 style={{ color: "#764A34" }}>
              <strong>Classical Guitar Covers</strong>
            </h4>
            <div className="row">
              {component.map((post) => (
                <div className="col-md-3" onClick={() => modalopen()}>
                  {post}
                  <br />
                </div>
              ))}
              <br />
              <br />
            </div>
          </div>
          {console.log(component)}
        </div>
      </div>
     
    </div>
  );
}
