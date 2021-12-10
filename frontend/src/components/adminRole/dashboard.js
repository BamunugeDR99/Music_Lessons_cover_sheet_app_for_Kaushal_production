import React, { useState, useEffect } from "react";
import axios from "axios";
import MusicCoverPage from "./../customerRole/musiccoverpage";
import AdminCard from "./../adminRole/admincard";
import Modal from "react-bootstrap/Modal";
import $ from "jquery";
import Swal from "sweetalert2";
import DataTable from "datatables.net";
import CoverTemplate from "../customerRole/covercardtemplate";

// Admin dashboard
export default function DashBoard() {
  const [modelOpen, setmodelOpen] = useState(false);
  const [coverlength, setCoverLength] = useState("Loading...");
  const [excercisesLength, setExcercisesLength] = useState("Loading...");
  const [customerlength, setCustomersLength] = useState("Loading...");
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState("Loading...");
  const [paymentdata, setPaymentData] = useState([]);
  const [selectedCovers, setSelectedCovers] = useState([]);
  const [feedbackLength, setFeedbackLength] = useState("Loading...");
  const [alldownloads, setDownloads] = useState("Loading...");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [error, setError] = useState("");
  const [totalIncome, setTotalIncome] = useState("");
  let [tablediv, setTablediv] = useState();
  let [spinner, setspinner] = useState(true);
  let [main, setmain] = useState(true);
  let count = 1;

  let tableData = [];
  let covers = [];
  let customerdetails = [];
  let tot = 0;
  let totaltot = 0;
  let downloads = 0;

  let name = "";
  let totalprice = "";
  let date = "";
  let cartID = "";
  let customerID = "";
  let coverID = [];
  let orderHolder = [];
  let today = new Date(new Date().valueOf() + 1000 * 60 * 60 * 24)
    .toISOString()
    .split("T")[0];
  // let previousDay = new Date(Date.now() - 86400000);
  var previousDay = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24)
    .toISOString()
    .split("T")[0];

  console.log(today);
  console.log(previousDay);

  let dataholder = {
    name,
    totalprice,
    date,
    cartID,
    customerID,
    coverID,
  };

  useEffect(() => {
    setmain(true);
    setspinner(true);

    console.log(today);
    console.log(previousDay);
    axios
      .get("https://kaushal-rashmika-music.herokuapp.com/covers/getactivecovers")
      .then((res) => {
        setCoverLength(res.data.length);
        // calculateDownloads(res.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<p style = "color : #D0193A">Currently unavailable!',
        });
      });

    axios
      .get("https://kaushal-rashmika-music.herokuapp.com/covers/getactiveExcercices")
      .then((res) => {
        setExcercisesLength(res.data.length);
        // calculateDownloads(res.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<p style = "color : #D0193A">Currently unavailable!',
        });
      });

    axios
      .get("https://kaushal-rashmika-music.herokuapp.com/covers/getcovers")
      .then((res) => {
        // setCoverLength(res.data.length);
        calculateDownloads(res.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<p style = "color : #D0193A">Currently unavailable!',
        });
      });

    axios
      .get("https://kaushal-rashmika-music.herokuapp.com/feedback/getAllFeedback")
      .then((res) => {
        setFeedbackLength(res.data.length);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<p style = "color : #D0193A">Currently unavailable!',
        });
      });

    axios
      .get("https://kaushal-rashmika-music.herokuapp.com/customer/getAll")
      .then((res) => {
        setCustomersLength(res.data.length);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<p style = "color : #D0193A">Currently unavailable!',
        });
      });

    axios
      .get(`https://kaushal-rashmika-music.herokuapp.com/order/getbyyear/${previousDay}/${today}`)
      .then((res) => {
        setOrders(res.data);
        // console.log(res.data);
        orderHolder = res.data;
        loadIncome(res.data);
        console.log(res.data);
        setError("");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<p style = "color : #D0193A">Currently unavailable!',
        });
      });

    axios
      .get("https://kaushal-rashmika-music.herokuapp.com/order/getOrders")
      .then((res) => {
        loadTotalIncome(res.data);
        setError("");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<p style = "color : #D0193A">Currently unavailable!',
        });
      });
  }, []);

  function modalClose() {
    setmodelOpen(false);
  }

  async function loadTotalIncome(data) {
    console.log(data.length);
    if (data.length > 0) {
      await data.map((post) => (totaltot = totaltot + Number(post.TotalPrice)));
      setTotalIncome(totaltot);
      setError("");
    }
  }

  async function loadIncome(data) {
    console.log(data.length);
    if (data.length > 0) {
      await data.map(
        (post) => (
          (tot = tot + Number(post.TotalPrice)), loadCovers(post.CustomerID)
        )
      );
      setTotal(tot);
      // console.log(tot);
      setError("");
    }
  }

  async function loadCovers(customerid) {
    // console.log(customerid);

    // console.log(orderHolder);

    await axios
      .get(`https://kaushal-rashmika-music.herokuapp.com/customer/get/${customerid}`)
      .then((res) => {
        // console.log(res.data);
        customerdetails.push(res.data);

        assignData();
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
  async function assignData() {
    setTablediv(
      <tr>
        <td>Loading....</td>
      </tr>
    );
    if (customerdetails.length == orderHolder.length) {
      // console.log(customerdetails);
      // console.log(orderHolder);
      for (let i = 0; i < orderHolder.length; i++) {
        for (let j = 0; j < orderHolder.length; j++) {
          if (orderHolder[i].CustomerID == customerdetails[j]._id) {
            // console.log(customerdetails[j]);
            // console.log(orderHolder[i]);
            dataholder = {
              name: customerdetails[j].FirstName,
              totalprice: orderHolder[i].TotalPrice,
              date: orderHolder[i].TransactionDateAndTime,
              cartID: orderHolder[i]._id,
              customerID: customerdetails[j]._id,
              coverID: orderHolder[i].CoverIDs,
            };
            tableData.push(dataholder);
            break;
          }
        }
        if (count == orderHolder.length) {
          // setPaymentData(tableData);
          await setTablediv(
            <tbody>
              {tableData.map((post) => (
                <tr>
                  <td>{post.name}</td>
                  <td className="text-right">${post.totalprice}</td>
                  <td>{post.date.substr(0, 10)}</td>
                  <td>
                    {" "}
                    <button
                      type="button"
                      onClick={() => getOrderedCovers(post.coverID)}
                      class="btn btn-outline-secondary waves-effect btn-sm px-2"
                    >
                      <i class="fas fa-eye" aria-hidden="true"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          );
        }
        //

        count = count + 1;
        $("#example2").DataTable();
      }
      console.log("Lenth " + orderHolder.length);
      setmain(false);
      setspinner(true);
      // await sleep(10000);
      // console.log(tableData);
    }
  }

  async function getOrderedCovers(data) {
    console.log(data);

    for (let k = 0; k < data.length; k++) {
      setmodelOpen(true);

      await axios
        .get(`https://kaushal-rashmika-music.herokuapp.com/covers/getcoverbyid/${data[k]}`)
        .then((res) => {
          document.getElementById("spinnerdiv2").style.display = "block";
          document.getElementById("modeldiv").style.display = "none";
          covers.push(res.data[0]);
        })
        .catch((err) => {
          console.log(err.message);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<p style = "color : #D0193A">Currently unavailable!',
          });
        });
    }
    // testFunction();
    console.log(covers);

    setSelectedCovers(covers);
    document.getElementById("spinnerdiv2").style.display = "none";
    document.getElementById("modeldiv").style.display = "block";
  }

  function calculateDownloads(data) {
    for (let i = 0; i < data.length; i++) {
      downloads = downloads + Number(data[i].NoOfDownloads);
    }
    // console.log(downloads);
    setDownloads(downloads);
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function searchByDate(fromDate, toDate) {
    setFromValue(fromDate);
    setToValue(toDate);
    if (fromDate != "" && toDate != "") {
      setmain(true);
      setspinner(false);

      await axios
        .get(`https://kaushal-rashmika-music.herokuapp.com/order/getbyyear/${fromDate}/${toDate}`)
        .then((res) => {
          if (res.data.length > 0) {
            setOrders(res.data);
            console.log(res.data);
            orderHolder = res.data;
            loadIncome(res.data);
            setmain(false);
            setspinner(true);
          } else {
            setError("No Data available");

            setTablediv();
            setTotal("0");

            setmain(false);
            setspinner(true);
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
    }
  }

  function refresh() {
    setToValue("");
    setFromValue("");
    setmain(true);
    setspinner(false);
    axios
      .get(`https://kaushal-rashmika-music.herokuapp.com/order/getbyyear/${previousDay}/${today}`)
      .then((res) => {
        setOrders(res.data);
        // console.log(res.data);
        orderHolder = res.data;
        loadIncome(res.data);

        setmain(false);
        setspinner(true);
        // console.log(orderHolder);
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

  return (
    <div  style={{overflowX:"hidden", minHeight:"100vh", marginBottom:"40px", marginTop:"40px"}}>
      <br />
      {/* {console.log(selectedCovers)} */}
      <div className="row">
        <div className="col-md-2">
          {" "}
          <AdminCard
            color="red"
            value="Covers"
            num={coverlength}
            icon={"fa fa-music"}
          />
          <br />
        </div>
        <div className="col-md-2">
          {" "}
          <AdminCard
            color="#8B8000"
            value="Excercises"
            icon={"fa fa-file"}
            num={excercisesLength}
          />
          <br />
        </div>
        <div className="col-md-2">
          {" "}
          <AdminCard
            color="blue"
            icon={"fa fa-user"}
            value="Users"
            num={customerlength}
          />
          <br />
        </div>
        <div className="col-md-2">
          {" "}
          <AdminCard
            color="#7CB9E8  "
            icon={"fa fa-download"}
            value="Downloads"
            num={alldownloads}
          />
          <br />
        </div>
        <div className="col-md-2">
          {" "}
          <AdminCard
            color="#54626F  "
            icon={"fa fa-comments"}
            value="Feedbacks"
            num={feedbackLength}
          />
          <br />
        </div>
        <div className="col-md-2">
          {" "}
          <AdminCard
            color="green"
            icon={"fas fa-dollar-sign"}
            value="Income"
            num={totalIncome}
          />
          <br />
        </div>
      </div>
      <hr />
      <div id="spinnerdiv" hidden={spinner}>
        <center>
          <div className=" justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
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
      </div>
      <div
        className="container"
        id="maindiv"
        hidden={main}
        style={{  overflowX:"hidden" }}
      >
        <div className="row">
          <div className="col-md-4">
            <div class="form-group">
              <label>From</label>
              <input
                type="date"
                class="form-control"
                id="from"
                value={fromValue}
                onChange={(e) => searchByDate(e.target.value, toValue)}
                aria-describedby="emailHelp"
                placeholder="Enter email"
                max={today}
              />
            </div>{" "}
          </div>
          <div className="col-md-4">
            <div class="form-group">
              <label>To</label>
              <input
                type="date"
                class="form-control"
                id="to"
                max={today}
                value={toValue}
                onChange={(e) => searchByDate(fromValue, e.target.value)}
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>{" "}
          </div>
          <div className="col-md-4">
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              data-mdb-ripple-color="dark"
              onClick={(e) => refresh()}
              style={{ marginTop: "35px" }}
            >
              Clear Filters
            </button>
          </div>
        </div>
        <h4 style={{ color: "red" }}>
          <strong>{error}</strong>
        </h4>
        <div style={{ overflowX:"hidden",  overflowY: "scroll", overflow:"auto", overflowY:"hidden", height: "500px", width: "100%"}}>
          <table
            id="example"
            class="table table-striped table-bordered text-center"
          >
            <thead class="thead-dark">
              <tr>
                <th>Customer Name</th>
                <th>Total Price</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            {tablediv}
            <tfoot>
              <tr>
                <th>Customer Name</th>
                <th className="text-right">Total Price :- ${total}</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <Modal show={modelOpen} size="lg">
        <Modal.Header>
          <h4>All ordered covers</h4>
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
            <div id="spinnerdiv2" hidden={true} style={{ display: "block" }}>
              <center>
                <div class=" justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              </center>
            </div>
            <div
              style={{ display: "none" }}
              id="modeldiv"
              className="row text-center"
            >
              <table
                id="example2"
                class="table table-striped table-bordered text-center"
                style={{ width: "100%" }}
              >
                <thead class="thead-dark">
                  <tr>
                    <th>Cover Name</th>
                    <th>Total Price</th>
                    <th>Total Downloads</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCovers.map((post) => (
                    <tr>
                      <td>{post.Title}</td>
                      <td className="text-right">${post.Price}</td>
                      <td>{post.NoOfDownloads}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Cover Name</th>
                    <th>Total Price</th>
                    <th>Total Downloads</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="row"></div>
        </Modal.Footer>
      </Modal>
      <br /> <br />
    </div>
  );
}
