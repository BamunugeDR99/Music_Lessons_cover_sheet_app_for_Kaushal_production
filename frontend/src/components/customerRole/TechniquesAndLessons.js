import React, { useState, useEffect } from "react";
import axios from "axios";
import CoverTemplate from "./covercardtemplate";
import TopDownloadTemplate from "./topdownloadtemplate";
import Modal from "react-bootstrap/Modal";
import InputRange from "react-input-range";
import { data, post } from "jquery";
import { Maximize } from "react-feather";

export default function MusicCoverPage() {
  const [modelOpen, setmodelOpen] = useState(false);
  const [pricerange, setPriceRange] = useState("0");
  const [downloadrange, setDownloadRange] = useState("0");
  const [nodata, setNoData] = useState("");
  const [covers, setCovers] = useState([]);
  const [filtercover, setfilterCover] = useState([]);
  const [categorycover, setCategoryCover] = useState([]);
  // const [filtercovers, setFilterCovers] = useState([]);
  const [categorytext, setCategoryText] = useState("All");
  const [serchvalue, setSerchvalue] = useState("");
  const [categories, setCategories] = useState([]);
  const [populercover, setpopulercover] = useState([]);
  let dataholdedr = [];

  let pcover = {};
  let max = 0;

  useEffect(async () => {
    document.getElementById("bufferlink").style.display = "block";
    document.getElementById("link").style.display = "none";
    document.getElementById("link1").style.display = "none";
    document.getElementById("spinnerdiv").style.display = "block";
    document.getElementById("coverdiv").style.display = "none";
    document.getElementById("spinnerdiv2").style.display = "block";
    document.getElementById("topcover").style.display = "none";

    await axios
      .get("http://localhost:8070/covers/getcoverbymainexcercise")
      .then((res) => {
        dataholdedr = res.data;
        setCovers(res.data);
        setfilterCover(res.data);
        setCategoryCover(res.data);
        setCovers(res.data);
        document.getElementById("spinnerdiv").style.display = "none";
        document.getElementById("coverdiv").style.display = "block";

        // console.log(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });

    // Getting sub categories
    axios
      .get("http://localhost:8070/mainCategory/get")
      .then((res) => {
        setCategories(res.data[1].SubCategories);
        document.getElementById("bufferlink").style.display = "none";
        document.getElementById("link").style.display = "block";
        document.getElementById("link1").style.display = "block";
        // console.log(res.data[0].SubCategories);
      })
      .catch((err) => {
        alert(err.message);
      });

    populercovers();
  }, []);

  function populercovers() {
    // console.log(dataholdedr);
    for (let i = 0; i < dataholdedr.length; i++) {
      // console.log(dataholdedr[i].NoOfDownloads)
      if (Number(dataholdedr[i].NoOfDownloads) >= max) {
        max = dataholdedr[i].NoOfDownloads;
        console.log(max);
        pcover = dataholdedr[i];
      }
    }
    // console.log(pcover);
    setpopulercover(pcover);
    document.getElementById("spinnerdiv2").style.display = "none";
    document.getElementById("topcover").style.display = "block";
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
    document.getElementById("spinnerdiv").style.display = "block";
    document.getElementById("coverdiv").style.display = "none";
    await axios
      .get("http://localhost:8070/covers/getcoverbymaincover")
      .then((res) => {
        dataholdedr = res.data;
        setCovers(res.data);
        setfilterCover(res.data);
        document.getElementById("spinnerdiv").style.display = "none";
        document.getElementById("coverdiv").style.display = "block";

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

        // console.log(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  async function fetchData(type) {
    document.getElementById("spinnerdiv").style.display = "block";
    document.getElementById("coverdiv").style.display = "none";
    await axios
      .get("http://localhost:8070/covers/getcoverbymainexcercise")
      .then((res) => {
        dataholdedr = res.data;
        setCovers(res.data);
        setfilterCover(res.data);
        document.getElementById("spinnerdiv").style.display = "none";
        document.getElementById("coverdiv").style.display = "block";
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


  return (
    <div>
      <br />
      <div className="container">
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
      <div class="container">
        <div className="row ">
          {/* left side of the page */}
          <div className="col-md-4">
            <div
              className="list-group"
              style={{ maxHeight: "30%", overflowY: "scroll" }}
            >
              <a
                style={{ display: "block" }}
                id="bufferlink"
                href="#"
                className="list-group-item list-group-item-action"
              >
                &emsp; Loading...
              </a>
              <a
                href="#"
                id="link1"
                style={{ display: "none" }}
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
                    style={{ display: "block" }}
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
              <div className="row text-center">
                <div className="col-md-6">
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
                  <label>Downloads Range</label>
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
              <div className="row">
                <h4 style={{ color: "#764A34" }}>
                  <strong>
                    <center>Most Downloaded Classical Guitar Cover</center>
                  </strong>
                </h4>
              </div>
              <center>
                <div
                  id="spinnerdiv2"
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
              <div id="topcover" style={{ display: "none" }}>
                <TopDownloadTemplate
                  title={populercover.Title}
                  price={populercover.Price}
                  artist={populercover.OriginalArtistName}
                  maincat={populercover.MainCategory}
                  subcat={populercover.SubCategory}
                  // id="0"
                  // imageName={populercover.PreviewPages[0]}
                />
              </div>
            </div>

            <br />
          </div>
          {/* right side of the page */}
          <div className="col-md-8">
            <h4 style={{ color: "#764A34" }}>
              <strong>Techniques & Lessons - {categorytext}</strong>
            </h4>
            <center>
              <h4 style={{ color: "red" }}>{nodata}</h4>
            </center>
            <div className="row">
              <div
                id="spinnerdiv"
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
            <span id="coverdiv">
              <div className="row">
                {covers.map((post, index) => (
                  <div className="col-md-4" onClick={() => modalopen()}>
                    <CoverTemplate
                      title={post.Title}
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
            </span>
          </div>
        </div>
      </div>

      {/* user details update model */}
      <Modal show={modelOpen} size="lg">
        <Modal.Header>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={modalClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row text-center">
              <div className="col-sm-6">
                <h6 style={{ color: "#764A34" }}>
                  <strong>User Name</strong>: alex98
                </h6>
              </div>
              <div className="col-sm-6">
                <h6 style={{ color: "#764A34" }}>
                  <strong>Email</strong>:{" "}
                  <a href="">
                    <u>alex@gmail.com</u>
                  </a>
                </h6>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <center>
                  <br />
                  <div className="col-md-9 input-group">
                    <div class="input-group-append">
                      <span className="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-person-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                      </span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="First Name"
                    />
                  </div>
                  <br />
                  <div className="col-md-9 input-group">
                    <div class="input-group-append">
                      <span className="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-telephone-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                          />
                        </svg>
                      </span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Contact Number"
                    />
                  </div>
                  <br />
                  <div className="col-md-9 input-group">
                    <div class="input-group-append">
                      <span className="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-lock-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                        </svg>
                      </span>
                    </div>
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Password"
                    />
                  </div>
                  <br />
                  <div className="col-md-9 input-group">
                    <div class="input-group-append">
                      <span className="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-gender-ambiguous"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M11.5 1a.5.5 0 0 1 0-1h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-3.45 3.45A4 4 0 0 1 8.5 10.97V13H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V14H6a.5.5 0 0 1 0-1h1.5v-2.03a4 4 0 1 1 3.471-6.648L14.293 1H11.5zm-.997 4.346a3 3 0 1 0-5.006 3.309 3 3 0 0 0 5.006-3.31z"
                          />
                        </svg>
                      </span>
                    </div>
                    <select
                      className="form-control"
                      id="country"
                      name="country"
                    >
                      <option>Select</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </center>
              </div>
              <div className="col-sm-6">
                <center>
                  <br />
                  <div className="col-md-9 input-group">
                    <div class="input-group-append">
                      <span className="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-person-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                      </span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Last Name"
                    />
                  </div>
                  <br />
                  <div className="col-md-9 input-group">
                    <div class="input-group-append">
                      <span className="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-globe"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                        </svg>
                      </span>
                    </div>
                    <select
                      className="form-control"
                      id="country"
                      name="country"
                    >
                      <option>select country</option>
                      <option value="AF">Afghanistan</option>
                      <option value="AX">Aland Islands</option>
                      <option value="AL">Albania</option>
                      <option value="DZ">Algeria</option>
                      <option value="AS">American Samoa</option>
                      <option value="AD">Andorra</option>
                      <option value="AO">Angola</option>
                      <option value="AI">Anguilla</option>
                      <option value="AQ">Antarctica</option>
                      <option value="AG">Antigua and Barbuda</option>
                      <option value="AR">Argentina</option>
                      <option value="AM">Armenia</option>
                      <option value="AW">Aruba</option>
                      <option value="AU">Australia</option>
                      <option value="AT">Austria</option>
                      <option value="AZ">Azerbaijan</option>
                      <option value="BS">Bahamas</option>
                      <option value="BH">Bahrain</option>
                      <option value="BD">Bangladesh</option>
                      <option value="BB">Barbados</option>
                      <option value="BY">Belarus</option>
                      <option value="BE">Belgium</option>
                      <option value="BZ">Belize</option>
                      <option value="BJ">Benin</option>
                      <option value="BM">Bermuda</option>
                      <option value="BT">Bhutan</option>
                      <option value="BO">Bolivia</option>
                      <option value="BQ">
                        Bonaire, Sint Eustatius and Saba
                      </option>
                      <option value="BA">Bosnia and Herzegovina</option>
                      <option value="BW">Botswana</option>
                      <option value="BV">Bouvet Island</option>
                      <option value="BR">Brazil</option>
                      <option value="IO">British Indian Ocean Territory</option>
                      <option value="BN">Brunei Darussalam</option>
                      <option value="BG">Bulgaria</option>
                      <option value="BF">Burkina Faso</option>
                      <option value="BI">Burundi</option>
                      <option value="KH">Cambodia</option>
                      <option value="CM">Cameroon</option>
                      <option value="CA">Canada</option>
                      <option value="CV">Cape Verde</option>
                      <option value="KY">Cayman Islands</option>
                      <option value="CF">Central African Republic</option>
                      <option value="TD">Chad</option>
                      <option value="CL">Chile</option>
                      <option value="CN">China</option>
                      <option value="CX">Christmas Island</option>
                      <option value="CC">Cocos (Keeling) Islands</option>
                      <option value="CO">Colombia</option>
                      <option value="KM">Comoros</option>
                      <option value="CG">Congo</option>
                      <option value="CD">
                        Congo, Democratic Republic of the Congo
                      </option>
                      <option value="CK">Cook Islands</option>
                      <option value="CR">Costa Rica</option>
                      <option value="CI">Cote D'Ivoire</option>
                      <option value="HR">Croatia</option>
                      <option value="CU">Cuba</option>
                      <option value="CW">Curacao</option>
                      <option value="CY">Cyprus</option>
                      <option value="CZ">Czech Republic</option>
                      <option value="DK">Denmark</option>
                      <option value="DJ">Djibouti</option>
                      <option value="DM">Dominica</option>
                      <option value="DO">Dominican Republic</option>
                      <option value="EC">Ecuador</option>
                      <option value="EG">Egypt</option>
                      <option value="SV">El Salvador</option>
                      <option value="GQ">Equatorial Guinea</option>
                      <option value="ER">Eritrea</option>
                      <option value="EE">Estonia</option>
                      <option value="ET">Ethiopia</option>
                      <option value="FK">Falkland Islands (Malvinas)</option>
                      <option value="FO">Faroe Islands</option>
                      <option value="FJ">Fiji</option>
                      <option value="FI">Finland</option>
                      <option value="FR">France</option>
                      <option value="GF">French Guiana</option>
                      <option value="PF">French Polynesia</option>
                      <option value="TF">French Southern Territories</option>
                      <option value="GA">Gabon</option>
                      <option value="GM">Gambia</option>
                      <option value="GE">Georgia</option>
                      <option value="DE">Germany</option>
                      <option value="GH">Ghana</option>
                      <option value="GI">Gibraltar</option>
                      <option value="GR">Greece</option>
                      <option value="GL">Greenland</option>
                      <option value="GD">Grenada</option>
                      <option value="GP">Guadeloupe</option>
                      <option value="GU">Guam</option>
                      <option value="GT">Guatemala</option>
                      <option value="GG">Guernsey</option>
                      <option value="GN">Guinea</option>
                      <option value="GW">Guinea-Bissau</option>
                      <option value="GY">Guyana</option>
                      <option value="HT">Haiti</option>
                      <option value="HM">
                        Heard Island and Mcdonald Islands
                      </option>
                      <option value="VA">Holy See (Vatican City State)</option>
                      <option value="HN">Honduras</option>
                      <option value="HK">Hong Kong</option>
                      <option value="HU">Hungary</option>
                      <option value="IS">Iceland</option>
                      <option value="IN">India</option>
                      <option value="ID">Indonesia</option>
                      <option value="IR">Iran, Islamic Republic of</option>
                      <option value="IQ">Iraq</option>
                      <option value="IE">Ireland</option>
                      <option value="IM">Isle of Man</option>
                      <option value="IL">Israel</option>
                      <option value="IT">Italy</option>
                      <option value="JM">Jamaica</option>
                      <option value="JP">Japan</option>
                      <option value="JE">Jersey</option>
                      <option value="JO">Jordan</option>
                      <option value="KZ">Kazakhstan</option>
                      <option value="KE">Kenya</option>
                      <option value="KI">Kiribati</option>
                      <option value="KP">
                        Korea, Democratic People's Republic of
                      </option>
                      <option value="KR">Korea, Republic of</option>
                      <option value="XK">Kosovo</option>
                      <option value="KW">Kuwait</option>
                      <option value="KG">Kyrgyzstan</option>
                      <option value="LA">
                        Lao People's Democratic Republic
                      </option>
                      <option value="LV">Latvia</option>
                      <option value="LB">Lebanon</option>
                      <option value="LS">Lesotho</option>
                      <option value="LR">Liberia</option>
                      <option value="LY">Libyan Arab Jamahiriya</option>
                      <option value="LI">Liechtenstein</option>
                      <option value="LT">Lithuania</option>
                      <option value="LU">Luxembourg</option>
                      <option value="MO">Macao</option>
                      <option value="MK">
                        Macedonia, the Former Yugoslav Republic of
                      </option>
                      <option value="MG">Madagascar</option>
                      <option value="MW">Malawi</option>
                      <option value="MY">Malaysia</option>
                      <option value="MV">Maldives</option>
                      <option value="ML">Mali</option>
                      <option value="MT">Malta</option>
                      <option value="MH">Marshall Islands</option>
                      <option value="MQ">Martinique</option>
                      <option value="MR">Mauritania</option>
                      <option value="MU">Mauritius</option>
                      <option value="YT">Mayotte</option>
                      <option value="MX">Mexico</option>
                      <option value="FM">
                        Micronesia, Federated States of
                      </option>
                      <option value="MD">Moldova, Republic of</option>
                      <option value="MC">Monaco</option>
                      <option value="MN">Mongolia</option>
                      <option value="ME">Montenegro</option>
                      <option value="MS">Montserrat</option>
                      <option value="MA">Morocco</option>
                      <option value="MZ">Mozambique</option>
                      <option value="MM">Myanmar</option>
                      <option value="NA">Namibia</option>
                      <option value="NR">Nauru</option>
                      <option value="NP">Nepal</option>
                      <option value="NL">Netherlands</option>
                      <option value="AN">Netherlands Antilles</option>
                      <option value="NC">New Caledonia</option>
                      <option value="NZ">New Zealand</option>
                      <option value="NI">Nicaragua</option>
                      <option value="NE">Niger</option>
                      <option value="NG">Nigeria</option>
                      <option value="NU">Niue</option>
                      <option value="NF">Norfolk Island</option>
                      <option value="MP">Northern Mariana Islands</option>
                      <option value="NO">Norway</option>
                      <option value="OM">Oman</option>
                      <option value="PK">Pakistan</option>
                      <option value="PW">Palau</option>
                      <option value="PS">
                        Palestinian Territory, Occupied
                      </option>
                      <option value="PA">Panama</option>
                      <option value="PG">Papua New Guinea</option>
                      <option value="PY">Paraguay</option>
                      <option value="PE">Peru</option>
                      <option value="PH">Philippines</option>
                      <option value="PN">Pitcairn</option>
                      <option value="PL">Poland</option>
                      <option value="PT">Portugal</option>
                      <option value="PR">Puerto Rico</option>
                      <option value="QA">Qatar</option>
                      <option value="RE">Reunion</option>
                      <option value="RO">Romania</option>
                      <option value="RU">Russian Federation</option>
                      <option value="RW">Rwanda</option>
                      <option value="BL">Saint Barthelemy</option>
                      <option value="SH">Saint Helena</option>
                      <option value="KN">Saint Kitts and Nevis</option>
                      <option value="LC">Saint Lucia</option>
                      <option value="MF">Saint Martin</option>
                      <option value="PM">Saint Pierre and Miquelon</option>
                      <option value="VC">
                        Saint Vincent and the Grenadines
                      </option>
                      <option value="WS">Samoa</option>
                      <option value="SM">San Marino</option>
                      <option value="ST">Sao Tome and Principe</option>
                      <option value="SA">Saudi Arabia</option>
                      <option value="SN">Senegal</option>
                      <option value="RS">Serbia</option>
                      <option value="CS">Serbia and Montenegro</option>
                      <option value="SC">Seychelles</option>
                      <option value="SL">Sierra Leone</option>
                      <option value="SG">Singapore</option>
                      <option value="SX">Sint Maarten</option>
                      <option value="SK">Slovakia</option>
                      <option value="SI">Slovenia</option>
                      <option value="SB">Solomon Islands</option>
                      <option value="SO">Somalia</option>
                      <option value="ZA">South Africa</option>
                      <option value="GS">
                        South Georgia and the South Sandwich Islands
                      </option>
                      <option value="SS">South Sudan</option>
                      <option value="ES">Spain</option>
                      <option value="LK">Sri Lanka</option>
                      <option value="SD">Sudan</option>
                      <option value="SR">Suriname</option>
                      <option value="SJ">Svalbard and Jan Mayen</option>
                      <option value="SZ">Swaziland</option>
                      <option value="SE">Sweden</option>
                      <option value="CH">Switzerland</option>
                      <option value="SY">Syrian Arab Republic</option>
                      <option value="TW">Taiwan, Province of China</option>
                      <option value="TJ">Tajikistan</option>
                      <option value="TZ">Tanzania, United Republic of</option>
                      <option value="TH">Thailand</option>
                      <option value="TL">Timor-Leste</option>
                      <option value="TG">Togo</option>
                      <option value="TK">Tokelau</option>
                      <option value="TO">Tonga</option>
                      <option value="TT">Trinidad and Tobago</option>
                      <option value="TN">Tunisia</option>
                      <option value="TR">Turkey</option>
                      <option value="TM">Turkmenistan</option>
                      <option value="TC">Turks and Caicos Islands</option>
                      <option value="TV">Tuvalu</option>
                      <option value="UG">Uganda</option>
                      <option value="UA">Ukraine</option>
                      <option value="AE">United Arab Emirates</option>
                      <option value="GB">United Kingdom</option>
                      <option value="US">United States</option>
                      <option value="UM">
                        United States Minor Outlying Islands
                      </option>
                      <option value="UY">Uruguay</option>
                      <option value="UZ">Uzbekistan</option>
                      <option value="VU">Vanuatu</option>
                      <option value="VE">Venezuela</option>
                      <option value="VN">Viet Nam</option>
                      <option value="VG">Virgin Islands, British</option>
                      <option value="VI">Virgin Islands, U.s.</option>
                      <option value="WF">Wallis and Futuna</option>
                      <option value="EH">Western Sahara</option>
                      <option value="YE">Yemen</option>
                      <option value="ZM">Zambia</option>
                      <option value="ZW">Zimbabwe</option>
                    </select>
                  </div>
                  <br />
                  <div className="col-md-9 input-group">
                    <div class="input-group-append">
                      <span className="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-lock-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                        </svg>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Re-type Password"
                    />
                  </div>
                  <br />
                </center>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="row">
            <div className="col-md-6">
              <center>
                <button
                  type="button"
                  class="btn btn"
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#28A745",
                    color: "white",
                  }}
                >
                  <strong>Update</strong>
                </button>
              </center>
            </div>

            <div className="col-md-6">
              <center>
                <button
                  type="button"
                  class="btn "
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#D0193A",
                    color: "white",
                  }}
                >
                  <strong>Delete</strong>
                </button>
              </center>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
