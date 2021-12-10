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
import Modal from "react-bootstrap/Modal";
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
  const [addToCartStatus, setAddToCartStatus] = useState(true);
  const [modalOpenForImage, setModalOpenForImage] = useState(false);
  const [customer, setCustomer] = useState([]);

  const [modalOpenForPdf, setModalOpenForPdf] = useState(false);
  const [modalOpenForFeedback, setModalOpenOfrFeedback] = useState(false);
  const [modalOpenForFeedbackUpdate, setModalOpenForFeedbackUpdate] =
    useState(false);
  const [feedback, setFeedback] = useState("");
  const [eFeedback, setEFeedback] = useState("");
  const [feedbackObject, setFeedbackObject] = useState("");

  const [feedbackSumitted, setFeedbackSubmitted] = useState(false);
  const [coverStauts, setCoverStatus] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const [userlogin,setUserlogin] = useState(false);
  const [requirementTxt,setRequirementTxt] = useState("");

  useEffect(() => {
    async function getCovers() {
      const CoverTempID = props.match.params.id;
      await axios
        .get(
          "https://kaushal-rashmika-music.herokuapp.com/covers/get/" +
            CoverTempID
        )
        .then((res) => {
          //console.log(res.data);
          if (res.data != null) {
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
            setButtons(res.data._id);
          } else {
            props.history.push("/notfound");
          }
        })
        .catch((err) => {
          // Swal.fire({
          //   icon: "error",
          //   title: "Oops...",
          //   text: "Something went wrong!",
          //   footer: '<p style = "color : #D0193A">Currently unavailable!',
          // });
          props.history.push("/notfound");

        });
    }

    async function getCustomerDetails() {
      if(localStorage.getItem("CustomerID")===null || sessionStorage.getItem('IsAuth') === null){
      }else{
        await axios
        .get(
          "https://kaushal-rashmika-music.herokuapp.com/customer/get/" +
            localStorage.getItem("CustomerID")
        )
        .then((res) => {
          setCustomer(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
      }
    
    }

    getCovers();
    getCustomerDetails();
  }, []);

  function setButtons(coverID) {
    if(localStorage.getItem("CustomerID") === null || sessionStorage.getItem('IsAuth') === null){
      setPurchased(false);
      setUserlogin(true);
      setCoverStatus(true);
      setRequirementTxt("Please login to your account to perform these tasks!")
    }else{
      axios
      .get(
        `https://kaushal-rashmika-music.herokuapp.com/customer/checkPurchaseCovers/${localStorage.getItem(
          "CustomerID"
        )}/${coverID}`
      )
      .then((res) => {
        if (res.data == true) {
          axios
            .get(
              `https://kaushal-rashmika-music.herokuapp.com/feedback/checkFeedBack/${localStorage.getItem(
                "CustomerID"
              )}/${coverID}`
            )
            .then((res) => {
              if (res.data == true) {
                setPurchased(true);
                setCoverStatus(true);
                setFeedbackSubmitted(true);
              } else if (res.data == false) {
                setPurchased(true);
                setCoverStatus(true);
                setFeedbackSubmitted(false);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (res.data == false) {
          setPurchased(false);
          setCoverStatus(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
   
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

  async function addToCart(id) {
    //alert(id);
    setAddToCartStatus(false);
    //let customerID = localStorage.getItem("CustomerID");
    let newItems = []; /// Change this later
    const customerID = localStorage.getItem("CustomerID");
    let coverIDs = [];
    let shoppingcartId = "";
    await axios
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

              setAddToCartStatus(true);

              //completedIncrements.push("#cart1");
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<p style = "color : #D0193A">Currently unavailable!',
              });
              setAddToCartStatus(true);
            });
        } else if (falgs === 1) {
          Swal.fire("Cover Already in Your shopping cart.");
          setAddToCartStatus(true);
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<p style = "color : #D0193A">Currently unavailable!',
        });
        setAddToCartStatus(true);
      });
  }

  async function displayImages(coverImageName, index) {
    if (recommenedCovers.length != 0) {
      const storageRef = ref(storage, `PreviewImages/${coverImageName}`);
      await getDownloadURL(storageRef)
        .then((url) => {
          document.getElementById(index).src = url;
         // document.getElementById("temp" + index).hidden = true;
          //document.getElementById(index).hidden = false;
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

  function previewImg(PreviewPages) {
    setModalOpenForImage(true);
    const storageRef = ref(storage, `PreviewImages/${PreviewPages}`);
    getDownloadURL(storageRef)
      .then((url) => {
        window.location.href = url;
        setModalOpenForImage(false);
      })
      .catch(() => {
        setModalOpenForImage(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  }

  async function previewPdf(covername) {
    setModalOpenForPdf(true);
    const storageRef = ref(storage, `Covers(PDF)/${covername}`);
    await getDownloadURL(storageRef)
      .then((url) => {
        window.open(
          url,
          "_blank" // <- This is what makes it open in a new window.
        );
        setModalOpenForPdf(false);
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
  function purchasingProcess() {
    // Put the payment variables here
    var payment = {
      // whether it is a testing environment or not
      sandbox: true,
      merchant_id: "1219390", // Replace your Merchant ID
      return_url: undefined, // Important
      cancel_url: undefined, // Important
      notify_url: "http://sample.com/notify",
      order_id: "KRP" + new Date().valueOf(),
      items: covers.Title,
      amount: covers.Price,
      currency: "USD",
      first_name: customer.FirstName,
      last_name: customer.LastName,
      email: customer.Email,
      phone: customer.ContactNumber,
      address: "",
      city: "",
      country: customer.Country,
      delivery_address: "",
      delivery_city: "",
      delivery_country: "",
      custom_1: "",
      custom_2: "",
    };

    // Show the payhere.js popup, when "PayHere Pay" is clicked

    window.payhere.startPayment(payment);
  }

  // Called when user completed the payment.

  //It can be a successful payment or failure (problem)
  window.payhere.onCompleted = function onCompleted(orderId) {
    postOrder(orderId);

    //Note: validate the payment and show success or failure page to the customer
  };

  // Called when error happens when initializing payment such as invalid parameters
  window.payhere.onError = function onError(error) {
    // Note: show an error page
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  };

  // Called when user closes the payment without completing
  window.payhere.onDismissed = function onDismissed() {
    //Note: Prompt user to pay again or show an error page
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Payment dismissed!",
    });
  };

  async function postOrder(orderID) {
    const newOrder = {
      CoverIDs: [covers._id],
      CustomerID: customer._id,
      TotalPrice: covers.Price,
      ReferenceNo: orderID,
    };

    // console.log(newOrder);
    await axios
      .post("https://kaushal-rashmika-music.herokuapp.com/order/addOrder", newOrder)
      .then((res) => {
        let purchasedcovers = customer.PurchasedCovers;
        purchasedcovers.push(covers._id);
        const newPurchasedCovers = {
          PurchasedCovers: purchasedcovers,
        };
        // console.log(newPurchasedCovers);
        axios
          .put(
            "https://kaushal-rashmika-music.herokuapp.com/customer/addPurchasedCover/" +
              localStorage.getItem("CustomerID"),
            newPurchasedCovers
          )
          .then((res) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Thank you for your purchase",
              showConfirmButton: false,
              timer: 1500,
            });
            setPurchased(true);

            // increment noofdownloads by one
            axios
              .put(`https://kaushal-rashmika-music.herokuapp.com/covers/incrementCount/${covers._id}`)
              .then((res) => {
               
              })
              .catch((err) => {
              console.log(err);
              });

            axios
              .get(
                `https://kaushal-rashmika-music.herokuapp.com/shoppingCart/checkCartItem/${localStorage.getItem(
                  "CustomerID"
                )}/${covers._id}`
              )
              .then((res) => {
                if (res.data) {
                  // delete item from the cart
                  axios
                    .delete(
                      `https://kaushal-rashmika-music.herokuapp.com/shoppingCart/deleteCartCover/${covers._id}/` +
                        localStorage.getItem("CustomerID")
                    )
                    .then((res) => {
                      let count = parseInt($("#countHolder").text());
                      $("#countHolder").html(count - 1);
                      //alert("ss")
                      //console.log(res.data);
                    })
                    .catch((err) => {
                      // alert("gg");
                      console.log(err)
                    });
                } else {
                }
              })
              .catch((err) => {});
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

  async function submitFeedBack(e) {
    e.preventDefault();

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const CustomerID = localStorage.getItem("CustomerID");
        const newFeedBack = {
          Comment: feedback,
          CustomerID: CustomerID,
          CoverID: covers._id,
        };
        axios
          .post("https://kaushal-rashmika-music.herokuapp.com/feedback/addFeedback", newFeedBack)
          .then((res) => {
            setFeedbackSubmitted(true);
            setModalOpenOfrFeedback(false);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your feedback has been saved",
              showConfirmButton: false,
              timer: 1500,
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
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  function updateFeedBack(e) {
    e.preventDefault();

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const feedbackID = feedbackObject._id;

        const updatedFeedBack = {
          Comment: eFeedback,
          CustomerID: localStorage.getItem("CustomerID"),
          CoverID: covers._id,
        };
        axios
          .put(
            "https://kaushal-rashmika-music.herokuapp.com/feedback//updateFeedback/" + feedbackID,
            updatedFeedBack
          )
          .then((res) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your feedback has been updated",
              showConfirmButton: false,
              timer: 1500,
            });

            setModalOpenForFeedbackUpdate(false);
          })

          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: '<p style = "color : #D0193A">Currently unavailable!',
            });
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  function getFeedBack(coverID) {
    //const CustomerID = localStorage.getItem("CustomerID");
    axios
      .get(
        `https://kaushal-rashmika-music.herokuapp.com/feedback/getOneFeedBack/${localStorage.getItem(
          "CustomerID"
        )}/${coverID}`
      )
      .then((res) => {
        setFeedbackObject(res.data);
        setEFeedback(res.data.Comment);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteFeedback() {
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
          axios
            .delete(
              "https://kaushal-rashmika-music.herokuapp.com/feedback/deleteFeedback/" +
                feedbackObject._id
            )
            .then((res) => {
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your feedback has been deleted.",
                "success"
              );
              setFeedbackSubmitted(false);
              setModalOpenForFeedbackUpdate(false);
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your feedback is safe :)",
            "error"
          );
        }
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
                  <div
                    id="img"
                    onClick={() => {
                      previewImg(covers.PreviewPages[0]);
                    }}
                  ></div>

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
                    target = "_blank"
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
                  <div className="d-flex justify-content-center">
                    <div
                      class="spinner-border"
                      role="status"
                      hidden={coverStauts}
                    >
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                  <br />
                  <div hidden={!coverStauts}>
                    <div hidden={purchased}>
                      <button
                        type="button"
                        disabled = {userlogin}
                        class="btn btn-success btn-block rounded"
                        onClick={() => addToCart(covers._id)}
                      >
                        Add to cart
                      </button>
                      <br />
                      <br />
                      <div className="d-flex justify-content-center">
                        <div
                          class="spinner-border text-success"
                          role="status"
                          hidden={addToCartStatus}
                        >
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div>
                      <br />
                      <div className="container-sm">
                        {/* directly going to the payment gateway */}
                        <button
                          type="button"
                          disabled = {userlogin}
                          id="payhere-payment"
                          class="btn btn-success btn-block rounded"
                          onClick={purchasingProcess}
                        >
                          Buy it now
                        </button>
                      </div>
                      <br/>
                      <p style = {{textAlign : "center",color : "#D0193A"}}><b>{requirementTxt}</b></p>
                    </div>

                    {/* feedback and preview  */}

                    <div hidden={!purchased}>
                      <button
                        type="button"
                        hidden={feedbackSumitted}
                        class="btn btn-success btn-block rounded"
                        onClick={() => {
                          setModalOpenOfrFeedback(true);
                        }}
                      >
                        send feedback
                      </button>
                      <button
                        type="button"
                        hidden={!feedbackSumitted}
                        class="btn btn-success btn-block rounded"
                        onClick={() => {
                          setModalOpenForFeedbackUpdate(true);
                          getFeedBack(covers._id);
                        }}
                      >
                        View my Feedback
                      </button>
                      <br />
                      <br />
                      {/* <div className="d-flex justify-content-center">
                      <div
                        class="spinner-border text-success"
                        role="status"
                        hidden={addToCartStatus}
                      >
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div> */}
                      <br />
                      <div className="container-sm">
                        {/* directly going to the pdf previewer */}
                        <button
                          type="button"
                          id="preview"
                          style={{ backgroundColor: "#D0193A", color: "#ffff" }}
                          class="btn btn-block rounded"
                          onClick={() => previewPdf(covers.CoverPdf)}
                        >
                          preview
                        </button>
                      </div>
                    </div>
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
                  {/* <img
                    id={"temp" + index}
                    src={"/images/imageplaceholder.png"}
                    class="card-img-top"
                    alt="..."
                    style={{
                      borderRadius: "15px 15px 0px 0px",
                      height: "350px",
                    }}
                  /> */}
                  <img
                    id={index}
                    src={displayImages(covers.PreviewPages[0], index) || "/images/imageplaceholder.png"}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/imageplaceholder.png";
                    }}
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

          <Modal show={modalOpenForImage} size="lg">
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
                Image is Loading...
              </h4>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </div>
      </div>
      {/* pdf loading modal  */}
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
      {/* feedback submission modal  */}
      <Modal show={modalOpenForFeedback} size="lg">
        <Modal.Header></Modal.Header>

        <Modal.Body>
          <div class="d-flex justify-content-center">
            <h2>Leave us a feedback</h2>
            <br />
          </div>
          <div>
            <form onSubmit={submitFeedBack}>
              <div class="form-group">
                {/* <label for="exampleInput1">Email address</label> */}
                <input
                  type="text"
                  onChange={(e) => {
                    setFeedback(e.target.value);
                  }}
                  required
                  class="form-control"
                  placeholder="Your feedback..."
                />
              </div>
              <div class="d-flex justify-content-center">
                <button
                  type="submit"
                  class="btn rounded"
                  style={{ color: "#ffffff", backgroundColor: "#764A34" }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  class="btn rounded"
                  style={{ color: "#ffffff", backgroundColor: "#D0193A" }}
                  onClick={() => {
                    setModalOpenOfrFeedback(false);
                  }}
                >
                  cancel
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      {/* feedback update and delete modal  */}
      <Modal show={modalOpenForFeedbackUpdate} size="lg">
        <Modal.Header></Modal.Header>

        <Modal.Body>
          <div class="d-flex justify-content-center">
            <h2>My feedback</h2>
            <br />
          </div>
          <div>
            <form onSubmit={updateFeedBack}>
              <div class="form-group">
                {/* <label for="exampleInput1">Email address</label> */}
                <input
                  type="text"
                  Value={eFeedback}
                  onChange={(e) => {
                    setEFeedback(e.target.value);
                  }}
                  required
                  class="form-control"
                  placeholder="Your feedback..."
                />
              </div>
              <div class="d-flex justify-content-center">
                <button
                  type="submit"
                  class="btn rounded"
                  style={{ color: "#ffffff", backgroundColor: "#764A34" }}
                >
                  Update
                </button>
                <button
                  type="button"
                  class="btn rounded"
                  style={{ color: "#ffffff", backgroundColor: "#D0193A" }}
                  onClick={() => {
                    deleteFeedback();
                  }}
                >
                  Delete
                </button>
                <button
                  type="button"
                  class="btn rounded"
                  style={{ color: "#ffffff", backgroundColor: "#D0193A" }}
                  onClick={() => {
                    setModalOpenForFeedbackUpdate(false);
                  }}
                >
                  cancel
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
