import React, { useState, useEffect } from "react";
import axios from "axios";
import CoverTemplate from "./covercardtemplate";
import TopDownloadTemplate from "./topdownloadtemplate";
import Modal from "react-bootstrap/Modal";
import InputRange from "react-input-range";
import { data, post } from "jquery";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { storage } from "../../Configurations/firebaseConfigurations";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";


export default function MusicCoverPage(props) {
  const [modelOpen, setmodelOpen] = useState(false);
  const [pricerange, setPriceRange] = useState("0");
  const [downloadrange, setDownloadRange] = useState("0");
  const [nodata, setNoData] = useState("");
  const [covers, setCovers] = useState([]);
  const [populernodata, setPopulernodata] = useState("");
  const [filtercover, setfilterCover] = useState([]);
  const [categorycover, setCategoryCover] = useState([]);
  // const [filtercovers, setFilterCovers] = useState([]);
  const [categorytext, setCategoryText] = useState("All");
  const [serchvalue, setSerchvalue] = useState("");
  const [categories, setCategories] = useState([]);
  const [populercover, setpopulercover] = useState([]);
  const [populerimage, setpopulerimage] = useState();

  let [spinner, setspinner] = useState(true);
  let [spinner2, setspinner2] = useState(true);
  let [main, setmain] = useState(true);
  let [coverdiv, setCoverdiv] = useState(true);
  let [topcoverdiv, setTopCoverDiv] = useState(true);
  let [link, setLink] = useState(true);
  let [link1, setLink1] = useState(true);
  let [bufferLink, setBufferLink] = useState(true);

  let dataholdedr = [];
  let populercoverholder = [];

  let pcover = {};
  let max = 0;

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

  useEffect(async () => {
    // document.getElementById("bufferlink").style.display = "block";
    // document.getElementById("link").style.display = "none";
    // document.getElementById("link1").style.display = "none";

    // document.getElementById("coverdiv").style.display = "none";
    // document.getElementById("topcover").style.display = "none";
    // document.getElementById("spinnerdiv2").style.display = "block";
    // document.getElementById("spinnerdiv").style.display = "block";

    setBufferLink(false);
    setLink(true);
    setLink1(true);

    setCoverdiv(true);
    setTopCoverDiv(true);
    setspinner2(false);
    setspinner(false);

    await axios
      .get(
        "https://kaushal-rashmika-music.herokuapp.com/covers/getcoverbymaincover"
      )
      .then((res) => {
        if (res.data.length > 0) {
          setNoData("");
          dataholdedr = res.data;
          populercoverholder = res.data;
          setCovers(res.data);
          setfilterCover(res.data);
          setCategoryCover(res.data);
          setCovers(res.data);
          // document.getElementById("spinnerdiv").style.display = "none";
          // document.getElementById("coverdiv").style.display = "block";

          setspinner(true);
          setCoverdiv(false);
        } else {
          setNoData("No Covers available");
          setPopulernodata("No populer covers available");
          setCovers([]);
          // document.getElementById("spinnerdiv").style.display = "none";
          // document.getElementById("spinnerdiv2").style.display = "none";
          // document.getElementById("coverdiv").style.display = "block";

          setspinner(true);
          setspinner2(true);
          setCoverdiv(false);
        }

        // console.log(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });

    // Getting sub categories
    axios
      .get("https://kaushal-rashmika-music.herokuapp.com/mainCategory/get")
      .then((res) => {
        setCategories(res.data[0].SubCategories);
        // document.getElementById("bufferlink").style.display = "none";
        // document.getElementById("link").style.display = "block";
        // document.getElementById("link1").style.display = "block";
        // console.log(res.data[0].SubCategories);

        setBufferLink(true);
        setLink(false);
        setLink1(false);
      })
      .catch((err) => {
        alert(err.message);
      });
    populercovers();
  }, []);

  async function populercovers() {
    if (populercoverholder.length > 0) {
      for (let i = 0; i < populercoverholder.length; i++) {
        if (Number(populercoverholder[i].NoOfDownloads) >= max) {
          max = populercoverholder[i].NoOfDownloads;
          console.log(max);
          pcover = populercoverholder[i];
        }
      }
      // console.log(pcover.PreviewPages[0]);
      setpopulercover(pcover);
      setpopulerimage(pcover.PreviewPages[0]);

      console.log(pcover);
      // document.getElementById("spinnerdiv2").style.display = "none";
      // document.getElementById("topcover").style.display = "block";

      setspinner2(true);
      setTopCoverDiv(false);
    }
  }
  function modalopen() {
    // alert("This is alert");
    setmodelOpen(true);
  }
  function modalClose() {
    setmodelOpen(false);
  }
  function sortByPrice(v) {
    setPriceRange(v);
    // let dataholder = covers
    let filtercovers = categorycover;
    let result = filtercovers.filter((post) => Number(post.Price) >= v);

    if (result.length != 0) {
      setCovers(result);
      setNoData("");
    } else {
      setNoData("No Covers available");
      setCovers([]);
    }

    setDownloadRange(0);
  }

  function sortByDownloads(v) {
    setPriceRange(0);

    setDownloadRange(v);
    let filtercovers = categorycover;
    let result = filtercovers.filter((post) => Number(post.NoOfDownloads) >= v);
    if (result.length != 0) {
      setCovers(result);
      setNoData("");
    } else {
      setNoData("No Covers available");
      setCovers([]);
    }
  }

  async function searchByName(val) {
    setSerchvalue(val);
    // document.getElementById("spinnerdiv").style.display = "block";
    // document.getElementById("coverdiv").style.display = "none";

    setspinner(false);
    setCoverdiv(true);
    await axios
      .get(
        "https://kaushal-rashmika-music.herokuapp.com/covers/getcoverbymaincover"
      )
      .then((res) => {
        if (res.data.length > 0) {
          setNoData("");
          dataholdedr = res.data;
          setCovers(res.data);
          setfilterCover(res.data);
          // document.getElementById("spinnerdiv").style.display = "none";
          // document.getElementById("coverdiv").style.display = "block";
          setspinner(true);
          setCoverdiv(false);

          let searchResult = filtercover.filter(
            (post) =>
              post.Title.toLowerCase().includes(val.toLowerCase()) ||
              post.OriginalArtistName.toLowerCase().includes(val.toLowerCase())
          );
          if (searchResult.length != 0) {
            setCovers(searchResult);
            setNoData("");
          } else {
            setNoData("No Covers available");
            setCovers([]);
          }
        } else {
          setNoData("No Covers available");
          setCovers([]);
        }

        // console.log(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  async function fetchData(type) {
    // document.getElementById("spinnerdiv").style.display = "block";
    // document.getElementById("coverdiv").style.display = "none";

    setspinner(false);
    setCoverdiv(true);
    await axios
      .get(
        "https://kaushal-rashmika-music.herokuapp.com/covers/getcoverbymaincover"
      )
      .then((res) => {
        dataholdedr = res.data;
        setCovers(res.data);
        setfilterCover(res.data);
        // document.getElementById("spinnerdiv").style.display = "none";
        // document.getElementById("coverdiv").style.display = "block";

        setspinner(true);
        setCoverdiv(false);

        if (type == "All") {
          setCategoryText("All");
          setCategoryCover(filtercover);
          setCovers(filtercover);
          setPriceRange(0);

          if (filtercover.length != 0) {
            setNoData("");
          } else {
            setNoData("No Covers available");
            setCovers([]);
          }
          setDownloadRange(0);
        } else {
          setCategoryText(type);
          let filtercovers = filtercover;
          let result = filtercovers.filter((post) =>
            post.SubCategory.includes(type)
          );
          setCovers(result);
          setCategoryCover(result);
          setPriceRange(0);
          setDownloadRange(0);
          setNoData("");
          if (result.length != 0) {
            setCovers(result);
            setNoData("");
          } else {
            setNoData("No Covers available");
            setCovers([]);
          }
        }

        // console.log(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  async function displayImages() {
    if (populerimage != null) {
      const storageRef = ref(storage, `PreviewImages/${populerimage}`);

      await getDownloadURL(storageRef)
        .then((url) => {
          document.getElementById("image").src = url;
          // document.getElementById("temp").hidden = true;
          //document.getElementById("image").hidden = false;

          console.log(url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div style={{ overflowX: "hidden" }}>
      <br />
      <div className="">
        <center>
          <div className="col-md-11 input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Search Music Covers"
              onChange={(e) => searchByName(e.target.value)}
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
        </center>
      </div>
      <br />
      <div class="">
        <div className="row ">
          {/* left side of the page */}

          <div
            className="col-md-4"
            style={{ paddingLeft: "25px", paddingRight: "25px" }}
          >
            <br />

            <div
              className="list-group"
              style={{
                height: "280px",
                overflowY: "scroll",
                overflow: "auto",
                overflowY: "hidden",
              }}
            >
              <a
                id="bufferlink"
                hidden={bufferLink}
                href="#"
                className="list-group-item list-group-item-action"
              >
                &emsp; Loading...
              </a>
              <br />
              <a
                href="#"
                id="link1"
                hidden={link1}
                onClick={() => fetchData("All")}
                className="list-group-item list-group-item-action"
              >
                <i className="fa fa-music"></i>&emsp; All
              </a>
              <span id="link">
                {categories.map((post) => (
                  <a
                    href="#"
                    id="link"
                    hidden={link}
                    onClick={() => fetchData(post)}
                    className="list-group-item list-group-item-action"
                  >
                    <i className="fa fa-music"></i>&emsp; {post}
                  </a>
                ))}
              </span>
            </div>
            <div>
              <br />
              <div className="row" style={{ textAlign: "center" }}>
                <div className="col-md-5">
                  <label>Price Range </label>
                  <label>({pricerange} - 200+) </label>
                  <div class="slidecontainer">
                    <input
                      id="typeinp"
                      type="range"
                      min="0"
                      max="200"
                      value={pricerange}
                      onChange={(e) => sortByPrice(e.target.value)}
                      step="1"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label> Downloads Range </label>
                  <label>({downloadrange} - 200+) </label>
                  <div class="slidecontainer">
                    <input
                      id="typeinp"
                      type="range"
                      min="0"
                      max="200"
                      value={downloadrange}
                      onChange={(e) => sortByDownloads(e.target.value)}
                      step="1"
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <br />
                <h4
                  style={{
                    color: "#764A34",
                    fontSize: "20px",
                    paddingLeft: "40px",
                    paddingRight: "40px",
                    fontWeight: "bold",
                  }}
                >
                  <center>Most Downloaded Classical Guitar Cover</center>
                </h4>
              </div>
              <center>
                <div
                  id="spinnerdiv2"
                  hidden={spinner2}
                  class="col-lg-8 "
                  style={{ display: "block" }}
                >
                  <br />

                  <div class=" justify-content-center">
                    <div class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                </div>
              </center>
              <center>
                <h4 style={{ color: "red" }}>{populernodata}</h4>
              </center>
              <div
                id="topcover"
                hidden={topcoverdiv}
                // style={{ display: "none" }}
                onClick={() => {
                  props.history.push(
                    "/customer/detailedcover/" + populercover._id
                  );
                }}
              >
                <div
                  class="card"
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
                    borderRadius: "15px",
                    marginRight: "15px",
                    marginLeft: "15px",
                  }}
                >
                  {/* <img
            id="temp"
            src={"/images/imageplaceholder.png"}
            class="card-img-top"
            alt="..."
            style={{ borderRadius: "15px 15px 0px 0px", height: "350px" }}
          /> */}
                  <img
                    id="image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/imageplaceholder.png";
                    }}
                    src={displayImages()}
                    class="card-img-top"
                    alt="..."
                    style={{
                      borderRadius: "15px 15px 0px 0px",
                      height: "350px",
                    }}
                  />
                  <div class="card-body">
                    <h4 class="card-title" style={{ fontWeight: "bold" }}>
                      {populercover.Title}
                    </h4>
                    <h5>{populercover.OriginalArtistName}</h5>
                    {/* <h5>{props.category}</h5> */}
                    <h5>{populercover.MainCategory}</h5>
                    <h5>{populercover.SubCategory}</h5>
                    <h5 style={{ float: "right", color: "#764A34" }}>
                      <b>US$ {populercover.Price}</b>
                    </h5>
                  </div>
                </div>
                {/* <TopDownloadTemplate
                  title={populercover.Title}
                  price={populercover.Price}
                  artist={populercover.OriginalArtistName}
                  maincat={populercover.MainCategory}
                  subcat={populercover.SubCategory}
                  id="topcover"
                  imageName={populerimage}
                /> */}
              </div>
            </div>

            <br />
          </div>
          {/* right side of the page */}
          <div className="col-md-8">
            <h4
              style={{
                color: "#764A34",
                fontSize: "20px",
                paddingLeft: "40px",
                paddingRight: "40px",
                fontWeight: "bold",
              }}
            >
              Classical Guitar Covers - {categorytext}
            </h4>
            <br />
            <center>
              <h4 style={{ color: "red" }}>{nodata}</h4>
            </center>
            <div className="row">
              <div
                id="spinnerdiv"
                hidden={spinner}
                class="col-lg-8 "
                style={{ display: "block" }}
              >
                <br />
                <center>
                  <div class=" justify-content-center">
                    <div class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                </center>
              </div>
            </div>{" "}
            <span hidden={coverdiv} id="coverdiv">
              <div className="d-block d-sm-none">
                <Carousel responsive={responsive}>
                  {covers.map((post, index) => (
                    // console.log(post.PreviewPages[0]),
                    <div
                      className="col-md bg-image hover-zoom"
                      onClick={() => {
                        props.history.push(
                          "/customer/detailedcover/" + post._id
                        );
                      }}
                    >
                      <CoverTemplate
                        title={post.Title}
                        coverId={post._id}
                        artist={post.OriginalArtistName}
                        price={post.Price}
                        category={post.SubCategory}
                        id={index}
                        imageName={post.PreviewPages[0]}
                      />
                      <br />
                    </div>
                  ))}
                </Carousel>

                <br />
                <br />
              </div>
              <div
                style={{
                  height: "890px",
                  overflowX: "hidden",
                  overflowY: "scroll",
                  paddingRight: "20px",
                  paddingLeft: "20px",
                  overflow: "auto",
                  overflowY: "hidden",
                }}
                className="d-none d-sm-block"
              >
                <div className="row">
                  {covers.map((post, index) => (
                    // console.log(post.PreviewPages[0]),
                    <div
                      className="col-md-4 bg-image hover-zoom"
                      onClick={() => {
                        props.history.push(
                          "/customer/detailedcover/" + post._id
                        );
                      }}
                    >
                      <CoverTemplate
                        title={post.Title}
                        coverId={post._id}
                        artist={post.OriginalArtistName}
                        price={post.Price}
                        category={post.SubCategory}
                        id={index}
                        imageName={post.PreviewPages[0]}
                      />
                      <br />
                    </div>
                  ))}

                  <br />
                  <br />
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
