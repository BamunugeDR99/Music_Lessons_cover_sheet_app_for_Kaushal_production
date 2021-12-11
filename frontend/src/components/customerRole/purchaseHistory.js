import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { storage } from "../../Configurations/firebaseConfigurations";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";

export default function PurchaseHistory(props) {
  const [cover, setCover] = useState([]);
  const [searchValue, setSearchvalue] = useState([]);
  const [noData, setNoData] = useState([]);
  const [empty, setEmpty] = useState("");
  const [empty2, setEmpty2] = useState([]);
  const [orderDate, setOrderDate] = useState([]);
  const [modalOpenForPdf, setModalOpenForPdf] = useState(false);
  const [modalOpenForImage, setModalOpenForImage] = useState(false);
  const [load, setLoad] = useState(true);
  let [total, setTotal] = useState(0);
  let covers = [];
  let array2 = [];

  let TotalPrice = 0;

  useEffect(() => {
    function getCovers() {
      setLoad(false);
      axios
        .get("https://kaushal-rashmika-music.herokuapp.com/customer/getAll")
        .then(
          (res) => {
           
              const filter = res.data.filter(
                (cus) => cus._id == localStorage.getItem("CustomerID")
              );

              if (filter[0].PurchasedCovers.length==null) {
                setEmpty2("No purchased covers yet!");
              } else {
                setEmpty2("")
              }
             
                for (let i = 0; i < filter.length; i++) {
                  console.log(filter[i].TransactionDateAndTime);
                  setOrderDate(filter[i].TransactionDateAndTime);
                

                filter.map((post) => {
                  covers.push(post.PurchasedCovers);
                });

                axios
                  .get(
                    "https://kaushal-rashmika-music.herokuapp.com/covers/getcovers"
                  )
                  .then((res) => {
                    getSpecificOrderCoverDetiles(res.data);
                  });
              
            }
          }
        )
        .catch((err) => {
          alert(err);
        });
    }
    getCovers();
  }, []);

  function getSpecificOrderCoverDetiles(allCovers) {
    setTotal(0);
    setNoData(0);
    TotalPrice = 0;
    for (let j = 0; j < allCovers.length; j++) {
      for (let i = 0; i < covers[0].length; i++) {
        if (covers[0][i] == allCovers[j]._id) {
          array2.push(allCovers[j]);
          console.log(covers[0][i]);
          TotalPrice = TotalPrice + Number(allCovers[j].Price);
          setTotal(total + Number(allCovers[j].Price));
          setNoData(array2.length);
        }
      }
    }
    document.getElementById("total").innerHTML = TotalPrice;
    setLoad(true);
    if (array2.length == 0) {
      setEmpty2("No purchased covers yet!");
    }
    setCover(array2);
  }

  function searchByName(val) {
    setLoad(false);
    setTotal("");
    setEmpty("");
    let searchResult = [];
    axios
      .get("https://kaushal-rashmika-music.herokuapp.com/order/getOrders")
      .then((res) => {
        console.log(res.data);
        const filter = res.data.filter(
          (cus) => cus.CustomerID == localStorage.getItem("CustomerID")
        );
        filter.map((post) => {
          covers.push(post.CoverIDs);
        });

        if (filter.length == 0) {
          setEmpty2("No purchased covers yet!");
          setLoad(true);
        } else {
          axios
            .get(
              "https://kaushal-rashmika-music.herokuapp.com/covers/getcovers"
            )
            .then((res) => {
              searchResult = res.data.filter(
                (post) =>
                  post.Title.toLowerCase().includes(val.toLowerCase()) ||
                  post.MainCategory.toLowerCase().includes(val.toLowerCase()) ||
                  post.SubCategory.toLowerCase().includes(val.toLowerCase())
              );
              getSpecificOrderCoverDetiles(searchResult);
              if (searchResult.length == 0) {
                setEmpty("No Covers available !");
              } else {
                setEmpty("");
              }

              setLoad(true);
            });
        }
      })
      .catch((err) => {
        alert(err);
      });
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
            <b>No of purchases : {noData}</b>
          </h6>
          <h6 style={{ display: "inline" }}>
            <b>Total : $ </b>
          </h6>
          <h6 id="total" style={{ display: "inline" }}></h6>
        </div>
      </div>
      <br />
      <center>
        <h3 style={{ color: "#D0193A " }}>{empty}</h3>
        <h3 style={{ color: "#D0193A " }}>{empty2}</h3>
        <div class="spinner-border" id="loadingBar" hidden={load} role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </center>
      <br />

      {cover.map((post, index) => {
        TotalPrice += Number(post.Price);
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
                <div className="text-right">
                  <span class="text-center">{orderDate}</span>
                </div>
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
