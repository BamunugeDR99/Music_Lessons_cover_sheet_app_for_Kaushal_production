import React, { useState } from "react";
import axios from "axios";

export default function LessonsAndCoversDetailed(props) {
  return (
    <div>
      <br />
      <div class="card" style={{ border: "solid #764A34" }}>
        <div class="card-body">
          <div class="container">
            <div class="row">
              <div class="col-sm">
                <div
                  id="carouselExampleIndicators"
                  class="carousel slide"
                  data-ride="carousel"
                >
                  <ol class="carousel-indicators">
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="0"
                      class="active"
                    ></li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="1"
                    ></li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="2"
                    ></li>
                  </ol>
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img
                        class="d-block w-100"
                        src={"/images/923d10247b982186a4ebb24b7ba6fba8.jpg"}
                        alt="First slide"
                      />
                    </div>
                    <div class="carousel-item">
                      <img
                        class="d-block w-100"
                        src={"/images/923d10247b982186a4ebb24b7ba6fba8.jpg"}
                        alt="Second slide"
                      />
                    </div>
                    <div class="carousel-item">
                      <img
                        class="d-block w-100"
                        src={"/images/923d10247b982186a4ebb24b7ba6fba8.jpg"}
                        alt="Third slide"
                      />
                    </div>
                  </div>
                  <a
                    class="carousel-control-prev"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="prev"
                  >
                    <span style={{ color: "#000000" }} aria-hidden="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="60"
                        fill="#000000"
                        class="bi bi-caret-left-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                      </svg>
                    </span>
                    <span class="sr-only" style={{ color: "#000000" }}>
                      Previous
                    </span>
                  </a>
                  <a
                    class="carousel-control-next"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="next"
                  >
                    <span aria-hidden="true" style={{ color: "#000000" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="60"
                        fill="#000000"
                        class="bi bi-caret-right-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                      </svg>
                    </span>
                    <span class="sr-only" style={{ color: "#000000" }}>
                      Next
                    </span>
                  </a>
                </div>
                <br />
                <h6 style={{ display: "inline", color: "#764A34" }}>
                  No of pages to preview (free):{" "}
                </h6>{" "}
                <h6 style={{ display: "inline" }}>3</h6>
                <br />
                <br />
                <div class="embed-responsive embed-responsive-16by9">
                  <iframe
                    class="embed-responsive-item"
                    src="https://www.youtube.com/embed/CM4CkVFmTds"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <br />
              </div>
              <div class="col-sm">
                <h3 style={{ color: "#764A34", letterSpacing: "10px" }}>
                  We Wish You a Merry Christmas
                </h3>
                <br />
                <h4 style={{ color: "#764A34", float: "right" }}>
                  Santa Claus
                </h4>
                <br />
                <br />
                <h5
                  style={{
                    display: "inline",
                    color: "#764A34",
                    letterSpacing: "5px",
                  }}
                >
                  Arrange by :{" "}
                </h5>{" "}
                <h5 style={{ display: "inline", letterSpacing: "5px" }}>
                  Niki Minaj
                </h5>
                <br />
                <br />
                <h5
                  style={{
                    display: "inline",
                    color: "#764A34",
                    letterSpacing: "5px",
                  }}
                >
                  Instruments played on :{" "}
                </h5>{" "}
                <h5 style={{ display: "inline", letterSpacing: "5px" }}>
                  Guitar
                </h5>
                <br />
                <br />
                <h5
                  style={{
                    display: "inline",
                    color: "#764A34",
                    letterSpacing: "5px",
                  }}
                >
                  Main Category :{" "}
                </h5>{" "}
                <h5 style={{ display: "inline", letterSpacing: "5px" }}>
                  Classical Guitar
                </h5>
                <br />
                <br />
                <h5
                  style={{
                    display: "inline",
                    color: "#764A34",
                    letterSpacing: "5px",
                  }}
                >
                  Sub-category :{" "}
                </h5>{" "}
                <h5 style={{ display: "inline", letterSpacing: "5px" }}>
                  English
                </h5>
                <br />
                <br />
                <h5
                  style={{
                    display: "inline",
                    color: "#764A34",
                    letterSpacing: "5px",
                  }}
                >
                  No of pages :{" "}
                </h5>{" "}
                <h5 style={{ display: "inline", letterSpacing: "5px" }}>5</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
