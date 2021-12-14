import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { storage } from "../../Configurations/firebaseConfigurations";
import { ref,getDownloadURL } from "@firebase/storage";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";

export default function PurchaseHistory(props) {
  const [cover, setCover] = useState([]);
  const [empty, setEmpty] = useState("");
  const [modalOpenForPdf, setModalOpenForPdf] = useState(false);
  const [load, setLoad] = useState(true);
  let purchasedCoverDetailes = [];
  let allCovers = [];
  const [TotalPrice, setTotalPrice] = useState(0);
  const [noPurchased, setNoPurchased] = useState(0);
  const[permananetCovers, setPermananentCover] = useState([]);

  let datee = "";
  let currentDate = "";
//  let currentTime = "";
  let time="";
  let newDate = ""

  useEffect(() => {
    async function getCovers() {
      setLoad(false);
      await axios
        .get(
          `https://kaushal-rashmika-music.herokuapp.com/customer/get/${localStorage.getItem(
            "CustomerID"
          )}`
        )
        .then((res) => {
          if (res.data.PurchasedCovers.length == 0) {
            setEmpty("No Purchased Covers yet!");
            setLoad(true);
          } else {
            getPurchasedCoverDetailes(res.data.PurchasedCovers);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getCovers();
    getOrders();
  }, []);

  async function getPurchasedCoverDetailes(pCovers) {
    let totalcoversPrice = 0;
    await axios
      .get(`https://kaushal-rashmika-music.herokuapp.com/covers/getcovers`)
      .then((res) => {
        allCovers = res.data;
        if (allCovers.length == 0) {
          setEmpty("No Covers Available!");
        } else {
          for (let i = 0; i < allCovers.length; i++) {
            for (let j = 0; j < pCovers.length; j++) {
              if (allCovers[i]._id === pCovers[j]) {
                purchasedCoverDetailes.push(allCovers[i]);
                totalcoversPrice += Number(allCovers[i].Price);
              }
            }
          }

          if (purchasedCoverDetailes.length == 0) {
            setEmpty("No Covers Availble!");
            setLoad(true);
          } else {
            setCover(purchasedCoverDetailes);
            setNoPurchased(pCovers.length);
            setPermananentCover(purchasedCoverDetailes);
            setTotalPrice(totalcoversPrice);
            setLoad(true);
          }
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  function searchByName(searchInput) {
    setLoad(false);
    setEmpty("");
    let searchResult = [];
    let STotalPrice = 0;
    searchResult = permananetCovers.filter(
      (post) =>
        post.Title.toLowerCase().includes(searchInput.toLowerCase()) ||
        post.MainCategory.toLowerCase().includes(searchInput.toLowerCase()) ||
        post.SubCategory.toLowerCase().includes(searchInput.toLowerCase())
    );

    if(searchResult.length == 0){
      setEmpty("No Covers Availble!");
      setCover([]);
      setTotalPrice(0);
      setNoPurchased(0);
      setLoad(true);
    }else{
      setNoPurchased(searchResult.length);
      for(let i = 0; i < searchResult.length; i++){
        STotalPrice += Number(searchResult[i].Price);
      }
      setTotalPrice(STotalPrice);
      setCover(searchResult);
      setLoad(true);
    }

  }

  async function displayImages(coverImageName, index) {
    const storageRef = ref(storage, `PreviewImages/${coverImageName}`);
    await getDownloadURL(storageRef)
      .then((url) => {
        document.getElementById(index).src = url;
      })
      .catch((err) => {});
  }

  function previewPdf(covername) {
    setModalOpenForPdf(true);
    const storageRef = ref(storage, `Covers(PDF)/${covername}`);
    getDownloadURL(storageRef)
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

  return (
    <div className="container" style={{ minHeight: "100vh" }}>
      <br />
      <br />

      <div className="row">
        <div className="col-sm">
          <h3 style={{ color: "#764A34" }}>
            {" "}
            <center>
              <b>Purchase History</b>
            </center>
          </h3>
          <br />
        </div>
        <div className="col-sm">
          <div className="row">
            <div className="col-md-1"></div>
            <div class="col-md-10 input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Search Music Covers"
                onChange={(e) => {
                  searchByName(e.target.value);
                }}
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
            <div className="col-md-1"></div>
          </div>
          <br />
        </div>
        <div className="col-sm text-right">
          <h6>
            <b>No of purchases : {noPurchased}</b>
          </h6>
          <h6 style={{ display: "inline" }}>
            <b>Total : $ {TotalPrice} </b>
          </h6>
          <h6 id="total" style={{ display: "inline" }}></h6>
        </div>
      </div>
      <br />
      <center>
        <h3 style={{ color: "#D0193A " }}>{empty}</h3>
        <div class="spinner-border" id="loadingBar" hidden={load} role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </center>
      <br />

      {cover.map((post, index) => {
        // TotalPrice += Number(post.Price);
        return (
          <div
            className="card p-3"
            style={{
              boxShadow: "10px 10px 6px -6px #aaaaaa",
              borderRadius: "10px",
              width: "90%",
              margin: "auto",
              marginBottom: "10px",
              border: "2px solid sienna",
            }}
          >
            <div className="row" style={{ width: "100%", margin: "auto" }}>
              <div className="col-sm text-center">
                <img
                  id={index}
                  class="rounded"
                  style={{ width: "100%", margin: "auto" }}
                  src={
                    displayImages(post.PreviewPages[0], index) ||
                    "/images/imageplaceholder.png"
                  }
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/verticaLImageHolder.jpg";
                  }}
                />
              </div>

              <div className="col-sm">
                <br />
                <div className="row">
                  <div className="col" style={{ lineHeight: "2em" }}>
                    <span>
                      <b> &ensp;&ensp;{post.Title}</b>
                    </span>
                    <br />
                    <span> &ensp;&ensp;{post.MainCategory}</span>
                    <br />
                    <span> &ensp;&ensp;{post.SubCategory}</span>
                    <br />
                    <span> &ensp;&ensp;Price : ${post.Price}</span>
                  </div>
                </div>
                <br />
                <br />
                <div className="row">
                  <div className="col-sm">
                    <button
                      style={{
                        borderRadius: "25px",
                        backgroundColor: "#D0193A",
                        color: "white",
                      }}
                      className="btn btn-sm btn-block"
                      type="button"
                      onClick={() => {
                        previewPdf(post.CoverPdf);
                      }}
                    >
                      Download
                    </button>
                    <br />
                  </div>
                  <div className="col-sm">
                    <button
                      style={{
                        borderRadius: "25px",
                        backgroundColor: "#279B14",
                        color: "white",
                      }}
                      className="btn btn-sm btn-block"
                      type="button"
                      onClick={() => {
                        props.history.push("/customer/mycover/" + post._id);
                      }}
                    >
                      View
                    </button>
                    <br />
                  </div>
                </div>
              </div>
              <br />
              <div
                className="col-sm "
                style={{ backgroundColor: "white", lineHeight: "2em" }}
              >
                <br />
                <span style={{ color: " #764A34" }}>
                  Original Artist&ensp;:
                </span>
                <span>&ensp;{post.OriginalArtistName}</span>
                <br />
                <span style={{ color: " #764A34" }}>Arranged By&ensp;:</span>
                <span>&ensp;{post.ArrangedBy}</span>
                <br />
                <span style={{ color: " #764A34" }}>
                  Instrument Played On&ensp;:
                </span>
                <span>&ensp;{post.InstrumentsPlayedOn}</span>
                <br />
              </div>
            </div>
          </div>
        );
      })}

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
