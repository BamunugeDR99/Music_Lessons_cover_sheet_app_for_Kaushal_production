import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "react-bootstrap/Modal";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "../../css/toogle.css";
export default function CoverUpdate(props) {
  const [covers, setCovers] = useState([]);
  const [modalOpen2, setModalOpen2] = useState(true);
  const [SubCategories, setSubCategories] = useState([]);
  let tempCovers = [];
  let tempMainCategory = "";
  let tempSubCategory = [];
  let tempSubCategory2 = [];

  // user inputs
  const [songName, setSongName] = useState("");
  const [instruments, setInstrument] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [noOfPages, setNoOfPages] = useState("");
  const [price, setPrices] = useState("");
  const [previewPages, setPreviewPages] = useState("");
  const [coverPDF, setCoverPDF] = useState("");
  const [originalArtist, setOriginalArtist] = useState("");
  const [arrangedBy, setArranngedBy] = useState("kaushal Rashmika");

  const [youtubeLivePreview, setYoutubeLivePriview] = useState(true);
  const [lessonSubCategories, setLessonSubCategories] = useState([]);
  const [subCategoryPreview, setSubCategoryPreview] = useState(false);
  const [cover, setCover] = useState([]);
  let tempMainCategoryStore = "";
  let tempSubCategoryStore = "";
  useEffect(() => {
    function getSpecificCover() {
      const coverID = "619a570da9008d29faffec33";
      axios
        .get("http://localhost:8070/covers/get/" + coverID)
        .then((res) => {
          setCover(res.data);
          tempMainCategoryStore = res.data.MainCategory;
          tempSubCategoryStore = res.data.SubCategory;
          getAllClassicalGutarMainCategories();
        })
        .catch((err) => {
          alert(err);
        });
    }

    getSpecificCover();
  }, []);

  function setContent() {
    setSubCategories(tempSubCategory);
    setLessonSubCategories(tempSubCategory2);

    document.getElementById("MainCategory").value = tempMainCategoryStore;
    if (tempMainCategoryStore == "Classical Guitar Covers") {
      document.getElementById("subCategory1").value = tempSubCategoryStore;
      setSubCategoryPreview(false);
    } else if (tempMainCategoryStore == "Guitar Technics & Lessons") {
      document.getElementById("subCategory2").value = tempSubCategoryStore;
      setSubCategoryPreview(true);
    }
  }

  function GetLessonSubCategories() {
    axios
      .get("http://localhost:8070/mainCategory/get/619deb0ca35d670b4e68ec3e")
      .then((res) => {
        tempSubCategory2 = res.data.SubCategories;
        setContent();
      })
      .catch((err) => {
        alert(err);
      });
  }
  function getAllClassicalGutarMainCategories() {
    axios
      .get("http://localhost:8070/mainCategory/get/61936e9d9ea7c21aebd01113")
      .then((res) => {
        tempSubCategory = res.data.SubCategories;
        GetLessonSubCategories();
      })
      .catch((err) => {
        alert(err);
      });
  }

  function getAllClassicalGuitarCovers() {
    axios
      .get("http://localhost:8070/covers/getcovers")
      .then((res) => {
        tempCovers = res.data;
        getAllClassicalGutarMainCategories();
      })
      .catch((err) => {
        alert(err);
      });
  }

  function updateCover(e) {
    e.preventDefault();
  }

  function youtubeLinkDefaultPreview() {
    if (youtubeLink.toLowerCase().includes("https://www.youtube.com/embed/")) {
      return youtubeLink;
    } else {
      return "https://www.youtube.com/embed/";
    }
  }
  return (
    <div>
      <Modal show={modalOpen2} size="lg">
        <form onSubmit={updateCover}>
          <Modal.Header>
            <h4>Edit Cover/Excercise</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setModalOpen2(false);
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </Modal.Header>

          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Song Name*</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Song Name"
                      Value={cover.Title}
                      onChange={(e) => {
                        setSongName(e.target.value);
                      }}
                      required
                    />
                    <br />
                    <label for="exampleInputMainCategory">Main Category</label>
                    <select
                      required
                      className="form-control"
                      onChange={() => {
                        if (subCategoryPreview == true) {
                          setSubCategoryPreview(false);
                        } else {
                          setSubCategoryPreview(true);
                        }
                      }}
                      id="MainCategory"
                      name="category"
                    >
                      <option>Classical Guitar Covers</option>
                      <option>Guitar Technics & Lessons</option>
                    </select>
                    <br />
                    <label for="exampleInputEmail1">YouTube Link*</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="YouTube Link"
                      Value = {cover.YoutubeLink}
                      onBlur={() => setYoutubeLivePriview(true)}
                      onChange={(e) => {
                        setYoutubeLink(e.target.value);
                        setYoutubeLivePriview(false);
                        if (e.target.value == "") {
                          setYoutubeLivePriview(true);
                        }
                      }}
                      required
                    />
                    <p style={{ color: "#ffba01" }}>
                      Enter the youtube embed url link
                    </p>
                    {/* youtube video  */}
                    <div
                      class="embed-responsive embed-responsive-16by9"
                      hidden={youtubeLivePreview}
                    >
                      <iframe
                        class="embed-responsive-item"
                        // need to use embeded youtube link
                        src={youtubeLinkDefaultPreview()}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      <br />
                    </div>
                    <label for="exampleInputEmail1">PDF File*</label>
                    <input
                      type="file"
                      name="pdffile"
                      id="pdffile"
                      style={{ height: "35px" }}
                      class="form-control form-control-sm"
                      id="exampleInputPDF"
                      accept="application/pdf"
                      onChange={(e) => {
                        setCoverPDF(e.target.files);
                      }}
                      required
                    />
                    <br />
                    <label for="exampleInputEmail1">No of Pages*</label>
                    <input
                      type="number"
                      name="noOfPages"
                      id="noOfPages"
                      Value = {cover.NoOfPages}
                      class="form-control form-control-sm"
                      id="exampleInputNoOfPages"
                      placeholder="(PDF) no of original pages"
                      onChange={(e) => {
                        setNoOfPages(e.target.value);
                      }}
                      required
                    />
                    <br />

                    <label for="exampleInputEmail1">Arranged By</label>
                    <input
                      type="text"
                      name="arranged"
                      id="arrangedByx"
                      Value = {cover.ArrangedBy}
                      class="form-control form-control-sm"
                      id="exampleInputArranged"
                      aria-describedby="priceHelp"
                      placeholder="Default : Kaushal Rashmika"
                      onChange={(e) => {
                        if (e.target.value.length == 0) {
                          setArranngedBy("Kaushal Rashmika");
                        } else {
                          setArranngedBy(e.target.value);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Instruments*</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Instrument Exp : (Guitar,Piano)"
                      onChange={(e) => {
                        setInstrument(e.target.value);
                      }}
                      required
                    />

                    <br />
                    <label for="exampleInputEmail1">Sub Category</label>
                    <select
                      hidden={subCategoryPreview}
                      className="form-control"
                      id="subCategory1"
                      name="subCategory"
                      required
                    >
                      {SubCategories.map((sub) => {
                        return <option>{sub}</option>;
                      })}
                    </select>
                    <select
                      hidden={!subCategoryPreview}
                      className="form-control"
                      id="subCategory2"
                      name="subCategory"
                      required
                    >
                      {lessonSubCategories.map((sub) => {
                        return <option>{sub}</option>;
                      })}
                    </select>
                    <br />
                    <label for="exampleInputEmail1">Facebook Link*</label>
                    <input
                      type="text"
                      Value = {cover.FacebookLink}
                      class="form-control"
                      onChange={(e) => {
                        setFacebookLink(e.target.value);
                      }}
                      placeholder="Facebook Link*"
                    />
                    <p style={{ color: "#ffba01" }}>
                      Enter the facebook page link
                    </p>
                    <label for="exampleInputEmail1">Preview Images*</label>
                    <input
                      type="file"
                      style={{ height: "35px" }}
                      name="sampleimages[]"
                      id="sampleimages"
                      class="form-control form-control-sm"
                      accept="image/png, image/jpeg"
                      onChange={(e) => {
                        setPreviewPages(e.target.files);
                      }}
                      multiple
                    />
                    <br />
                    <label for="exampleInputEmail1">Price*</label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      Value = {cover.Price}
                      class="form-control form-control-sm"
                      id="exampleInputprice"
                      aria-describedby="priceHelp"
                      onChange={(e) => {
                        setPrices(e.target.value);
                      }}
                      placeholder="Cover price"
                      required
                    />
                    <br />
                    <label for="exampleInputEmail1">Original Artist *</label>
                    <input
                      type="text"
                      name="originalArtis"
                      id="originalArtist"
                      Value = {cover.OriginalArtistName}
                      class="form-control form-control-sm"
                      id="exampleInputOArtist"
                      aria-describedby="priceHelp"
                      onChange={(e) => {
                        setOriginalArtist(e.target.value);
                      }}
                      placeholder="Original Artist name"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="row">
              <div className="col-md-6">
                <center>
                  <button
                    type="submit"
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
            </div>
          </Modal.Footer>
        </form>
      </Modal>
      
    </div>
  );
}
