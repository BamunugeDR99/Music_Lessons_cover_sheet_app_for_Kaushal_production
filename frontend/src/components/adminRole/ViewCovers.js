import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "react-bootstrap/Modal";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "../../css/toogle.css";
import Swal from "sweetalert2";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// Be sure to include styles at some point, probably during your bootstrapping
// import 'react-select/dist/css/react-select.css';
import { storage } from "../../Configurations/firebaseConfigurations";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
export default function ViewCovers(props) {
  const [covers, setCovers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUploadOpen, setModalUploadOpen] = useState(false);
  const [progress, setProgress] = useState("");
  const [SubCategories, setSubCategories] = useState([]);
  let tempCovers = [];
  let tempMainCategory = "";
  let tempSubCategory = [];
  let tempSubCategory2 = [];

  // user inputs
  const [songName, setSongName] = useState("");
  const [instruments, setInstrument] = useState([]);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [noOfPages, setNoOfPages] = useState("");
  const [price, setPrices] = useState("");
  const [previewPages, setPreviewPages] = useState([]);
  const [coverPDF, setCoverPDF] = useState("");
  const [originalArtist, setOriginalArtist] = useState("");
  const [arrangedBy, setArranngedBy] = useState("kaushal Rashmika");

  const [youtubeLivePreview, setYoutubeLivePriview] = useState(true);
  const [lessonSubCategories, setLessonSubCategories] = useState([]);
  const [subCategoryPreview, setSubCategoryPreview] = useState(false);

  // for uploading modal
  const [fileType, setFileType] = useState("");
  const [completedFiles, setCompletedFiles] = useState("0");
  const [totalFiles, setTotalFiles] = useState("");
  const [completeCoverAddingStatus, setCoverAddingStatus] = useState(true);
  const [cancelOrCloseBtn, setCancelOrCloseBtn] = useState("Close");
  const [finalDiv, setFinalDiv] = useState(true);

  const instrumentsPlayedOn = [
    { value: "Classical Guitar", label: "Classical Guitar" },
    { value: "Piano", label: "Piano" },
    { value: "Ukulele", label: "Ukulele" },
    { value: "Acoustic Guitar", label: "Acoustic Guitar" },
  ];
  // for pdf preview
  const [modalOpenForPdf, setModalOpenForPdf] = useState(false);
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
      //$('.js-example-basic-multiple').select2();
    });
  }

  function previewPdf(covername) {
    setModalOpenForPdf(true);
    const storageRef = ref(storage, `Covers(PDF)/${covername}`);
    getDownloadURL(storageRef)
      .then((url) => {
        // setPdfUrl(url)
        window.location.href = url;
        //setModalOpenForPdf(false)
      })
      .catch(() => {
        setModalOpenForPdf(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
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
            if (content.Status == "1") {
              document.getElementById("toggle" + index).checked = true;
              const Toast = Swal.mixin({
                toast: true,
                position: "center",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: false,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: "success",
                title: "Cover Activated",
              });
            } else {
              document.getElementById("toggle" + index).checked = false;
              const Toast = Swal.mixin({
                toast: true,
                position: "center",
                showConfirmButton: false,
                timer: 2000,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: "warning",
                title: "Cover Deavtivated",
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: '<p style = "color : #D0193A">Currently unavailable!',
            });
          });
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

  function deleteCover(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const content = {
            Status: "3",
          };
          axios
            .put("http://localhost:8070/covers/StatusUpdate/" + id, content)
            .then((res) => {
              getAllClassicalGuitarCovers();
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your cover has been deleted.",
                "success"
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
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your cover is safe :)",
            "error"
          );
        }
      });
  }
  function viewMoreCover(id) {
    props.history.push("/admin/viewmorecover/" + id);
  }

  function getAllClassicalGuitarCovers() {
    axios
      .get("http://localhost:8070/covers/getcovers")
      .then((res) => {
        tempCovers = res.data;
        getAllClassicalGutarMainCategories();
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

  // add cover / exercise
  function addCover(e) {
    e.preventDefault();

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, add it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          setFinalDiv(true);
          setCoverAddingStatus(true);

          setTotalFiles(previewPages.length + 1);
          // console.log(previewPages.length+1)
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
            document.getElementById("MainCategory").value ==
            "Classical Guitar Covers"
          ) {
            dynamicSubCategory = document.getElementById("subCategory1").value;
          }
          //const InstrumntArray = instruments.split(",");
          let InstrumntArray = [];
          for (let i = 0; i < instruments.length; i++) {
            InstrumntArray.push(instruments[i].value);
          }
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
          //console.log(newCover);
          UploadPdf();

          axios
            .post("http://localhost:8070/covers/add", newCover)
            .then(() => {
              getAllClassicalGuitarCovers();
              $("input[type=text]").val("");
              $("input[type=number]").val("");
              $("input[type=file]").val("");
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<p style = "color : #D0193A">Currently unavailable!',
              });
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Process has been undo :)",
            "error"
          );
        }
      });
  }

  function UploadPdf() {
    setFileType("Uploading Pdf Cover");
    setModalUploadOpen(true);
    setModalOpen(false);
    const storageRef = ref(storage, `Covers(PDF)/${coverPDF[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, coverPDF[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
        if (prog >= 100) {
          setCompletedFiles("1");
          UploadImages();
        } else {
          // setClass("");
        }
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<p style = "color : #D0193A">Currently unavailable!',
        });
      }
    );
  }
  function UploadImages() {
    setFileType("Uploading Preview Images");
    let storageRef = "";
    const promises = [];
    previewPages.map((previewPage, index) => {
      storageRef = ref(storage, `PreviewImages/${previewPage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, previewPage);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
          if (prog >= 100) {
            setCompletedFiles(index + 2);
          } else {
          }
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<p style = "color : #D0193A">Currently unavailable!',
          });
        }
      );
    });

    Promise.all(promises)
      .then(() => {
        setFileType("Cover added Successfully!");
        setCompletedFiles(previewPages.length + 1);
        setFinalDiv(false);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<p style = "color : #D0193A">Currently unavailable!',
        });
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

  // function test(val){
  //   console.log(val.value)
  // }
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
              setPreviewPages("");
              setInstrument([]);
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
                  <td>
                    Date : {covers.AddedDateAndTime.substring(0, 10)} <br />{" "}
                    Time : {covers.AddedDateAndTime.substring(12, 19)}
                  </td>
                  <td>
                    {" "}
                    {/* change cover status  */}
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
                    {/* pdf viewer  */}
                    <button
                      className="btn-sm"
                      style={{ display: "inline", border: "1px solid #D0193A" }}
                      //onClick={() => window.location.href = {pdfUrl}}
                      onClick={() => previewPdf(covers.CoverPdf)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#D0193A"
                        class="bi bi-file-earmark-pdf-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.523 12.424c.14-.082.293-.162.459-.238a7.878 7.878 0 0 1-.45.606c-.28.337-.498.516-.635.572a.266.266 0 0 1-.035.012.282.282 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548zm2.455-1.647c-.119.025-.237.05-.356.078a21.148 21.148 0 0 0 .5-1.05 12.045 12.045 0 0 0 .51.858c-.217.032-.436.07-.654.114zm2.525.939a3.881 3.881 0 0 1-.435-.41c.228.005.434.022.612.054.317.057.466.147.518.209a.095.095 0 0 1 .026.064.436.436 0 0 1-.06.2.307.307 0 0 1-.094.124.107.107 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256zM8.278 6.97c-.04.244-.108.524-.2.829a4.86 4.86 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.517.517 0 0 1 .145-.04c.013.03.028.092.032.198.005.122-.007.277-.038.465z" />
                        <path
                          fill-rule="evenodd"
                          d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.651 11.651 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.856.856 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.844.844 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.76 5.76 0 0 0-1.335-.05 10.954 10.954 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.238 1.238 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a19.697 19.697 0 0 1-1.062 2.227 7.662 7.662 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103z"
                        />
                      </svg>
                    </button>{" "}
                    <span> </span>
                    {/* cover feedback */}
                    <button
                      className="btn-sm"
                      style={{ display: "inline", border: "1px solid #279B14" }}
                      onClick = {() => {
                        props.history.push("/admin/customerfeedbacks/"+covers._id)
                      }}
                      // onClick={() => viewMoreCover(covers._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#279B14"
                        class="bi bi-chat-dots"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                        <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
                      </svg>
                    </button>
                    <span> </span>
                    {/* viewmore  */}
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
                    <span> </span>
                    {/* delete cover  */}
                    <button
                      className="btn-sm"
                      style={{
                        display: "inline",
                        border: "1px solid #D0193A",
                        marginTop: "2px",
                      }}
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
                      onFocus={() => setYoutubeLivePriview(false)}
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
                    <Select
                     // defaultValue={[instrumentsPlayedOn[0]]}
                      isMulti
                      name="colors"
                      options={instrumentsPlayedOn}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      required
                      placeholder = "Choose instruments"
                      onChange={(val) => {
                        setInstrument(val);
                      }}
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
                        for (let i = 0; i < e.target.files.length; i++) {
                          const newImage = e.target.files[i];
                          newImage["id"] = Math.random();
                          setPreviewPages((prevState) => [
                            ...prevState,
                            newImage,
                          ]);
                        }
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

      <Modal show={modalUploadOpen} size="lg">
        <Modal.Header></Modal.Header>

        <Modal.Body>
          <div className="container">
            <h1 style={{ color: "#764A34", textAlign: "center" }}>
              {progress}%
            </h1>
            <div class="progress">
              <div
                class="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <br />
            <h3 style={{ color: "#764A34", textAlign: "center" }}>
              {completedFiles} / {totalFiles}
            </h3>
            <h2 style={{ color: "#764A34", textAlign: "center" }}>
              {fileType}
            </h2>
          </div>
          <div class="d-flex justify-content-center">
            <div
              class="spinner-grow text-dark"
              role="status"
              hidden={completeCoverAddingStatus}
            >
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div className="text-center" hidden={finalDiv}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="#279B14"
              class="bi bi-check-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn rounded"
            onClick={() => {
              setModalUploadOpen(false);
            }}
            style={{ backgroundColor: "#D0193A", color: "#ffffff" }}
          >
            {cancelOrCloseBtn}
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalOpenForPdf} size="lg">
        <Modal.Header></Modal.Header>

        <Modal.Body>
          <div class="d-flex justify-content-center">
            <div class="spinner-grow text-dark" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <br />
          <h1 style={{ textAlign: "center", color: "#764A34" }}>
            Please wait!
          </h1>
          <h4 style={{ textAlign: "center", color: "#764A34" }}>
            PDF is Loading...
          </h4>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
