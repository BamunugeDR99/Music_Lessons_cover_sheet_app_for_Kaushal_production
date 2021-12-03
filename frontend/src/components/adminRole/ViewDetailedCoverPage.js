import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrencySelect from "./CurrencySelect";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
// import { useLocation } from "react-router-dom";
import { storage } from "../../Configurations/firebaseConfigurations";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import Select from "react-select";

export default function ViewDetailedCoverPage(props) {
  const [covers, setCovers] = useState([]);
  const [modalOpen3, setModalOpen3] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUploadOpen, setModalUploadOpen] = useState(false);
  const [progress, setProgress] = useState("");
  let preview = [];
  let instrumentsTxt = "";
  let MainCategoryForRec = "";
  let SubCategoryForRec = "";


  //   for update
  //const [covers, setCovers] = useState([]);
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
  const [previewPages, setPreviewPages] = useState("");
  const [coverPDF, setCoverPDF] = useState("");
  const [originalArtist, setOriginalArtist] = useState("");
  const [arrangedBy, setArranngedBy] = useState("kaushal Rashmika");

  const [youtubeLivePreview, setYoutubeLivePriview] = useState(true);
  const [lessonSubCategories, setLessonSubCategories] = useState([]);
  const [subCategoryPreview, setSubCategoryPreview] = useState(false);
  const [subCategoryPreview2, setSubCategoryPreview2] = useState(false);
  // for uploading modal
  const [fileType, setFileType] = useState("");
  const [completedFiles, setCompletedFiles] = useState("0");
  const [totalFiles, setTotalFiles] = useState("");
  const [completeCoverAddingStatus, setCoverAddingStatus] = useState(true);
  const [cancelOrCloseBtn, setCancelOrCloseBtn] = useState("Close");
  const [finalDiv, setFinalDiv] = useState(true);
  const [modalOpenForPdf, setModalOpenForPdf] = useState(false);

  const [cover, setCover] = useState([]);
  let tempMainCategoryStore = "";
  let tempSubCategoryStore = "";
  let tempPdf = "";
  let tempCoverImages = [];
  let CoverTempID = props.match.params.id;

  const [dropMainCategory, setDropMainCategory] = useState("");
  const [dropSubCategory, setDropSubCategory] = useState("");

  const instrumentsPlayedOn = [
    { value: "Classical Guitar", label: "Classical Guitar" },
    { value: "Piano", label: "Piano" },
    { value: "Ukulele", label: "Ukulele" },
    { value: "Acoustic Guitar", label: "Acoustic Guitar" },
  ];

  useEffect(() => {
    function getCovers() {
      axios
        .get("https://kaushal-rashmika-music.herokuapp.com/covers/get/" + CoverTempID)
        .then((res) => {
          setCovers(res.data);
          setPreviousContent(res.data);
          preview = res.data.PreviewPages;
          printInstruments(res.data.InstrumentsPlayedOn);
          displayPreviewImageSlider(res.data.PreviewPages);
          MainCategoryForRec = res.data.MainCategory;
          SubCategoryForRec = res.data.SubCategory;
          setYoutubeLink(res.data.YoutubeLink);
          //setInstrument(res.data.InstrumentsPlayedOn);
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

    getCovers();
  }, []);

  function setPreviousContent(content) {
    //console.log(content);
    tempCoverImages = content.PreviewPages;
    tempPdf = content.CoverPdf;

    //console.log(tempCoverImages,tempPdf,tempInstruments)
  }
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
      document.getElementById("img" + i).src = "/images/Imageplaceholder.png";
    }
    previewImages.map((previewImage, index) => {
      const storageRef = ref(storage, `PreviewImages/${previewImage}`);
      getDownloadURL(storageRef).then((url) => {
        document.getElementById("img" + index).src = url;
      });
    });
  }

  function youtubeLinkDefaultPreview() {
    if (youtubeLink.toLowerCase().includes("https://www.youtube.com/embed/")) {
      return youtubeLink;
    } else {
      return "https://www.youtube.com/embed/";
    }
  }
  function setContent() {
    setSubCategories(tempSubCategory);
    setLessonSubCategories(tempSubCategory2);
    // console.log(MainCategoryForRec);
    // console.log(SubCategoryForRec);

    // setA(MainCategoryForRec);
    // setB(SubCategoryForRec)
    // document.getElementById("MainCategory").value = MainCategoryForRec;
    setDropMainCategory(MainCategoryForRec);
    if (MainCategoryForRec === "Classical Guitar Covers") {
      // document.getElementById("subCategory1").value = SubCategoryForRec;
      setDropSubCategory(SubCategoryForRec);
      setSubCategoryPreview(false);
      setSubCategoryPreview2(true);
      //console.log("a")
    } else if (MainCategoryForRec === "Guitar Technics & Lessons") {
      setDropSubCategory(SubCategoryForRec);
      setSubCategoryPreview(true);
      setSubCategoryPreview2(false);
      //document.getElementById("subCategory2").value = SubCategoryForRec;
    }
  }

  function GetLessonSubCategories() {
    axios
      .get("https://kaushal-rashmika-music.herokuapp.com/mainCategory/get/619deb0ca35d670b4e68ec3e")
      .then((res) => {
        tempSubCategory2 = res.data.SubCategories;
        setContent();
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
  function getAllClassicalGutarMainCategories() {
    axios
      .get("https://kaushal-rashmika-music.herokuapp.com/mainCategory/get/61936e9d9ea7c21aebd01113")
      .then((res) => {
        tempSubCategory = res.data.SubCategories;
        GetLessonSubCategories();
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

  function UploadPdf(
    updateCoverPdf,
    InstrumentArray,
    previewPageList,
    dynamicSubCategory
  ) {
    setFileType("Uploading Pdf file");
    setModalUploadOpen(true);
    setModalOpen2(true);
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
          //setCompletedFiles("1");
          //UploadImages();
          setModalUploadOpen(false);
          const updatedCover = {
            Title: document.getElementById("songName").value,
            OriginalArtistName: document.getElementById("originalArtist").value,
            InstrumentsPlayedOn: InstrumentArray,
            ArrangedBy: arrangedBy,
            SubCategory: dynamicSubCategory,
            MainCategory: document.getElementById("MainCategory").value,
            NoOfPages: document.getElementById("noOfPages").value,
            NoOfPreviewPages: previewPageList.length,
            Price: document.getElementById("price").value,
            YoutubeLink: document.getElementById("youtubeLink").value,
            FacebookLink: document.getElementById("facebookLink").value,
            PreviewPages: previewPageList,
            CoverPdf: updateCoverPdf,
          };

          axios
            .put(
              "https://kaushal-rashmika-music.herokuapp.com/covers/update/" + CoverTempID,
              updatedCover
            )
            .then(() => {
              Swal.fire("Updated!", "Your cover has been updated.", "success");
              getCovers();
            })
            .catch((err) => {
              alert(err);
            });
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
  async function UploadImages(
    updateCoverPdf,
    InstrumentArray,
    previewPageList,
    dynamicSubCategory
  ) {
    setFileType("Uploading Preview Images");
    setModalUploadOpen(true);
    setModalOpen2(true);
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
            //setCompletedFiles(index+2);
          } else {
          }
        },
        (error) => {
          console.log(error);
        }
      );
    });

    Promise.all(promises)
      .then(() => {
        setModalUploadOpen(false);
        const updatedCover = {
          Title: document.getElementById("songName").value,
          OriginalArtistName: document.getElementById("originalArtist").value,
          InstrumentsPlayedOn: InstrumentArray,
          ArrangedBy: arrangedBy,
          SubCategory: dynamicSubCategory,
          MainCategory: document.getElementById("MainCategory").value,
          NoOfPages: document.getElementById("noOfPages").value,
          NoOfPreviewPages: previewPageList.length,
          Price: document.getElementById("price").value,
          YoutubeLink: document.getElementById("youtubeLink").value,
          FacebookLink: document.getElementById("facebookLink").value,
          PreviewPages: previewPageList,
          CoverPdf: updateCoverPdf,
        };

        axios
          .put(
            "https://kaushal-rashmika-music.herokuapp.com/covers/update/" + CoverTempID,
            updatedCover
          )
          .then(() => {
            Swal.fire("Updated!", "Your cover has been updated.", "success");
            getCovers();
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch(() => {
        alert("error");
      });
  }
  function uploadBoth(
    updateCoverPdf,
    InstrumentArray,
    previewPageList,
    dynamicSubCategory
  ) {
    setFileType("Uploading Pdf file");
    setModalUploadOpen(true);
    setModalOpen2(true);
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
          UploadImages(
            updateCoverPdf,
            InstrumentArray,
            previewPageList,
            dynamicSubCategory
          );
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
  }

  function update(e) {
    e.preventDefault();
    let updateCoverPdf = "";

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Do you want to update the cover ?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, update it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          let dynamicSubCategory = "";
          let previewPageList = [];
          if (
            document.getElementById("MainCategory").value ===
            String("Guitar Technics & Lessons")
          ) {
            dynamicSubCategory = document.getElementById("subCategory2").value;
          } else if (
            document.getElementById("MainCategory").value ===
            String("Classical Guitar Covers")
          ) {
            dynamicSubCategory = document.getElementById("subCategory1").value;
          }
          let InstrumentArray = [];

          if (instruments.length == 0) {
            InstrumentArray = document
              .getElementById("Instruments")
              .value.split(",");
          } else {
            for (let i = 0; i < instruments.length; i++) {
              InstrumentArray.push(instruments[i].value);
            }
          }

          if (
            previewPages.length === 0 &&
            document.getElementById("pdffile").files.length === 0
          ) {
            previewPageList = document
              .getElementById("PSampleImages")
              .value.split(",");
            updateCoverPdf = document.getElementById("tPdfFile").value;

            const updatedCover = {
              Title: document.getElementById("songName").value,
              OriginalArtistName:
                document.getElementById("originalArtist").value,
              InstrumentsPlayedOn: InstrumentArray,
              ArrangedBy: arrangedBy,
              SubCategory: dynamicSubCategory,
              MainCategory: document.getElementById("MainCategory").value,
              NoOfPages: document.getElementById("noOfPages").value,
              NoOfPreviewPages: previewPageList.length,
              Price: document.getElementById("price").value,
              YoutubeLink: document.getElementById("youtubeLink").value,
              FacebookLink: document.getElementById("facebookLink").value,
              PreviewPages: previewPageList,
              CoverPdf: updateCoverPdf,
            };
            console.log(updatedCover);
            axios
              .put(
                "https://kaushal-rashmika-music.herokuapp.com/covers/update/" + CoverTempID,
                updatedCover
              )
              .then(() => {
                swalWithBootstrapButtons.fire(
                  "Updated!",
                  "Your cover has been updated.",
                  "success"
                );
                getCovers();
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
            previewPages.length != 0 &&
            document.getElementById("pdffile").files.length === 0
          ) {
            for (let i = 0; i < previewPages.length; i++) {
              previewPageList.push(previewPages[i].name);
            }
            updateCoverPdf = document.getElementById("tPdfFile").value;
            UploadImages(
              updateCoverPdf,
              InstrumentArray,
              previewPageList,
              dynamicSubCategory
            );
          } else if (
            previewPages.length === 0 &&
            document.getElementById("pdffile").files.length != 0
          ) {
            updateCoverPdf = coverPDF[0].name;
            previewPageList = document
              .getElementById("PSampleImages")
              .value.split(",");
            UploadPdf(
              updateCoverPdf,
              InstrumentArray,
              previewPageList,
              dynamicSubCategory
            );
          } else if (
            previewPages.length != 0 &&
            document.getElementById("pdffile").files.length != 0
          ) {
            updateCoverPdf = coverPDF[0].name;
            for (let i = 0; i < previewPages.length; i++) {
              previewPageList.push(previewPages[i].name);
            }
            uploadBoth(
              updateCoverPdf,
              InstrumentArray,
              previewPageList,
              dynamicSubCategory
            );
          }
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

  function getCovers() {
    axios
      .get("https://kaushal-rashmika-music.herokuapp.com/covers/get/" + CoverTempID)
      .then((res) => {
        setCovers(res.data);
        setPreviousContent(res.data);
        //setContent(res.data);
        preview = res.data.PreviewPages;
        printInstruments(res.data.InstrumentsPlayedOn);
        displayPreviewImageSlider(res.data.PreviewPages);
        MainCategoryForRec = res.data.MainCategory;
        SubCategoryForRec = res.data.SubCategory;
        setYoutubeLink(res.data.YoutubeLink);
        //setInstrument(res.data.InstrumentsPlayedOn);
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

  function previewPdf(pdfName) {
    setModalOpenForPdf(true);
    const storageRef = ref(storage, `Covers(PDF)/${pdfName}`);
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
                <h5
                  style={{
                    display: "inline",
                    color: "#764A34",
                    letterSpacing: "2px",
                  }}
                >
                  No of downloads:{" "}
                </h5>{" "}
                <h5 style={{ display: "inline" }}>{covers.NoOfDownloads}</h5>
                <br />
                <br />
                <h5
                  style={{
                    display: "inline",
                    color: "#764A34",
                    letterSpacing: "2px",
                  }}
                >
                  Recently Updated date and time:{" "}
                </h5>{" "}
                <br />
                <h5 style={{ display: "inline" }}>
                  {covers.UpdatedDateAndTime}
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
                  <div className="text-center">
                    <button
                      type="button"
                      class="btn btn-success rounded"
                      onClick={() => {
                        setModalOpen2(true);
                        setPreviewPages("");
                      }}
                    >
                      Edit Cover
                    </button>
                    <br />
                    <div className="container-sm">
                      <button
                        type="button"
                        onClick={() => previewPdf(covers.CoverPdf)}
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
                      onClick={() => {
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
      {/* youtube video modal  */}
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

      {/* update form modal */}
      <Modal show={modalOpen2} size="lg">
        <form onSubmit={update}>
          <Modal.Header>
            <h4>Edit Cover/Excercise</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setModalOpen2(false);
                //getCovers()
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
                      id="songName"
                      Value={covers.Title}
                      onChange={(e) => {
                        setSongName(e.target.value);
                      }}
                      required
                    />
                    <br />
                    <label for="exampleInputMainCategory">Main Category</label>
                    <select
                      required
                      value={dropMainCategory}
                      className="form-control"
                      onChange={(e) => {
                        if (subCategoryPreview == true) {
                          setSubCategoryPreview(false);
                          setDropMainCategory(e.target.value);
                          setSubCategoryPreview2(true);
                        } else {
                          setDropMainCategory(e.target.value);
                          setSubCategoryPreview(true);
                          setSubCategoryPreview2(false);
                        }
                      }}
                      id="MainCategory"
                      name="category"
                    >
                      <option value="Classical Guitar Covers">
                        Classical Guitar Covers
                      </option>
                      <option value="Guitar Technics & Lessons">
                        Guitar Technics & Lessons
                      </option>
                    </select>
                    <br />
                    <label for="exampleInputEmail1">YouTube Link*</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="YouTube Link"
                      Value={covers.YoutubeLink}
                      id="youtubeLink"
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
                      <b>Enter the youtube embed url link</b>
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
                      accept="application/pdf"
                      onChange={(e) => {
                        setCoverPDF(e.target.files);
                      }}
                    />
                    <input
                      type="text"
                      id="tPdfFile"
                      Value={covers.CoverPdf}
                      hidden
                    />

                    <p style={{ color: "#D0193A " }}>
                      <b>Previous Pdf file will remain if you didn't update</b>
                    </p>

                    <label for="exampleInputEmail1">No of Pages*</label>
                    <input
                      type="number"
                      name="noOfPages"
                      id="noOfPages"
                      Value={covers.NoOfPages}
                      class="form-control form-control-sm"
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
                      Value={covers.ArrangedBy}
                      class="form-control form-control-sm"
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
                      //value={[instrumentsPlayedOn[0]]}
                      isMulti
                      name="colors"
                      options={instrumentsPlayedOn}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      required
                      placeholder="Choose instruments"
                      onChange={(val) => {
                        setInstrument(val);
                      }}
                    />
                    <br />
                    <input
                      type="text"
                      class="form-control"
                      id="Instruments"
                      Value={covers.InstrumentsPlayedOn}
                      placeholder="Instrument Exp : (Guitar,Piano)"
                      readOnly
                    />

                    <br />
                    <label for="exampleInputEmail1">Sub Category</label>
                    <select
                      value={dropSubCategory}
                      hidden={subCategoryPreview}
                      className="form-control"
                      id="subCategory1"
                      name="subCategory"
                      onChange={(e) => {
                        setDropSubCategory(e.target.value);
                      }}
                      required
                    >
                      {SubCategories.map((sub) => {
                        return <option value={sub}>{sub}</option>;
                      })}
                    </select>
                    <select
                      value={dropSubCategory}
                      hidden={!subCategoryPreview}
                      className="form-control"
                      id="subCategory2"
                      name="subCategory"
                      onChange={(e) => {
                        setDropSubCategory(e.target.value);
                      }}
                      required
                    >
                      {lessonSubCategories.map((sub) => {
                        return <option value={sub}>{sub}</option>;
                      })}
                    </select>
                    <br />
                    <label for="exampleInputEmail1">Facebook Link*</label>
                    <input
                      type="text"
                      Value={covers.FacebookLink}
                      class="form-control"
                      id="facebookLink"
                      onChange={(e) => {
                        setFacebookLink(e.target.value);
                      }}
                      placeholder="Facebook Link*"
                    />
                    <p style={{ color: "#ffba01" }}>
                      <b>Enter the facebook page link</b>
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
                    />
                    <input
                      type="text"
                      Value={covers.PreviewPages}
                      id="PSampleImages"
                      hidden
                    />
                    <p style={{ color: "#D0193A " }}>
                      <b>Previous images will remain if you didn't update</b>
                    </p>

                    <label for="exampleInputEmail1">Price*</label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      Value={covers.Price}
                      class="form-control form-control-sm"
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
                      Value={covers.OriginalArtistName}
                      class="form-control form-control-sm"
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
            {/* <h3 style={{ color: "#764A34", textAlign: "center" }}>
              {completedFiles} / {totalFiles}
                  </h3>*/}
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
          {/* <button
            className="btn rounded"
            onClick={() => {
              setModalUploadOpen(false);
            }}
            style={{ backgroundColor: "#D0193A", color: "#ffffff" }}
          >
            {cancelOrCloseBtn}
          </button> */}
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
