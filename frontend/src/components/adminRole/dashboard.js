import React, { useState, useEffect } from "react";
import axios from "axios";
import MusicCoverPage from "./../customerRole/musiccoverpage";
import AdminCard from "./../adminRole/admincard";
import Modal from "react-bootstrap/Modal";
import $ from "jquery";
import DataTable from "datatables.net";
import CoverTemplate from "../customerRole/covercardtemplate";

// Admin dashboard
export default function DashBoard() {
  const [modelOpen, setmodelOpen] = useState(false);
  const [coverlength, setCoverLength] = useState("Loading...");
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

  let tableData = [];
  let covers = [];
  let customerdetails = [];
  let tot = 0;
  let downloads = 0;

  let name = "";
  let totalprice = "";
  let date = "";
  let cartID = "";
  let customerID = "";
  let coverID = [];
  let orderHolder = [];

  let dataholder = {
    name,
    totalprice,
    date,
    cartID,
    customerID,
    coverID,
  };

  useEffect(() => {
    document.getElementById("spinnerdiv").style.display = "block";
    document.getElementById("maindiv").style.display = "none";

    axios
      .get("https://kaushal-rashmika-music.herokuapp.com/covers/getcovers")
      .then((res) => {
        setCoverLength(res.data.length);
        calculateDownloads(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });

    axios
      .get("https://kaushal-rashmika-music.herokuapp.com/feedback/getAllFeedback")
      .then((res) => {
        setFeedbackLength(res.data.length);
      })
      .catch((err) => {
        alert(err.message);
      });

    axios
      .get("https://kaushal-rashmika-music.herokuapp.com/customer/getAll")
      .then((res) => {
        setCustomersLength(res.data.length);
      })
      .catch((err) => {
        alert(err.message);
      });

    axios
      .get("https://kaushal-rashmika-music.herokuapp.com/order/getOrders")
      .then((res) => {
        setOrders(res.data);
        // console.log(res.data);
        orderHolder = res.data;
        loadIncome(res.data);
        setError("");
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  function modalClose() {
    setmodelOpen(false);
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
      setError("");
    }
  }

  async function loadCovers(customerid) {
    // console.log(customerid);

    await axios
      .get(`https://kaushal-rashmika-music.herokuapp.com/customer/get/${customerid}`)
      .then((res) => {
        // console.log(res.data);
        customerdetails.push(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });

    assignData();
  }
  async function assignData() {
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
      }
      console.log(tableData);
      setPaymentData(tableData);
      document.getElementById("spinnerdiv").style.display = "none";
      document.getElementById("maindiv").style.display = "block";
      $("#example").DataTable();
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
          alert(err.message);
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

  function searchByDate(fromDate, toDate) {
    setFromValue(fromDate);
    setToValue(toDate);
    if (fromDate != "" && toDate != "") {
      document.getElementById("spinnerdiv").style.display = "block";
      document.getElementById("maindiv").style.display = "none";

      axios
        .get(`https://kaushal-rashmika-music.herokuapp.com/order/getbyyear/${fromDate}/${toDate}`)
        .then((res) => {
          if (res.data.length > 0) {
            setOrders(res.data);
            console.log(res.data);
            orderHolder = res.data;
            loadIncome(res.data);
            document.getElementById("spinnerdiv").style.display = "none";
            document.getElementById("maindiv").style.display = "block";
          } else {
            setError("No Data available");
            setPaymentData([]);
            setTotal("0");
            document.getElementById("spinnerdiv").style.display = "none";
            document.getElementById("maindiv").style.display = "block";
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }

  function refresh() {
    document.getElementById("spinnerdiv").style.display = "block";
    document.getElementById("maindiv").style.display = "none";
    axios
      .get("https://kaushal-rashmika-music.herokuapp.com/order/getOrders")
      .then((res) => {
        setOrders(res.data);
        // console.log(res.data);
        orderHolder = res.data;
        loadIncome(res.data);
        document.getElementById("spinnerdiv").style.display = "none";
        document.getElementById("maindiv").style.display = "block";
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  return (
    <div>
      <br/>
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
            num={coverlength}
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
            num={total}
          />
          <br />
        </div>
      </div>
      <hr />
      <div id="spinnerdiv" style={{ display: "block" }}>
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
        style={{ overflowX: "scroll", display: "none" }}
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
        <table
          id="example"
          class="table table-striped table-bordered"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Total Price</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paymentdata.map((post) => (
              <tr>
                <td>{post.name}</td>
                <td className="text-right">Rs.{post.totalprice}.00</td>
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
          <tfoot>
            <tr>
              <th>Customer Name</th>
              <th className="text-right">Total Price :- Rs.{total}.00</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
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
            <div id="spinnerdiv2" style={{ display: "block" }}>
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
                id="example"
                class="table table-striped table-bordered"
                style={{ width: "100%" }}
              >
                <thead>
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
                      <td className="text-right">Rs.{post.Price}.00</td>
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
    </div>
  );
}
