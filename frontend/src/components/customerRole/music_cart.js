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
  let tot = 0;
  let coverdetails = [];

  let price = "";
  let title = "";
  let author = "";
  let id = "";
  let images = [];

  let cover = {
    id,
    price,
    title,
    author,
    images,
  };

  useEffect(() => {
    document.getElementById("spinnerdiv").style.display = "block";
    document.getElementById("cartdiv").style.display = "none";
    setTotal("Loading...");
    axios
      .get(
        "http://localhost:8070/shoppingCart/getOneCart/61a26e4cb42a52e3ff12e82e"
      )
      .then((res) => {
        console.log(res.data.CoverIDs);
        if (res.data.CoverIDs != "") {
          callData(res.data.CoverIDs);
          setDataholder(res.data.CoverIDs);
          console.log(res.data);
          setTotal("Loading...");
        } else {
          document.getElementById("spinnerdiv").style.display = "none";
          document.getElementById("cartdiv").style.display = "block";
          setTotal("0");
          setEmptyText("No covers Available In the cart");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  async function callData(data) {
    console.log(data.length);
    console.log(data);

    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      await axios
        .get(`http://localhost:8070/covers/getcoverbyid/${data[i]}`)
        .then((res) => {
          cover = {
            price: res.data[0].Price,
            title: res.data[0].Title,
            id: res.data[0]._id,
            author: res.data[0].OriginalArtistName,
            images: res.data[0].PreviewPages,
          };
          tot = Number(tot) + Number(res.data[0].Price);
          console.log(Number(tot));
          coverdetails.push(cover);
          console.log(coverdetails);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    console.log(coverdetails);
    setCovers(coverdetails);
    document.getElementById("spinnerdiv").style.display = "none";
    document.getElementById("cartdiv").style.display = "block";

    setTotal(tot);
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
            `http://localhost:8070/shoppingCart/deleteCartCover/${id}/61a26e4cb42a52e3ff12e82e`
          )
          .then((res) => {
            alert("Successfully deleted");
          })
          .catch((err) => {
            alert(err.message);
          });
        window.location.reload(true);
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
      })
      .catch((err) => {
        // ErrorhandlingTxt("Reccomended covers are not available right now!");
      });
  }
  return (
    <div className="container">
      {console.log(tot)}
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
      <div class="row">
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
            display: "none",
          }}
        >
          <div>
            <center>
              <h4 style={{ color: "red" }}>{emptyText}</h4>
            </center>
            {cartCovers.map(
              (post, index) => (
                console.log(post.images),
                (
                  <div class="card mb-3">
                    <div class="row no-gutters">
                      <div class="col-md-4 mt-3 clsImg ">
                        <img
                          alt="Card image cap"
                          class="card-img-top embed-responsive-item"
                          id={index}
                          src={
                            displayImages(post.images[0], index) ||
                            "/images/Imageplaceholder.png"
                          }
                        />
                      </div>
                      <div class="col-md-8">
                        <div class="card-body ">
                          <h5 style={{ fontWeight: "bold" }}>{post.title}</h5>
                          <p
                            class="mb-0 text-uppercase small"
                            style={{ color: "#764A34", fontWeight: "bold" }}
                          >
                            {`Original Artist :`}{" "}
                            <span style={{ color: "#000000" }}>
                              {post.author}
                            </span>
                          </p>
                          <p
                            class="mb-0  text-uppercase small"
                            style={{ color: "#764A34", fontWeight: "bold" }}
                          >
                            {`Arranged by :`}{" "}
                            <span style={{ color: "#000000" }}>
                              Kaushal Rashmika
                            </span>
                          </p>
                          <p class="mb-0" style={{ fontWeight: "bold" }}>
                            Rs.{post.price}
                          </p>
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
                )
              )
            )}
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
                {/* Temporary Amount */}
                <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Temporary Amount: ${total}
                </li>

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
