import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import $ from "jquery";
import "../css/toogle.css"

export default function EditCategories(props) {

    const [modelOpen, setmodelOpen] = useState(false);
    const [modelOpen2, setmodelOpen2] = useState(false);
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");

    const [Name, setName]=useState([]);
    const [SubCategories, setSubCategories]=useState([]);
    const [category, setCategory]=useState([]);

    const [switchToogled, setSwitchToogled]=useState([]);

    let val = "";

    // var sub = category.SubCategories
    // sub.split =(" , ")
    // console.log(sub)

    // const objectId = localStorage.getItem("CustomerID");
    //         console.log(objectId)
    useEffect(()=>{
        function getCategory(){
            
            axios.get("http://localhost:8070/mainCategory/get")
            .then((res)=>{
                console.log(res.data)
                setCategory(res.data);

                $(document).ready(function () {
                  $("#example").DataTable();
                });  
                // console.log(category)
            })
            .catch((err)=>{
                alert(err);
            });
        }
        getCategory();
    },[]);


    // function selectCategory(){

    //   const category = document.getElementById("category").value;
  
    //   // const NameAdd = /^[a-zA-Z]+$/
  
    //    if(category.match(1)){
  
    //     val = 1;
  
    //    }else{
        
    //     flag2 = 0;
    //     alert("Invalid name!");
  
    //    }
      
    // }

    function sendData() {
 
        // e.preventDefault();
    
        const newCategory = {         
            Name,
            SubCategories,
        };   
        const newSubCategory = {         
          Name,
      };  
        console.log(newCategory);
    
        axios
          .post("http://localhost:8070/mainCategory/add", newCategory)
          .then(() => {
            alert("New Category Added Successfully");    
            
          })
          .catch((err) => {
            alert(err);
          });
      }


    function modalopen() {
        setmodelOpen(true);
      }
      function modalClose() {
        setmodelOpen(false);
      }
      function handleValue1(v1) {
        setValue1(value1);
      }
      function handleValue2(v2) {
        setValue2(v2);
      }
     

      function updateCategory(id) {
        console.log();

        let updatedCategory = {
            Name,
            SubCategories,
            UpdatedDateAndTime : Date(),
          };

          console.log(updatedCategory);
            axios
              .put("http://localhost:8070/mainCategory/update/" + id, updatedCategory)
              .then((res) => {
                               
                alert("success");
              })
              .catch((err) => {
                console.log(err);
              });     
      }

      // function changeState(id) {
      //   console.log(id);

      //   let updateState = {
      //       Status : 2
      //     };
      //       axios
      //         .put("http://localhost:8070/mainCategory/update" + id, updateState)
      //         .then((res) => {
                               
      //           alert("success");
      //         })
      //         .catch((err) => {
      //           console.log(err);
      //         });     
      // }

      const changeState =()=>{

        switchToogled ? setSwitchToogled(false) : setSwitchToogled(true);

        console.log(switchToogled)
      }


    function deleteMainCategory(id) {
        console.log(id);
        axios
          .delete("http://localhost:8070/mainCategory/delete/" + id)
          .then((res) => {
            // let afterDelete = abc.splice(index, 1);
            // setabc(afterDelete);
    
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
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
              }
            });
          })
          .catch((err) => {
            alert(err);
          });
      }

    
        function modalopen2() {
            setmodelOpen2(true);
          }
          function modalClose2() {
            setmodelOpen2(false);
          }
          function handleValue1(v1) {
            setValue1(value1);
          }
          function handleValue2(v2) {
            setValue2(v2);
          }


            

  return (
     
 <div className="container">
      <br/>
      <br/>
        <div class="table-title">
        <div class="row ">
            <div class="col-sm-8"><h2>Classical Guitar Covers</h2></div>
            <div class="col-sm-4 text-right">
                <button type="button" class="btn btn-info add-new " onClick={() => modalopen2()}><i class="fa fa-plus"></i> Add New</button>
            </div>
        </div>
    </div>
  
          
            <table class="table table-striped text-center " id="example" style={{border:"1px solid Lightgrey"}}>
              
            <thead>
                <tr>
                    {/* <th scope="col">#</th> */}
                    <th scope="col">Main Category</th>
                    <th scope="col">Sub Category</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
            {    console.log(category)}
                {category.map((cat)=>{
                    return(
            <tr>
                {/* <th scope="row">1</th> */}
                <td>{cat.Name}</td>
                <td>{cat.SubCategories}<br/>
                    
                <br/>

                </td>
                <td>

                    <label class="switch">
                                          <input type="checkbox"
                                          onClick={changeState}
                                          // onChange={(e) => changeState(e.target.value)}
                                          />
                                          <span class="slider round"></span>
                    </label>
                </td>
                <td>
                    
                    
                    &ensp;

                    <button style={{ border:'2px solid green', borderRadius:'5px' }} onClick={() => modalopen()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16" style={{color:'green'}}>
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </button>

                    &ensp;
                    
                    <button style={{ border:'2px solid red', borderRadius:'5px'}} 
                    onClick={() => deleteMainCategory(cat._id)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" style={{color:'red'}}>
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>    
                    &ensp;
                </td>
            </tr>

          
               
            
         )
        })}




{/* Addnew Sub Category */}

<Modal show={modelOpen2} size="lg">
        <Modal.Header>
        <div className="row text-center">
                    <h3 >&ensp;Add a new Category</h3>
                   
            </div>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={modalClose2}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            
            
          </div>
          <div className="container">
            <div className="row">
            <div className="col-sm">
            <div class="form-group">
                <label for="exampleInputEmail1">Main Category</label>
                <div>
                  <select className="browser-default custom-select">
                    <option>Select a category</option>
                    <option value="1">Classical Guitar Covers</option>
                    <option value="2">Guitar Technics & Lessons</option>
                  </select>
                  {/* onChange={(e) => {
              setName(e.target.value);
            }} */}
                </div>
                <small id="textHelp" class="form-text text-muted"></small>
                </div>
            </div>
            <div className="col-sm">
            <div class="form-group">
                <label for="exampleInputText">Sub Categories </label>
                
                <input type="text" class="form-control" id="exampleInput" onChange={(e) => {
              setSubCategories(e.target.value);
            }}/>
                <div className="text-right" >
                    <i class="fa fa-plus" ></i>
                </div>
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
                  class="btn btn-primary"
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#28A745",
                    color: "white",
                  }}
                  onClick={sendData}
                >
                  <strong>Save</strong>
                </button>
              </center>
            </div>

          </div>
        </Modal.Footer>
      </Modal>



{/* Edit A sub category */}

      <Modal show={modelOpen} size="lg">
        <Modal.Header>
            <div className="row text-center">
                    <h3 >&ensp;Edit Your Categories</h3> 
            </div>
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
            <div className="row text-center">
                    {/* <h3 >Edit Your Categories</h3> */}
            </div>
          </div>
          <div className="container">
            <div className="row">
            <div className="col-sm">
            <div class="form-group">
                <label for="exampleInputEmail1">Main Category</label>
                <input type="email" class="form-control" id="exampleInputText" aria-describedby="textHelp" onChange={(e) => {
              setName(e.target.value);
            }}/>
                <small id="textHelp" class="form-text text-muted"></small>
                </div>
            </div>
            <div className="col-sm">
            <div class="form-group">
                <label for="exampleInputText">Sub Categories</label>
                <input type="text" class="form-control" id="exampleInputText" onChange={(e) => {
              setSubCategories(e.target.value);
            }}/>
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
                  onClick={() => updateCategory()}
                >
              
                  <strong>Update</strong>
                </button>
                
              </center>
            </div>

          </div>
        </Modal.Footer>
      </Modal>
            </tbody>
            </table>

            </div>

  );
}


