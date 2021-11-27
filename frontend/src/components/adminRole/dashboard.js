import React, { useState, useEffect } from "react";
import axios from "axios";
import MusicCoverPage from "./../customerRole/musiccoverpage";
import AdminCard from "./../adminRole/admincard";
import Modal from "react-bootstrap/Modal";
import { Eye } from "react-feather";
import $ from "jquery";
import DataTable from "datatables.net";

// Admin dashboard
export default function DashBoard() {
  $(document).ready(function () {
    $("#cover").DataTable();
  });
  $(document).ready(function () {
    $("#excercise").DataTable();
  });
  $(document).ready(function () {
    $("#users").DataTable();
  });
  const [modelOpen, setmodelOpen] = useState(false);
  const [modelOpen1, setmodelOpen1] = useState(false);
  const [downloadmodal, setDownloadModal] = useState(false);
  const [covers, setCovers] = useState([]);
  const [coverlength, setCoverLength] = useState();
  const [customers, setCustomers] = useState([]);
  const [customerlength, setCustomersLength] = useState();
  const [customercovers, setCustomerCovers] = useState([]);

  let coverid = [];
  let coverdetails = [];

  useEffect(() => {
    axios
      .get("http://localhost:8070/covers/getcovers")
      .then((res) => {
        setCovers(res.data);
        setCoverLength(res.data.length);
      })
      .catch((err) => {
        alert(err.message);
      });

    axios
      .get("http://localhost:8070/customer/getAll")
      .then((res) => {
        setCustomers(res.data);
        setCustomersLength(res.data.length);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  function modalopen() {
    // alert("This is alert");
    setmodelOpen(true);
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

  function loadCovers() {
    document.getElementById("coverdiv").style.display = "block";
    document.getElementById("excercisediv").style.display = "none";
    document.getElementById("userdiv").style.display = "none";
  }
  function loadExcercise() {
    document.getElementById("excercisediv").style.display = "block";
    document.getElementById("coverdiv").style.display = "none";
    document.getElementById("userdiv").style.display = "none";
  }
  function loadUsers() {
    document.getElementById("userdiv").style.display = "block";
    document.getElementById("excercisediv").style.display = "none";
    document.getElementById("coverdiv").style.display = "none";
  }
  function loadIncome() {}

  function viewcustomer(id) {
    axios
      .get(`http://localhost:8070/order/getorderbycustomer/${id}`)
      .then((res) => {
        console.log(res.data[0].CoverIDs);
        coverid = res.data[0].CoverIDs;
      })
      .catch((err) => {
        alert(err.message);
      });

    alert(coverid);
    console.log(coverid);
    for (let i = 0; i < customercovers.length; i++) {
      axios
        .get(`http://localhost:8070/cover/getcoverbyid/${covers[i]}`)
        .then((res) => {
          console.log(res.data);
          coverdetails.push(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    console.log(coverdetails);
  }
  return (
    <div>
      <div className="row">
        <div className="col-md-3" onClick={() => loadCovers()}>
          {" "}
          <AdminCard color="red" value="All Covers" num={coverlength} />
          <br />
        </div>
        <div className="col-md-3" onClick={() => loadExcercise()}>
          {" "}
          <AdminCard color="green" value="All Excercises" num={coverlength} />
          <br />
        </div>
        <div className="col-md-3" onClick={() => loadUsers()}>
          {" "}
          <AdminCard color="blue" value="Users" num={customerlength} />
          <br />
        </div>
        <div className="col-md-3">
          {" "}
          <AdminCard color="purple" value="Income" num={30} />
          <br />
        </div>
      </div>
      <hr />
      <div id="coverdiv" className="row">
        <table
          id="cover"
          className="table table-striped table-bordered"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Pages</th>
              <th>No of downloads</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {covers.map((post) => (
              <tr>
                <td>{post.Title}</td>
                <td>{post.OriginalArtistName}</td>
                <td>{post.NoOfPages}</td>
                <td>{post.NoOfDownloads}</td>
                <td>{post.Price}</td>
                <td>
                  <button className="btn btn-outline-primary">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Office</th>
              <th>Age</th>
              <th>Start date</th>
              <th>Salary</th>
            </tr>
          </tfoot>
        </table>
      </div>

      <div id="excercisediv" style={{ display: "none" }} className="row">
        <table
          id="excercise"
          className="table table-striped table-bordered"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>Title2</th>
              <th>Artist2</th>
              <th>Pages</th>
              <th>No of downloads</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {covers.map((post) => (
              <tr>
                <td>{post.Title}</td>
                <td>{post.OriginalArtistName}</td>
                <td>{post.NoOfPages}</td>
                <td>{post.NoOfDownloads}</td>
                <td>{post.Price}</td>
                <td>
                  <button type="button" class="btn btn-outline-primary">
                    Primary
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Pages</th>
              <th>No of downloads</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>

      <div id="userdiv" style={{ display: "none" }} className="row">
        <table
          id="users"
          className="table table-striped table-bordered"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Gender</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((post) => (
              <tr>
                <td>{post.FirstName}</td>
                <td>{post.Email}</td>
                <td>{post.ContactNumber}</td>
                <td>{post.Gender}</td>
                <td>{post.Country}</td>
                <td>
                  <button
                    onClick={() => viewcustomer(post._id)}
                    type="button"
                    class="btn btn-outline-primary"
                  >
                    Primary
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Gender</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* Cover add model  */}
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
      <Modal show={modelOpen1} size="m">
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
