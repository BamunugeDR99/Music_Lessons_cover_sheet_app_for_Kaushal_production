import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrencySelect from "./CurrencySelect";
import DiscoverMoreCovers from "./DicoverMoreCovers";
import Swal from "sweetalert2";
import { storage } from "../../Configurations/firebaseConfigurations";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import $, { ajaxPrefilter } from "jquery";

export default function LessonsAndCoversDetailed(props) {
  const [covers, setCovers] = useState([]);
  let preview = [];
  let instrumentsTxt = "";
  let MainCategoryForRec = "";
  let SubCategoryForRec = "";

  useEffect(() => {
    function getCovers() {
      const CoverTempID = props.match.params.id;
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
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<p style = "color : #D0193A">Currently unavailable!',
          });
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
      document.getElementById("img" + i).src =
        "/images/verticaLImageHolder.jpg";
    }
   
      previewImages.map((previewImage, index) => {
        if(document.getElementById("img"+index) != null){
          
          const storageRef = ref(storage, `PreviewImages/${previewImage}`);
          getDownloadURL(storageRef).then((url) => {
            document.getElementById("img" + index).src = url;
          });
        }else if(document.getElementById("img"+index) == null){
          alert("gg");
        }
    
      });
    
    
   
  
  }

  function addToCart(id) {
    //alert(id);

    //let customerID = localStorage.getItem("CustomerID");
    let newItems = []; /// Change this later
    const customerID = localStorage.getItem("CustomerID");
    let coverIDs = [];
    let shoppingcartId = "";
    axios
      .get("http://localhost:8070/shoppingCart/getOneCart/" + customerID)
      .then((res) => {
        console.log(res.data.CoverIDs);
        coverIDs = res.data.CoverIDs;
        shoppingcartId = res.data._id;
        console.log(shoppingcartId);
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

              let count = parseInt($("#countHolder").text());
              $("#countHolder").html(count + 1);
           
               //completedIncrements.push("#cart1");
           
              
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
                <br />
                <h6 style={{ display: "inline", color: "#764A34" }}>
                  No of pages to preview (free):{" "}
                </h6>{" "}
                <h6 style={{ display: "inline" }}>{covers.NoOfPreviewPages}</h6>
                <br />
                <br />
                {/* add a facebook icon  */}
                <div className="text-center">
                  <a
                    class="btn rounded"
                    style={{ backgroundColor: "#3b5998" }}
                    href={covers.FacebookLink}
                    role="button"
                  >
                    <i
                      class="fab fa-facebook-f fa-3x"
                      style={{ color: "#ffffff" }}
                    ></i>
                  </a>
                  <br />
                  <p style={{ color: "#3b5998" }}> Watch it on facebook</p>
                </div>
                <br />
                <br />
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
                <br />
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
                <div class="container">
                  <div class="row">
                    <div class="col-sm">
                      {/* calling a another Component */}
                      <CurrencySelect coverPrice={covers.Price} />
                      <br />
                      <h6 style={{ color: "#D0193A" }}>
                        *The actual price will be slightly different*
                      </h6>
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

                  <button
                    type="button"
                    class="btn btn-success btn-block rounded"
                    onClick={() => addToCart(covers._id)}
                  >
                    Add to cart
                  </button>
                  <br />
                  <br />
                  <div className="container-sm">
                    {/* directly going to the payment gateway */}
                    <button
                      type="button"
                      class="btn btn-success btn-block rounded"
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#764A34",
                          cancelButtonColor: "#D0193A",
                          confirmButtonText: "Yes",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            alert("Bought");
                          }
                        });
                      }}
                    >
                      Buy it now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* discover more */}
      {/* <DiscoverMoreCovers message = "sonal"/> */}
      <br />
      <h2 style={{ textAlign: "center", color: "#764A34" }}>
        <b>Discover more!</b>
      </h2>
      <div className="container-xl">
        <h3>
          <b>Our Recommendations </b>
        </h3>
        {/* <DiscoverMoreCovers subCategory = "Exercises" mainCategory = "Guitar Technics & Lessons"/> */}
        <DiscoverMoreCovers
         CoverID = "61a247ef9508b44b96cf150e"
        />
      </div>
    </div>
  );
}