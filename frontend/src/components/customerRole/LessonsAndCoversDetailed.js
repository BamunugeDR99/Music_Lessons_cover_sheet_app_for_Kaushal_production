import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrencySelect from "./CurrencySelect";
import DiscoverMoreCovers from "./DicoverMoreCovers";

export default function LessonsAndCoversDetailed(props) {
  const [covers, setCovers] = useState([]);
  let preview = [];
  let instrumentsTxt = "";
  useEffect(() => {
    function getCovers() {
      //const CoverID = props.match.params.id;
      const CoverTempID = "61936caa6027859b76b2ddbc";
      axios
        .get("http://localhost:8070/covers/get/" + CoverTempID)
        .then((res) => {
          setCovers(res.data);
          preview = res.data.PreviewPages;
          printInstruments(res.data.InstrumentsPlayedOn);
          displayPreviewImageSlider(res.data.PreviewPages)
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
      if(i == 0){
        let a ='src={"/images/test2.jpg"}';
        imageSlider += '<div class="carousel-item active"><img id = "img1" class="d-block w-100" alt="slide"/></div>';

        // imageSlider += '<div class="carousel-item active"><img id = "'+"img" +i +'class="d-block w-100" alt="slide"/></div>';
      }else{
        //imageSlider += '<div class="carousel-item"><img  id = "'+"img" +i + 'class="d-block w-100" alt="slide"/></div>'; 
      }
    }
    imageSlider += '</div>';
    document.getElementById("img").innerHTML = imageSlider;
    for(let i = 0; i < 1;i++){
      // src={"/images/test2.jpg"}
      //  let ImagePath = '{"/images/'+ previewImages[i]+ '"}';
      let ImagePath = "/images/test2.jpg";
      document.getElementById("img"+(i+1)).src = ImagePath;
    }
    
  

   

  }
  return (
    <div>
      <br />
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
                  <div id = "img"></div>
                  {/* loop images 
                  {() => {
                    return (
                      <div class="carousel-inner">
                        <div class="carousel-item active">
                          <img
                            class="d-block w-100"
                            src={"/images/test2.jpg"}
                            alt="slide"
                          />
                        </div>
                        {/* {preview.map((coverPreview, index) => {
                          return (
                            <div class="carousel-item">
                              <img
                                class="d-block w-100"
                                src={"/images/test2.jpg"}
                                alt="slide"
                              />
                            </div>
                          );
                        })} */}
                      {/* </div>
                    ); */}
                  

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
                {/* add a facebook icon  */}
                <h6 style={{ display: "inline", color: "#764A34" }}>
                  <a href={covers.FacebookLink}>Facebook Link</a>
                </h6>
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
                  >
                    Add to cart
                  </button>
                  <br />
                  <br />
                  <div className="container-sm">
                    <button
                      type="button"
                      class="btn btn-success btn-block rounded"
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
      <DiscoverMoreCovers />
    </div>
  );
}
