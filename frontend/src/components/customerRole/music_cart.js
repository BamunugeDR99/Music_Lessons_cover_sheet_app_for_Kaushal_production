import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { storage } from "../../Configurations/firebaseConfigurations";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";

export default function MusicCart(props) {
  let [cartCovers, setCovers] = useState([]);
  let [total, setTotal] = useState("");
  let [emptyText, setEmptyText] = useState("");
  let [dataholder, setDataholder] = useState([]);
  let [coverNames, setCoverNames] = useState("");
  const [customer, setCustomer] = useState([]);
  let [coverIdArray, setCoverIdArray] = useState([]);

  let status = 0;
  let tot = 0;
  let coverdetails = [];
  let covers = "";
  let coverids = [];

  let price = "";
  let title = "";
  let author = "";
  let id = "";
  let images = [];
  let customerID = 1;
  let cover = {
    id,
    price,
    title,
    author,
    images,
  };

  useEffect(async () => {
 
    document.getElementById("spinnerdiv").style.display = "block";
    document.getElementById("cartdiv").style.display = "none";
    setTotal("Loading...");
    await axios
      .get(
        "https://kaushal-rashmika-music.herokuapp.com/shoppingCart/getOneCart/" +
          localStorage.getItem("CustomerID")
      )
      .then((res) => {
        // console.log(res.data.CoverIDs);
        if (res.data.CoverIDs != "") {
          setDataholder(res.data.CoverIDs);
          // console.log(res.data);
          setTotal("Loading...");
          callData(res.data.CoverIDs);
        } else {
          document.getElementById("spinnerdiv").style.display = "none";
          document.getElementById("cartdiv").style.display = "block";
          setTotal("0");
          setEmptyText("No covers Available In the cart");
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

    async function getCustomerDetails() {
      await axios
        .get(
          "https://kaushal-rashmika-music.herokuapp.com/customer/get/" +
            localStorage.getItem("CustomerID")
        )
        .then((res) => {
          setCustomer(res.data);
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

    getCustomerDetails();
  }, []);

  async function callData(data) {
    // console.log(data.length);
    // console.log(data);

    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        await axios
          .get(`https://kaushal-rashmika-music.herokuapp.com/covers/getcoverbyid/${data[i]}`)
          .then((res) => {
            // console.log("asd")
            if (covers == "") {
              covers = covers + res.data[0].Title;
            } else {
              covers = covers + ", " + res.data[0].Title;
            }
            coverids.push(res.data[0]._id);
            cover = {
              price: res.data[0].Price,
              title: res.data[0].Title,
              id: res.data[0]._id,
              author: res.data[0].OriginalArtistName,
              images: res.data[0].PreviewPages,
            };

            tot = Number(tot) + Number(res.data[0].Price);
            coverdetails.push(cover);
            // console.log(cover);
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
      console.log(coverids);
      setCoverIdArray(coverids);
      setCoverNames(covers);
      setCartItems();
      // console.log(coverdetails);
      setCovers(coverdetails);
      document.getElementById("spinnerdiv").style.display = "none";
      document.getElementById("cartdiv").style.display = "block";
    } else {
      setCovers([]);
    }

    setTotal(tot);
  }

  function setCartItems() {
    axios

      .get(
        "https://kaushal-rashmika-music.herokuapp.com/shoppingCart/getOneCart/" +
          localStorage.getItem("CustomerID")
      )

      .then((res) => {
        document.getElementById("countHolder").innerHTML =
          res.data.CoverIDs.length;
      })

      .catch((err) => {
        Swal.fire({
          icon: "error",

          title: "Oops...",

          text: "Somethi went wrong!",

          footer: '<p style = "color : #D0193A">Currently unavailable!',
        });
      });
  }
  function removeBtn(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://kaushal-rashmika-music.herokuapp.com/shoppingCart/deleteCartCover/${id}/` +
              localStorage.getItem("CustomerID")
          )
          .then((res) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Cover has been deleted successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            document.getElementById("spinnerdiv").style.display = "block";
            document.getElementById("cartdiv").style.display = "none";
            setTotal("Loading...");
            axios
              .get(
                "https://kaushal-rashmika-music.herokuapp.com/shoppingCart/getOneCart/" +
                  localStorage.getItem("CustomerID")
              )
              .then((res) => {
                // console.log(res.data.CoverIDs);
                if (res.data.CoverIDs != "") {
                  setDataholder(res.data.CoverIDs);
                  // console.log(res.data);
                  setTotal("Loading...");
                  callData(res.data.CoverIDs);
                } else {
                  setDataholder("");
                  callData("");
                  document.getElementById("spinnerdiv").style.display = "none";
                  document.getElementById("cartdiv").style.display = "block";
                  setTotal("0");
                  setEmptyText("No covers Available In the cart");
                }
                setCartItems();
              })
              .catch((err) => {
                alert(err.message);
              });
          })
          .catch((err) => {
            alert(err.message);
          });
      }
    });
  }

  async function displayImages(coverImageName, index) {
    // console.log(coverImageName);
    // console.log(index);
    const storageRef = ref(storage, `PreviewImages/${coverImageName}`);
    await getDownloadURL(storageRef)
      .then((url) => {
        document.getElementById(index).src = url;
       // document.getElementById("temp" + index).hidden = true;
        //document.getElementById(index).hidden = false;
      })
      .catch((err) => {
        // ErrorhandlingTxt("Reccomended covers are not available right now!");
      });
  }

  async function completePayment(tot) {
    console.log(coverNames);
    console.log(tot);
    var payment = {
      // whether it is a testing environment or not
      sandbox: true,
      merchant_id: "1219390", // Replace your Merchant ID
      return_url: undefined, // Important
      cancel_url: undefined, // Important
      notify_url: "http://sample.com/notify",
      order_id: "KRP" + new Date().valueOf(),
      items: coverNames,
      amount: tot,
      currency: "USD",
      first_name: customer.FirstName,
      last_name: customer.LastName,
      email: "asdasd@gmail.com",
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

  async function postOrder(orderID) {
    const newOrder = {
      CoverIDs: coverIdArray,
      CustomerID: customer._id,
      TotalPrice: total,
      ReferenceNo: orderID,
    };

    // console.log(newOrder);
    await axios
      .post("https://kaushal-rashmika-music.herokuapp.com/order/addOrder", newOrder)
      .then((res) => {
        let purchasedcovers = customer.PurchasedCovers;
        console.log(purchasedcovers);
        for (let l = 0; l < coverIdArray.length; l++) {
          purchasedcovers.push(coverIdArray[l]);
          console.log(coverIdArray[l]);
        }
        const newPurchasedCovers = {
          PurchasedCovers: purchasedcovers,
        };
        // alert(newPurchasedCovers);
        console.log(newPurchasedCovers);
        axios
          .put(
            "https://kaushal-rashmika-music.herokuapp.com/customer/addPurchasedCover/61acc2662c5b9bd04724313e",
            newPurchasedCovers
          )
          .then((res) => {
            // alert("ssuccess");
            axios
              .put(
                "https://kaushal-rashmika-music.herokuapp.com/shoppingCart/updateCartCovers/" +
                  localStorage.getItem("CustomerID")
              )
              .then((res) => {
                incrementCover();

                // setPurchased(true);
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
  function incrementCover() {
    for (let k = 0; k < coverIdArray.length; k++) {
      axios
        .put(`https://kaushal-rashmika-music.herokuapp.com/covers/incrementCount/${coverIdArray[k]}`)
        .then((res) => {
          Swal.fire({
            title: "Successfully Deleted!",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok!",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload(true);
            }
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
  }

  return (
    <div className="container">
      <div
        style={{ alignContent: "center" }}
        className="d-flex justify-content-center mt-2"
      >
        <h2
          class="mb-4"
          style={{
            alignContent: "center",
            fontWeight: "bold",
            color: "#764A34",
          }}
        >
          My Shopping Carts
        </h2>
      </div>

      <br />
      <div class="row" style={{marginBottom:"77px"}}>
        <div id="spinnerdiv" class="col-lg-8 " style={{ display: "block" }}>
          <center>
            <div class=" justify-content-center">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </center>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
        <div
          class="col-lg-8"
          id="cartdiv"
          style={{
            overflowY: "scroll",
            height:"680px",
            overflow:"auto",
            overflowY:"hidden",
            display: "none",

          }}
        >
          <div>
            <center>
              <h4 style={{ color: "red" }}>{emptyText}</h4>
            </center>
            {cartCovers.map((post, index) => (
              <div class="card mb-3">
                <div class="row no-gutters">
                  <div class="col-md-4 mt-3 clsImg ">
                    {/* <img
                      id={"temp" + index}
                      src={"/images/verticaLImageHolder.jpg"}
                      class="card-img-top embed-responsive-item"
                      alt="..."
                      // style={{ borderRadius: "15px 15px 0px 0px", height: "350px" }}
                    /> */}
                    <img
                      alt="Card image cap"
                      class="card-img-top embed-responsive-item"
                      id={index}
                      src={
                        displayImages(post.images[0], index) ||
                        "/images/verticaLImageHolder.jpg"
                      }
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/verticaLImageHolder.jpg";
                      }}
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body ">
                      <h5 style={{ fontWeight: "bold" }}>{post.title}</h5>
                      <p
                        class="mb-0 text-uppercase small"
                        style={{ color: "#764A34", fontWeight: "bold" }}
                      >
                        <br />
                        {`Original Artist :`}{" "}
                        <span style={{ color: "#000000" }}>{post.author}</span>
                      </p>
                      <br />
                      <p
                        class="mb-0  text-uppercase small"
                        style={{ color: "#764A34", fontWeight: "bold" }}
                      >
                        {`Arranged by :`}{" "}
                        <span style={{ color: "#000000" }}>
                          Kaushal Rashmika
                        </span>
                        <br />
                      </p>
                      <br />
                      <p class="mb-0" style={{ fontWeight: "bold" }}>
                        ${post.price}
                      </p>
                      <br />
                      <button
                        type="button"
                        class="btn "
                        onClick={() => removeBtn(post.id)}
                        style={{
                          backgroundColor: "#D0193A",
                          color: "white",
                        }}
                      >
                        <i class="fas fa-trash-alt mr-1"></i>Remove item
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

       

        {/* Cart Calculations */}
        <div class="col-lg-4  justify-content-end">
          <div class="mb-6 ">
            <div class="pt-3">
              <h5 class="mb-3" style={{ fontWeight: "bold" }}>
                The Total Amount of
              </h5>
              <ul class="list-group list-group-flush">
                {/* Sub Total */}
                <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>Sub Total: ${total}</strong>
                  </div>
                </li>
              </ul>

              {/* Checkout Button */}
              <button
                type="button"
                class="btn  btn-block"
                onClick={() => completePayment(total)}
                style={{ backgroundColor: "#279B14", color: "white" }}
              >
                <i class="bi bi-arrow-right"></i>
                Go to Checkout
              </button>

              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
