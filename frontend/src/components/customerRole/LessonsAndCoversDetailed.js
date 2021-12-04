import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrencySelect from "./CurrencySelect";
import DiscoverMoreCovers from "./DicoverMoreCovers";
import Swal from "sweetalert2";
import { storage } from "../../Configurations/firebaseConfigurations";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import $, { ajaxPrefilter } from "jquery";
import { async } from "@firebase/util";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function LessonsAndCoversDetailed(props) {
  const [covers, setCovers] = useState([]);
  const [TempYoutubeLink, setTempYoutubeLink] = useState("");
  let preview = [];
  let instrumentsTxt = "";
  let MainCategoryForRec = "";
  let SubCategoryForRec = "";
  const [recommenedCovers, setRecommendedCovers] = useState([]);
  const [ErrorhandlingTxt, setErrorhandlingTxt] = useState("");
  let finalFilteredCovers = [];
  const [discoverMoreLoadingStatus, setDiscoverMoreStatus] = useState(false);
  const [imageSlider, setImageSlider] = useState(false);
  const [addToCartStatus,setAddToCartStatus] = useState(true);
  useEffect(() => {
    async function getCovers() {
      const CoverTempID = props.match.params.id;
      await axios
        .get(
          "https://kaushal-rashmika-music.herokuapp.com/covers/get/" +
            CoverTempID
        )
        .then((res) => {
          setCovers(res.data);
          preview = res.data.PreviewPages;
          printInstruments(res.data.InstrumentsPlayedOn);
          displayPreviewImageSlider(res.data.PreviewPages);
          MainCategoryForRec = res.data.MainCategory;
          SubCategoryForRec = res.data.SubCategory;
          setTempYoutubeLink(res.data.YoutubeLink);
          getRecommendCovers(
            res.data.MainCategory,
            res.data.SubCategory,
            res.data._id
          );
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

  async function getRecommendCovers(MainCategory, SubCategory, ID) {
    // console.log(MainCategory, SubCategory);
    await axios
      .get("https://kaushal-rashmika-music.herokuapp.com/covers/getCovers")
      .then((res) => {
        let availableCovers = res.data.filter(
          (recCovers) => String(recCovers.Status) != "3"
        );

        availableCovers = availableCovers.filter(
          (recCovers) => String(recCovers.Status) != "2"
        );

        //  availableCovers = availableCovers.filter((recCovers) => recCovers._id != covers._id);

        finalFilteredCovers = availableCovers.filter(
          (covers) =>
            covers.MainCategory === MainCategory &&
            covers.SubCategory === SubCategory &&
            covers._id != ID
        );

        if (finalFilteredCovers.length === 0) {
          setErrorhandlingTxt("No more Reccomendations found!");
        } else {
          setErrorhandlingTxt("");
        }
        setRecommendedCovers(finalFilteredCovers);
        setDiscoverMoreStatus(true);
      })
      .catch((err) => {
        alert(err);
      });
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

    setImageSlider(true);

    previewImages.map((previewImage, index) => {
      const storageRef = ref(storage, `PreviewImages/${previewImage}`);
      getDownloadURL(storageRef).then((url) => {
        try {
          document.getElementById("img" + index).src = url;
        } catch (error) {}
      });
    });
  }

  function addToCart(id) {
    //alert(id);
    setAddToCartStatus(false);
    //let customerID = localStorage.getItem("CustomerID");
    let newItems = []; /// Change this later
    const customerID = localStorage.getItem("CustomerID");
    let coverIDs = [];
    let shoppingcartId = "";
    axios
      .get(
        "https://kaushal-rashmika-music.herokuapp.com/shoppingCart/getOneCart/" +
          customerID
      )
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
        //console.log(coverIDs);
        const newcoverList = {
          CustomerID: customerID,
          CoverIDs: coverIDs,
        };
       // console.log(newcoverList);
        if (falgs === 0) {
          axios
            .put(
              "https://kaushal-rashmika-music.herokuapp.com/shoppingCart/updateSItem/" +
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

              setAddToCartStatus(true)

              //completedIncrements.push("#cart1");
            })
            .catch((err) => {
              console.log(err);
              setAddToCartStatus(true);
            });
        } else if (falgs === 1) {
          Swal.fire("Cover Already in Your shopping cart.");
          setAddToCartStatus(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setAddToCartStatus(true);
      });
  }

  async function displayImages(coverImageName, index) {
    if (recommenedCovers.length != 0) {
      const storageRef = ref(storage, `PreviewImages/${coverImageName}`);
      await getDownloadURL(storageRef)
        .then((url) => {
          document.getElementById(index).src = url;
          document.getElementById("temp" + index).hidden = true;
          document.getElementById(index).hidden = false;
        })
        .catch((err) => {
          setErrorhandlingTxt(
            "Reccomended covers are not available right now!"
          );
          //document.getElementById(index).src = "/images/imageplaceholder.png";
        });
    }
  }

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <div class="card container-xxl" style={{ border: "solid #764A34" }}>
        <div class="card-body">
          <div class="container">
            <div class="row">
              <div class="col-sm">
                {/* image carousel */}
                <div className="d-flex justify-content-center">
                  <div class="spinner-grow" role="status" hidden={imageSlider}>
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
                <div
                  hidden={!imageSlider}
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
                {TempYoutubeLink.toLowerCase().includes(
                  "https://www.youtube.com/embed/"
                ) == true ? (
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
                ) : (
                  <div class="embed-responsive embed-responsive-16by9">
                    <iframe
                      class="embed-responsive-item"
                      // need to use embeded youtube link
                      src="https://www.youtube.com/embed/"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
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
                  <br/>
                  <br/>
                  <div className = "d-flex justify-content-center">
                    <div class="spinner-border text-success" role="status" hidden = {addToCartStatus}>
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
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
        {/* <DiscoverMoreCovers subCategory = {covers.SubCategory} mainCategory = {covers.MainCategory}/> */}
        {/* <DiscoverMoreCovers CoverID="61a247ef9508b44b96cf150e" /> */}

        <div>
          <div className="d-flex justify-content-center">
            <div
              class="spinner-border "
              role="status"
              hidden={discoverMoreLoadingStatus}
            >
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <h5 style={{ textAlign: "center", color: "#D0193A" }}>
            {ErrorhandlingTxt}
          </h5>
          <br />
          <Carousel responsive={responsive}>
            {recommenedCovers.map((covers, index) => {
              return (
                <div
                  class="card"
                  onClick={() => {
                    props.history.push(
                      "/customer/discovermorecover/" + covers._id
                    );
                    window.location.reload();
                  }}
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
                    borderRadius: "15px",
                    marginRight: "15px",
                    marginLeft: "15px",
                  }}
                >
                  <img
                    id={"temp" + index}
                    src={"/images/imageplaceholder.png"}
                    class="card-img-top"
                    alt="..."
                    style={{
                      borderRadius: "15px 15px 0px 0px",
                      height: "350px",
                    }}
                  />
                  <img
                    hidden
                    id={index}
                    src={displayImages(covers.PreviewPages[0], index)}
                    class="card-img-top"
                    alt="..."
                    style={{
                      borderRadius: "15px 15px 0px 0px",
                      height: "350px",
                    }}
                  />
                  <div class="card-body">
                    <h4 class="card-title" style={{ fontWeight: "bold" }}>
                      {covers.Title}
                    </h4>
                    <h5>{covers.OriginalArtistName}</h5>
                    <h5>{covers.MainCategory}</h5>
                    <h5>{covers.SubCategory}</h5>
                    <h3 style={{ float: "right", color: "#764A34" }}>
                      <b>US$ {covers.Price}</b>
                    </h3>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
