import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "react-bootstrap/Modal";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "../../css/toogle.css";
import { useNavigate } from "react-router-dom";
export default function ViewCovers(props) {
  const [covers, setCovers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
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

  let navigate = useNavigate();

  useEffect(() => {
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

    getAllClassicalGuitarCovers();
  }, []);

  function setContent() {
    setSubCategories(tempSubCategory);
    setLessonSubCategories(tempSubCategory2);
    setCovers(tempCovers.filter((covers) => covers.Status != "3"));
    $(document).ready(function () {
      $("#Covers").DataTable();
    });
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
  function changeCoverStatus(id, index) {
    let status = "";
    axios
      .get("http://localhost:8070/covers/get/" + id)
      .then((res) => {
        let content = "";
        status = res.data.Status;
        if (status == "1") {
          // deactivating
          content = {
            Status: "2",
          };
        } else if (status == "2") {
          // activating
          content = {
            Status: "1",
          };
        }

        axios
          .put("http://localhost:8070/covers/StatusUpdate/" + id, content)
          .then((res) => {
            alert("status updated");
            if (content.Status == "1") {
              document.getElementById("toggle" + index).checked = true;
            } else {
              document.getElementById("toggle" + index).checked = false;
            }
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  }

  function deleteCover(id) {
    const content = {
      Status: "3",
    };
    axios
      .put("http://localhost:8070/covers/StatusUpdate/" + id, content)
      .then((res) => {
        alert("cover deleted");
        getAllClassicalGuitarCovers();
      })
      .catch((err) => {
        alert(err);
      });
  }
  function viewMoreCover(id) {
    navigate("/detailed/" + id);
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

  // add cover / exercise
  function addCover(e) {
    e.preventDefault();
    let dynamicSubCategory = "";
    let previewPageList = [];
    for (let i = 0; i < previewPages.length; i++) {
      previewPageList.push(previewPages[i].name);
    }
    if (
      document.getElementById("MainCategory").value ==
      "Guitar Technics & Lessons"
    ) {
      dynamicSubCategory = document.getElementById("subCategory2").value;
    } else if (
      document.getElementById("MainCategory").value == "Classical Guitar Covers"
    ) {
      dynamicSubCategory = document.getElementById("subCategory1").value;
    }
    const InstrumntArray = instruments.split(",");
    const newCover = {
      Title: songName,
      OriginalArtistName: originalArtist,
      InstrumentsPlayedOn: InstrumntArray,
      ArrangedBy: arrangedBy,
      SubCategory: dynamicSubCategory,
      MainCategory: document.getElementById("MainCategory").value,
      NoOfPages: noOfPages,
      NoOfPreviewPages: previewPages.length,
      Price: price,
      YoutubeLink: youtubeLink,
      FacebookLink: facebookLink,
      PreviewPages: previewPageList,
      CoverPdf: coverPDF[0].name,
    };
    console.log(newCover);

    axios
      .post("http://localhost:8070/covers/add", newCover)
      .then(() => {
        alert("cover added");
        getAllClassicalGuitarCovers();
        $("input[type=text]").val("");
        $("input[type=number]").val("");
        $("input[type=file]").val("");
      })
      .catch((err) => {
        alert(err);
      });
  }

  function checkStatus(status) {
    if (status == "1") {
      return true;
    } else if (status == "2") {
      return false;
    }
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
      <div className="container-xxl">
        <h1 style={{ color: "#764A34", textAlign: "center" }}>
          <b>Covers Details</b>
        </h1>
        <div className="text-center">
          <button
            type="button"
            class="btn btn-rounded rounded"
            style={{ backgroundColor: "#279B14", color: "#ffffff" }}
            onClick={() => {
              setModalOpen(true);
              setYoutubeLivePriview(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </button>{" "}
          <button
            type="button"
            class="btn btn-rounded rounded"
            style={{ backgroundColor: "#59bfff", color: "#ffffff" }}
            onClick={() => {
              getAllClassicalGuitarCovers();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-arrow-clockwise"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
            </svg>
          </button>
        </div>

        <br />
        <h3 style={{ color: "#764A34", marginTop: "20px" }}>
          <b>
            <ul>Classical Guitar Covers</ul>
          </b>
        </h3>
      </div>
      <div className="container-xxl" style={{ overflowX: "auto" }}>
        <br />
        <table
          id="Covers"
          class="table table-striped table-bordered table-hover"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>Title</th>
              <th>Original Artist Name</th>
              <th>Arranged By</th>
              <th>Instuments Played On </th>
              <th>Main Category</th>
              <th>Sub Category</th>
              <th>Price</th>
              <th>Added Date And Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {covers.map((covers, index) => {
              return (
                <tr>
                  <td>{covers.Title}</td>
                  <td>{covers.OriginalArtistName}</td>
                  <td>{covers.ArrangedBy}</td>
                  <td>
                    {covers.InstrumentsPlayedOn.map((instruments, index) => {
                      return <div>{instruments}</div>;
                    })}
                  </td>
                  <td>{covers.MainCategory}</td>
                  <td>{covers.SubCategory}</td>
                  <td>{covers.Price}</td>
                  <td>{covers.AddedDateAndTime}</td>
                  <td>
                    {" "}
                    <label class="switch">
                      <input
                        type="checkbox"
                        id={"toggle" + index}
                        checked={checkStatus(covers.Status)}
                        onChange={() => changeCoverStatus(covers._id, index)}
                      />
                      <span class="slider round"></span>
                    </label>
                  </td>
                  <td>
                    {/* <button
                      className="btn-sm"
                      style={{ display: "inline" }}
                      onClick={() => redirectToCoverPage(covers._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#279B14"
                        class="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                    </button>
                    <span> </span> */}
                    <button
                      className="btn-sm"
                      style={{ display: "inline", border: "1px solid #D0193A" }}
                      onClick={() => deleteCover(covers._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#D0193A"
                        class="bi bi-trash-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                      </svg>
                    </button>
                    <span> </span>
                    <button
                      className="btn-sm"
                      style={{ display: "inline", border: "1px solid #764A34" }}
                      onClick={() => viewMoreCover(covers._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#764A34"
                        class="bi bi-three-dots-vertical"
                        viewBox="0 0 16 16"
                      >
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th>Title</th>
              <th>Original Artist Name</th>
              <th>Arranged By</th>
              <th>Instuments Played On </th>
              <th>Main Category</th>
              <th>Sub Category</th>
              <th>Price</th>
              <th>Added Date And Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>

      <Modal show={modalOpen} size="lg">
        <form onSubmit={addCover}>
          <Modal.Header>
            <h4>Add Cover/Excercise</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setModalOpen(false);
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
                      //onkeypress='validate(event)'
                      // onBlur={() => setYoutubeLivePriview(true)}
                      onFocus = {()=> setYoutubeLivePriview(false)}
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
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(e) => {
                        setPreviewPages(e.target.files);
                      }}
                      multiple
                      required
                    />
                    <br />
                    <label for="exampleInputEmail1">Price*</label>
                    <input
                      type="number"
                      name="price"
                      id="price"
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
                    <strong>Submit</strong>
                  </button>
                </center>
              </div>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
      {/* <CoverUpdate/> */}
    </div>
  );
}
