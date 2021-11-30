import React, { useState, useEffect } from "react";
import MusicCoverPage from "./../customerRole/musiccoverpage";
import AdminCard from "./../adminRole/admincard";
import Modal from "react-bootstrap/Modal";

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
      .get("http://localhost:8070/covers/getcovers")
      .then((res) => {
        setCoverLength(res.data.length);
        calculateDownloads(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });

    axios
      .get("http://localhost:8070/feedback/getAllFeedback")
      .then((res) => {
        setFeedbackLength(res.data.length);
      })
      .catch((err) => {
        alert(err.message);
      });

    axios
      .get("http://localhost:8070/customer/getAll")
      .then((res) => {
        setCustomersLength(res.data.length);
      })
      .catch((err) => {
        alert(err.message);
      });

    axios
      .get("http://localhost:8070/order/getOrders")
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
      .get(`http://localhost:8070/customer/get/${customerid}`)
      .then((res) => {
        // console.log(res.data);
        customerdetails.push(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });

    assignData();
  }
  function modelOpen12() {
    // alert("This is alert");
    setmodelOpen1(true);
  }
  function modalClose() {
    setmodelOpen(false);
  }
  function modalClose1() {
    setmodelOpen1(false);
  }

  function searchByDate(fromDate, toDate) {
    setFromValue(fromDate);
    setToValue(toDate);
    if (fromDate != "" && toDate != "") {
      document.getElementById("spinnerdiv").style.display = "block";
      document.getElementById("maindiv").style.display = "none";

      axios
        .get(`http://localhost:8070/order/getbyyear/${fromDate}/${toDate}`)
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
      .get("http://localhost:8070/order/getOrders")
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
      <div className="row">
        <div className="col-md-3" onClick={() => modalopen()}>
          {" "}
          <AdminCard color="red" />
          <br />
        </div>
        <div className="col-md-3" onClick={() => modelOpen12()}>
          {" "}
          <AdminCard color="green" />
          <br />
        </div>
        <div className="col-md-3">
          {" "}
          <AdminCard color="blue" />
          <br />
        </div>
        <div className="col-md-3">
          {" "}
          <AdminCard color="purple" />
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
              className="btn btn-outline-primary btn-sm"
              data-mdb-ripple-color="dark"
              onClick={(e) => refresh()}
              style={{ marginTop: "18px" }}
            >
              <i
                className="fa fa-refresh"
                aria-hidden="true"
                style={{
                  color: "blue",
                  fontSize: "20px",
                  marginTop: "10px",
                }}
              ></i>
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
          <h4>Add Cover/Excercise</h4>
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
            <div className="row">
              <div className="col-sm-6">
                <div class="form-group">
                  <label for="exampleInputEmail1">Song Name*</label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Song Name"
                  />
                  <label for="exampleInputEmail1">Main Category</label>
                  <select className="form-control" id="country" name="country">
                    <option>Select</option>
                    <option>Covers</option>
                    <option>Excercise</option>
                  </select>
                  <label for="exampleInputEmail1">YouTube Link*</label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="YouTube Link"
                  />
                  <label for="exampleInputEmail1">PDF File*</label>
                  <input
                    type="file"
                    name="pdffile"
                    id="pdffile"
                    class="form-control form-control-sm"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Facebook Link*"
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div class="form-group">
                  <label for="exampleInputEmail1">Instruments*</label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Instrument"
                  />
                  <label for="exampleInputEmail1">Sub Category</label>
                  <select className="form-control" id="country" name="country">
                    <option>Select</option>
                    <option>English</option>
                    <option>Sinhala</option>
                    <option>Hindi</option>
                  </select>
                  <label for="exampleInputEmail1">Facebook Link*</label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Facebook Link*"
                  />
                  <label for="exampleInputEmail1">Preview Images*</label>
                  <input
                    type="file"
                    name="sampleimages[]"
                    id="sampleimages"
                    class="form-control form-control-sm"
                    multiple="true"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Facebook Link*"
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
                  type="button"
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
      </Modal>

      {/* Category model */}
      <Modal show={modelOpen1} size="lg">
        <Modal.Header>
          <h4>Add Main Category</h4>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={modalClose1}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div class="form-group">
                  <label for="exampleInputEmail1">Main Category*</label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Main Name"
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
                  type="button"
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
      </Modal>
    </div>
  );
}
