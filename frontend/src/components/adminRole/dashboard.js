import React, { useState, useEffect } from "react";
import MusicCoverPage from "./../customerRole/musiccoverpage";
import AdminCard from "./../adminRole/admincard";
import Modal from "react-bootstrap/Modal";

export default function DashBoard() {
  const [modelOpen, setmodelOpen] = useState(false);
  const [modelOpen1, setmodelOpen1] = useState(false);

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
