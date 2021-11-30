import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import $ from "jquery";

export default function EditMainCategories(props) {

    // const [modelOpen, setmodelOpen] = useState(false);
//     const [modelOpen1, setmodelOpen1] = useState(false);
    const [modelOpen2, setmodelOpen2] = useState(false);

//     const [value1, setValue1] = useState("");
//     const [value2, setValue2] = useState("");

//     const [mainValue, setMainValue] = useState("");
//     let [subValue, setSubValue] = useState("");
//     const [mainValue1, setMainValue1] = useState("");
//     let [subValue1, setSubValue1] = useState("");

    let [todos, setTodos] = useState([]);
//     const [todos1, setTodos1] = useState([]);

    let [covers, setCovers]=useState([]);

    const [SubCat, setSubCat]=useState([]);
    const [value, setValue]=useState([]);
    const [category, setCategory]=useState([]);
    const [category2, setCategory2]=useState([]);
    const [classical, setClassical]=useState([]);
    const [exercise, setExercise]=useState([]);

    const [empty, setEmpty]=useState([]);

    let cover= [];
    let number=0;
    let no=0;


    useEffect(()=>{
        function getClassical(){
            
            axios.get("http://localhost:8070/mainCategory/get/")
            .then((res)=>{
              // console.log(res.data)
              const filter1 = res.data.filter(
                (classic) => classic._id == "61936e9d9ea7c21aebd01113"
              );
                setClassical(filter1);
                setCategory(filter1[0].SubCategories)

                console.log(filter1[0].SubCategories)

                const filter2 = res.data.filter(
                  (classic) => classic._id == "619deb0ca35d670b4e68ec3e"
                  // objectId
                );
                  // console.log(filter2)
                  setExercise(filter2);
                  setCategory2(filter2[0].SubCategories)
                  console.log(filter2[0].SubCategories)

                $(document).ready(function () {
                  $("#example").DataTable();
                });  

                $(document).ready(function () {
                  $("#example2").DataTable();
                });  
            })
            .catch((err)=>{
                alert(err);
            });
        }
        getClassical();
    },[]);


      function deleteMainCategory(classic) {
        // console.log(classic)

        axios.get("http://localhost:8070/covers/getCovers/")
        .then((res)=>{
          // console.log(res.data)
          
          for(let i = 0; i < res.data.length; i++){
              if(res.data[i].SubCategory === classic){
                number=1;
              }
              else{
                // number=2;
              }
        
          }

          if(number==1){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Can not delete this Category!',
              footer: 'There are music covers available under this Category!'
            })
          }
          else{
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
                  .delete(`http://localhost:8070/mainCategory/deleteSubCategory/${classic}/61936e9d9ea7c21aebd01113`)
                  .then((res) => {
              // let afterDelete = abc.splice(index, 1);
              // setabc(afterDelete);
                  Swal.fire("Deleted!", "Your file has been deleted.", "success");
                  // getClassical();
                  window.location.reload();
                })
                .catch((err) => {
                  alert(err);
                });
                }
              });
          }
        })
      }

      function deleteMainCategory1(classic) {
        axios.get("http://localhost:8070/covers/getCovers/")
        .then((res)=>{

          for(let i = 0; i < res.data.length; i++){
              if(res.data[i].SubCategory === classic){
                number=1;
              }
              else{
              }
          }
          if(number==1){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Can not delete this Category!',
              footer: 'There are music covers available under this Category!'
            })
          }
          else{
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
                  .delete(`http://localhost:8070/mainCategory/deleteSubCategory/${classic}/619deb0ca35d670b4e68ec3e`)
                  .then((res) => {
              // let afterDelete = abc.splice(index, 1);
              // setabc(afterDelete);
                  Swal.fire("Deleted!", "Your file has been deleted.", "success");
                  window.location.reload();

                })
                .catch((err) => {
                  alert(err);
                });
                }
              });
          }
        })
      }



    function modalopen2() {
        setmodelOpen2(true);
      }
      function modalClose2() {
        setmodelOpen2(false);
      } 
    
    function sendData() {
      console.log(SubCat)
      if(SubCat != ""){
      axios.get("http://localhost:8070/mainCategory/get")
        .then((res)=>{
          console.log(res.data)
          for(let i = 0; i < res.data.length; i++){
            for(let j = 0; j < res.data.length +5; j++){
              if(res.data[i].SubCategories[j] === SubCat){
                no=1;
              }
              else{
              }
              console.log(res.data[i].SubCategories[i])
            }
          }
          if(no==1){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Category Already Exists',
            })
          }
          else{
            if(value==1){

              category.push(SubCat)
              console.log(category);
              console.log(SubCat[0]);
                    
              let updatedCategory = {      
                  SubCategories : category,
                  UpdatedDateAndTime : Date(),
                }
                console.log(updatedCategory);
                  axios
                    .put("http://localhost:8070/mainCategory/ClassicalUpdate/61936e9d9ea7c21aebd01113" , updatedCategory)
                    .then((res) => {           
                      // alert("Success")                   
                      Swal.fire("All Done!", "New Category Added", "success");
                      
                    // props.history.push("/Customer/Home");
                      modalClose2();
                      setSubCat("")
                    })
                     .catch((err) => {
                      console.log(err);
                    });  
            }
            else if(value==2){
    
              category2.push(SubCat)
              console.log(category2);
              console.log(SubCat[0]);
                    
              let updatedCategory = {     
                  SubCategories : category2,
                  UpdatedDateAndTime : Date(),
                }
                console.log(updatedCategory);
                  axios
                    .put("http://localhost:8070/mainCategory/ExerciseUpdate/619deb0ca35d670b4e68ec3e" , updatedCategory)
                    .then((res) => {                              
                      Swal.fire("All Done!", "New Category Added", "success");
                      
                      modalClose2();
                      setSubCat("")
                    })
                    .catch((err) => {
                      console.log(err);
                    });  
            }
            else{
              Swal.fire('Please select a category')
            }
          }
        })
        console.log(value)
      }else{
        Swal.fire('Please fill the Sub Category')
      }
       
      }


  return (
     
<div className="container">
{/* <div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div> */}
<br/>
    <br/>
                {/* <div class="input-group mb-3">
                        <input
                        type="text"
                        class="form-control"
                        placeholder="Search By Categories"
                        onChange={(e) => handleSearch(e.target.value)}
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        />
                        <div class="input-group-append"></div>
                        <br />
                    </div> */}
                    <div class="row">
{/* <div class="col-sm text-right">
  <h2 style={{color:'#764A34'}}>Categories</h2>
  </div> */}
            <div class="col-sm text-right">
                <button type="button" class='btn' style={{backgroundColor:'#279B14', color:'white'}}onClick={() => modalopen2()}><i class="fa fa-plus"></i> Add New</button>
            </div>
            </div>
            <br/><br/>
<div className="row" 

// style={{boxSizing: 'border-box',  display:'flex'}}
>
           
    
    <div className="col-sm text-center">

    <div class="table-title text-left">
          <div class="row ">
              <div class="col">
                  <h4>
                Classical Guitar Covers
                </h4></div>
          </div>
          <br/>
        </div>
            <table class="table table-striped table-bordered">
              <thead>
                  <tr>
                    <th scope="col">Sub Categories</th>
                    <th scope="col">Action</th>
                  </tr>
              </thead>
            <tbody>
            {/* {console.log(category)} */}
                            {category.map((classic, index)=>{
                                return(
                <tr>
                <td>{classic}</td>
                <td>
                <button style={{ border:'2px solid #D0193A', borderRadius:'5px' }} 
                                onClick={() => deleteMainCategory(classic)}
                                >
                                {/* {alert(index)} */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" style={{color:'#D0193A'}}>
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                </button> 
                </td>
                </tr>

            )
            })}

            </tbody>
            </table>
            <br/>
            </div>
{/* <div className='col-sm'> */}

<br/>
    <br/>
    <div className="col-sm text-center">

<div class="table-title text-left">
      <div class="row ">
          <div class="col">
              <h4>
              Guitar Technics & Lessons
         
            </h4></div>
            
      </div>
      <br/>
    </div>
        <table class="table table-striped table-bordered">
        <thead>
            
            <tr>
            <th scope="col">Sub Categories</th>
            <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
        {/* {console.log(category)} */}
                        {category2.map((classic, index)=>{
                            return(
            <tr>
            <td>{classic}</td>
            <td>
            <button style={{ border:'2px solid #D0193A', borderRadius:'5px' }} 
                            onClick={() => deleteMainCategory1(classic)}
                            >
                            {/* {alert(index)} */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" style={{color:'#D0193A'}}>
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                            </button> 
            </td>
            </tr>

        )
        })}

        </tbody>
        </table>
            </div>
</div>
<br/><br/>

{/* Addnew Sub Category */}

<Modal show={modelOpen2} size="lg">
  {/* <form> */}
        <Modal.Header>
        <div className="row text-center">
              <h3 >&ensp;Add a new Sub Category</h3> 
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
                  <select className="browser-default custom-select" id="main" onChange={(e) => {setValue(e.target.value);}} required="true">
                    <option value="0">Select a category</option>
                    <option value="1">Classical Guitar Covers</option>
                    <option value="2">Guitar Technics & Lessons</option>
                  </select>
                 
                </div>
                <small id="textHelp" class="form-text text-muted"></small>
                
                </div>
            </div>
            <div className="col-sm">
            <div class="form-group">
                <label for="exampleInputText">Sub Categories </label>               
                <input type="text" class="form-control" id="inputText" required
                 onChange={(e) => {setSubCat(e.target.value);}}
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
              <button type="submit" class="btn"
                  style={{ borderRadius: "10px", backgroundColor: "#28A745",color: "white",}}
                  onClick={sendData}>
                  <strong>Save</strong> 
              </button>
                {/* <input  type="submit" class="btn btn-primary"
                  style={{borderRadius: "10px",backgroundColor: "#28A745",color: "white",}}
                  required
                  onClick={sendData} /> */}
                  {/* abc */}
                  
              </center>
            </div>

          </div>
        </Modal.Footer>
        {/* </form> */}
      </Modal>
</div>
  );
}

