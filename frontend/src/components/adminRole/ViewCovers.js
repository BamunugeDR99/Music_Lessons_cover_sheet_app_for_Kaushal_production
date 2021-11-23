import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "react-bootstrap/Modal";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "../../css/toogle.css";
export default function ViewCovers(props) {
  const [covers, setCovers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [SubCategories, setSubCategories] = useState([]);
  let tempCovers = [];
  let tempMainCategory = "";
  let tempSubCategory = [];
  
  // user inputs
  const [songName,setSongName] = useState("");
  const [instruments,setInstrument] = useState("");
  const [youtubeLink,setYoutubeLink] = useState("");
  const [facebookLink,setFacebookLink] = useState("");
  const [noOfPages,setNoOfPages] = useState("");
  const [price,setPrices] = useState("");
  const [previewPages,setPreviewPages] = useState("");
  const [coverPDF,setCoverPDF] = useState("");
  
  useEffect(() => { 
    function getAllClassicalGuitarCovers() {
      axios
        .get("http://localhost:8070/covers/getcovers")
        .then((res) => {
          tempCovers = res.data;
          getAllClassicalGutarMainCategories();
        })
        .catch((err) => {
          alert(err);
        });
    }

    getAllClassicalGuitarCovers();
  }, []);

  function setContent() {
    setSubCategories(tempSubCategory);
    setCovers(tempCovers.filter((covers) => covers.Status != "3"));
    $(document).ready(function () {
      $("#Covers").DataTable();
    });
  }

  function getAllClassicalGutarMainCategories() {
    axios
      .get("http://localhost:8070/mainCategory/get/61936e9d9ea7c21aebd01113")
      .then((res) => {
        tempSubCategory = res.data.SubCategories;
        setContent();
      })
      .catch((err) => {
        alert(err);
      });
  }
  function changeCoverStatus(id) {}

  function updateCover(id) {}

  function deleteCover(id) {}
  function viewMoreCover(id) {}



  // add cover / exercise
  function addCover(e){
    e.preventDefault();
    let previewPageList = [];
   for(let i = 0; i < previewPages.length;i++){
      previewPageList.push(previewPages[i].name);
   }
    const newCover = {
      Title : songName,
     // OriginalArtistName : "gg",
      InstrumentsPlayedOn : instruments,
      SubCategory : document.getElementById("subCategory").value,
      MainCategory : document.getElementById("MainCategory").value,
      NoOfPages : noOfPages,
      NoOfPreviewPages : previewPages.length,
      Price : price,
      YoutubeLink : youtubeLink,
      FacebookLink : facebookLink, 
      PreviewPages : previewPageList,
      CoverPdf : coverPDF[0].name,
      
    }
    console.log(newCover);

     axios
      .post("http://localhost:8070/covers/add", newCover)
      .then(() => {
       alert("cover added");

      })
      .catch((err) => {
        alert(err);
      });
    
  }
  return (
    <div>
      <br />
      <div className="container-xxl">
        <h2 style={{ color: "#764A34" }}>
          <b>Classical Guitar Covers</b>
        </h2>
        <button
          type="button"
          class="btn btn-rounded rounded"
          style={{ backgroundColor: "#279B14", color: "#ffffff" }}
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Add new cover
        </button>
      </div>
      <div className="container-xxl" style={{ overflowX: "auto" }}>
        <br />
        <table
          id="Covers"
          class="table table-striped table-bordered table-hover"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>Title</th>
              <th>Original Artist Name</th>
              <th>Arranged By</th>
              <th>Instuments Played On </th>
              <th>Main Category</th>
              <th>Sub Category</th>
              <th>Price</th>
              <th>Added Date And Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {covers.map((covers, index) => {
              return (
                <tr>
                  <td>{covers.Title}</td>
                  <td>{covers.OriginalArtistName}</td>
                  <td>{covers.ArrangedBy}</td>
                  <td>
                    {covers.InstrumentsPlayedOn.map((instruments, index) => {
                      return <div>{instruments}</div>;
                    })}
                  </td>
                  <td>{covers.MainCategory}</td>
                  <td>{covers.SubCategory}</td>
                  <td>{covers.Price}</td>
                  <td>{covers.AddedDateAndTime}</td>
                  <td>
                    {" "}
                    <label class="switch">
                      <input
                        type="checkbox"
                        onChange={() => changeCoverStatus(covers._id)}
                      />
                      <span class="slider round"></span>
                    </label>
                  </td>
                  <td>
                    <button
                      className="btn-sm"
                      style={{ display: "inline" }}
                      onClick={() => updateCover(covers._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#279B14"
                        class="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                    </button>
                    <span> </span>
                    <button
                      className="btn-sm"
                      style={{ display: "inline" }}
                      onClick={() => deleteCover(covers._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#D0193A"
                        class="bi bi-trash-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                      </svg>
                    </button>
                    <span> </span>
                    <button
                      className="btn-sm"
                      style={{ display: "inline" }}
                      onClick={() => viewMoreCover(covers._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#764A34"
                        class="bi bi-three-dots-vertical"
                        viewBox="0 0 16 16"
                      >
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th>Title</th>
              <th>Original Artist Name</th>
              <th>Arranged By</th>
              <th>Instuments Played On </th>
              <th>Main Category</th>
              <th>Sub Category</th>
              <th>Price</th>
              <th>Added Date And Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <Modal show={modalOpen} size="lg">
      <form onSubmit = {addCover}>
        <Modal.Header>
          <h4>Add Cover/Excercise</h4>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              setModalOpen(false);
            }}
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
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Song Name"
                    onChange = {(e)=> {
                      setSongName(e.target.value);
                    }}
                    required
                  /><br/>
                  <label for="exampleInputMainCategory">Main Category</label>
                  <select
                    className="form-control"
                    id="MainCategory"
                    name="category"
                    disabled
                  >
                    <option>Classical Guitar Covers</option>
                  </select>
                  <br/>
                  <label for="exampleInputEmail1">YouTube Link*</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="YouTube Link"
                    onChange = {(e)=> {
                      setYoutubeLink(e.target.value);
                    }}
                    required
                  />
                  <p style = {{color : "#ffe800"}}>Enter the youtube embed url link</p>
                  <label for="exampleInputEmail1">PDF File*</label>
                  <input
                    type="file"
                    name="pdffile"
                    id="pdffile"
                    style = {{height : "35px"}}
                    class="form-control form-control-sm"
                    id="exampleInputPDF"
                    aria-describedby="emailHelp"
                    accept = "application/pdf"
                    onChange = {(e) => {
                      setCoverPDF(e.target.files);
                    }}
                    required
                  /><br/>
                    <label for="exampleInputEmail1">No of Pages*</label>
                  <input
                    type="number"
                    name="noOfPages"
                    id="noOfPages"
                    class="form-control form-control-sm"
                    id="exampleInputNoOfPages"
                    aria-describedby="emailHelp"
                    placeholder="(PDF) no of original pages"
                    onChange = {(e)=> {
                      setNoOfPages(e.target.value);
                    }}
                    required
                  /><br/>
                </div>
              </div>
              <div className="col-sm-6">
                <div class="form-group">
                  <label for="exampleInputEmail1">Instruments*</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Instrument"
                    onChange = {(e)=> {
                      setInstrument(e.target.value);
                    }}
                    required
                  /><br/>
                  <label for="exampleInputEmail1">Sub Category</label>
                  <select className="form-control" id="subCategory" name="subCategory" required>
                    <option>Select</option>
                    {SubCategories.map((sub) => {
                      return <option>{sub}</option>;
                    })}
                  </select><br/>
                  <label for="exampleInputEmail1">Facebook Link*</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange = {(e)=> {
                      setFacebookLink(e.target.value);
                    }}
                    placeholder="Facebook Link*"
                  />
                    <p style = {{color : "#ffe800"}}>Enter the facebook embed page link</p>
                  <label for="exampleInputEmail1">Preview Images*</label>
                  <input
                    type="file"
                    style = {{height : "35px"}}
                    name="sampleimages[]"
                    id="sampleimages"
                    class="form-control form-control-sm"
                    multiple="true"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    accept="image/png, image/jpeg"
                    onChange = {(e) => {
                      setPreviewPages(e.target.files)
                    }}
                    placeholder="Facebook Link*"
                    multiple
                  />
                  <br/>
                    <label for="exampleInputEmail1">Price*</label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    class="form-control form-control-sm"
                    id="exampleInputprice"
                    aria-describedby="priceHelp"
                    onChange = {(e)=> {
                      setPrices(e.target.value);
                    }}
                    placeholder="Cover price"
                    required
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
                  type="submit"
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
        </form>
      </Modal>
    </div>
  );
}
