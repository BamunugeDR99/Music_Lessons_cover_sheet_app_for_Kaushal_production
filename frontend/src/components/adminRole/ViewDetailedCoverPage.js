import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrencySelect from "./CurrencySelect";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import { useLocation } from "react-router-dom";

export default function ViewDetailedCoverPage(props) {
  const [covers, setCovers] = useState([]);
  const [modalOpen3,setModalOpen3] = useState([]);
  let preview = [];
  let instrumentsTxt = "";
  let MainCategoryForRec = "";
  let SubCategoryForRec = "";
  let location = useLocation();

  useEffect(() => {
    function getCovers() {
      const CoverTempID = location.pathname.substring(10);
      // const CoverTempID = "";
      axios
        .get("http://localhost:8070/covers/get/" + CoverTempID)
        .then((res) => {
          setCovers(res.data);
          preview = res.data.PreviewPages;
          printInstruments(res.data.InstrumentsPlayedOn);
          displayPreviewImageSlider(res.data.PreviewPages);
          MainCategoryForRec = res.data.MainCategory;
          SubCategoryForRec = res.data.SubCategory;
        })
        .catch((err) => {
          alert(err);
        });
    }

    getCovers();
  }, []);

  function printInstruments(instruments) {
    for (let i = 0; i < instruments.length; i++) {
      if (instruments.length == i + 1) {
        instrumentsTxt += instruments[i];
      } else {
        instrumentsTxt += instruments[i] + ", ";
      }
    }
    document.getElementById("instruments").innerHTML = instrumentsTxt;
  }

  function displayPreviewImageSlider(previewImages) {
    let imageSlider = '<div class="carousel-inner">';
    for (let i = 0; i < previewImages.length; i++) {
      if (i == 0) {
        imageSlider +=
          '<div class="carousel-item active"><img id = "' +
          "img" +
          i +
          '" class="d-block w-100" alt="slide"/></div>';
      } else {
        imageSlider +=
          '<div class="carousel-item"><img  id = "' +
          "img" +
          i +
          '" class="d-block w-100" alt="slide"/></div>';
      }
    }
    imageSlider += "</div>";
    document.getElementById("img").innerHTML = imageSlider;
    for (let i = 0; i < previewImages.length; i++) {
      let ImagePath = "/images/" + previewImages[i];
      document.getElementById("img" + i).src = ImagePath;
    }
  }

  function addToCart(id) {
    //alert(id);

    //let customerID = localStorage.getItem("CustomerID");
    let newItems = []; /// Change this later
    const customerID = "6199d490bfd483038f7067bf";
    let coverIDs = [];
    let shoppingcartId = "";
    axios
      .get("http://localhost:8070/shoppingCart/getOneCart/" + customerID)
      .then((res) => {
        console.log(res.data.CoverIDs);
        coverIDs = res.data.CoverIDs;
        shoppingcartId = res.data._id;
        let falgs = 0;
        for (let i = 0; i < coverIDs.length; i++) {
          if (coverIDs[i] === id) {
            falgs = 1;
          }
        }
        coverIDs.push(id);
        console.log(coverIDs);
        const newcoverList = {
          CustomerID: customerID,
          CoverIDs: coverIDs,
        };
        console.log(newcoverList);
        if (falgs === 0) {
          axios
            .put(
              "http://localhost:8070/shoppingCart/updateSItem/" +
                shoppingcartId,
              newcoverList
            )
            .then(() => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Cover has been added to your shopping cart!",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((err) => {
              alert(err);
            });
        } else if (falgs === 1) {
          Swal.fire("Cover Already in Your shopping cart.");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div>
      <div class="card container-xxl" style={{ border: "solid #764A34" }}>
        <div class="card-body">
          <div class="container">
            <div class="row">
              <div class="col-sm">
                {/* image carousel */}
                <div
                  id="carouselExampleIndicators"
                  class="carousel slide"
                  data-ride="carousel"
                >
                  <div id="img"></div>
                  {/* controls  */}
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
              </div>
              <div class="col-sm">
                {/* main title */}
                <h3 style={{ color: "#764A34", letterSpacing: "10px" }}>
                  {covers.Title}
                </h3>
                <br />
                {/* original artis name  */}
                <h4 style={{ color: "#764A34", float: "right" }}>
                  {covers.OriginalArtistName}
                </h4>
                <br />
                <br />
                <h5
                  style={{
                    display: "inline",
                    color: "#764A34",
                    letterSpacing: "2px",
                  }}
                >
                  {/* arrange by  */}
                  Arrange by :{" "}
                </h5>{" "}
                <h5 style={{ display: "inline", letterSpacing: "2px" }}>
                  {covers.ArrangedBy}
                </h5>
                <br />
                <br />
                <h5
                  style={{
                    display: "inline",
                    color: "#764A34",
                    letterSpacing: "2px",
                  }}
                >
                  {/* instruments played on array  */}
                  Instruments played on :{" "}
                </h5>{" "}
                <h5
                  id="instruments"
                  style={{ display: "inline", letterSpacing: "2px" }}
                ></h5>
                <br />
                <br />
                <h5
                  style={{
                    display: "inline",
                    color: "#764A34",
                    letterSpacing: "2px",
                  }}
                >
                  {/* main category */}
                  Main Category :{" "}
                </h5>{" "}
                <h5 style={{ display: "inline", letterSpacing: "2px" }}>
                  {covers.MainCategory}
                </h5>
                <br />
                <br />
                <h5
                  style={{
                    display: "inline",
                    color: "#764A34",
                    letterSpacing: "2px",
                  }}
                >
                  {/* subcategory  */}
                  Sub-category :{" "}
                </h5>{" "}
                <h5 style={{ display: "inline", letterSpacing: "2px" }}>
                  {covers.SubCategory}
                </h5>
                <br />
                <br />
                <h5
                  style={{
                    display: "inline",
                    color: "#764A34",
                    letterSpacing: "2px",
                  }}
                >
                  {/* no of pages  */}
                  No of pages :{" "}
                </h5>{" "}
                <h5 style={{ display: "inline", letterSpacing: "2px" }}>
                  {covers.NoOfPages}
                </h5>
                <br />
                <br />
                <h5
                  style={{
                    display: "inline",
                    color: "#764A34",
                    letterSpacing: "2px",
                  }}
                >
                  No of pages to preview (free):{" "}
                </h5>{" "}
                <h5 style={{ display: "inline" }}>{covers.NoOfPreviewPages}</h5>
                <br />
                <br />
                <div class="container">
                  <div class="row">
                    <div class="col-sm">
                      {/* calling a another Component */}
                      <CurrencySelect coverPrice={covers.Price} />
                      <br />
                      <h3 id="changedValue" style={{ color: "#764A34" }}></h3>
                      {/* spinner  */}
                      <div
                        class="spinner-border text-dark"
                        id="loadingBar"
                        hidden
                        role="status"
                      >
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>
                    <div class="col-sm">
                      {/* price  */}
                      <h1
                        style={{
                          display: "inline",
                          letterSpacing: "2px",
                          color: "#764A34",
                        }}
                      >
                        $
                      </h1>
                      <h1
                        style={{
                          display: "inline",
                          letterSpacing: "2px",
                          color: "#764A34",
                        }}
                      >
                        {covers.Price}
                      </h1>
                    </div>
                  </div>
                  <br />
                  <div className="text-center">
                    <button
                      type="button"
                      class="btn btn-success rounded"
                      onClick={() => addToCart(covers._id)}
                    >
                      Edit Cover
                    </button>
                    <br />
                    <div className="container-sm">
                      <button
                        type="button"
                        style={{ color: "#ffffff", backgroundColor: "#D0193A" }}
                        class="btn rounded"
                      >
                        View Pdf
                      </button>
                      <br />
                    </div>
                    {/* <!-- Youtube --> */}
                    <button
                      class="btn"
                      onClick = {()=> {
                          setModalOpen3(true);
                      }}
                      style={{ backgroundColor: "#ed302f" }}
                      //href="#!"
                      role="button"
                    >
                      <i class="fab fa-youtube fa-3x"></i>
                    </button>
                    {/* <!-- Facebook --> */}
                    <a
                      class="btn"
                      style={{ backgroundColor: "#3b5998" }}
                      href={covers.FacebookLink}
                      role="button"
                    >
                      <i
                        class="fab fa-facebook-f fa-3x"
                        style={{ color: "#ffffff" }}
                      ></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />

      <Modal show={modalOpen3} size="lg">
          <Modal.Header>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setModalOpen3(false);
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </Modal.Header>

          <Modal.Body>
            <div className="container">
                {/* youtube video  */}
                <div class="embed-responsive embed-responsive-16by9">
                  <iframe
                    class="embed-responsive-item"
                    // need to use embeded youtube link
                    src={covers.YoutubeLink}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
            </div>
          </Modal.Body>
      </Modal>
    </div>
  );
}
