import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import $ from "jquery";
import "../css/toogle.css"

export default function EditCategories(props) {

    const [modelOpen, setmodelOpen] = useState(false);
    const [modelOpen1, setmodelOpen1] = useState(false);
    const [modelOpen2, setmodelOpen2] = useState(false);

    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");

    const [mainValue, setMainValue] = useState("");
    let [subValue, setSubValue] = useState("");
    const [mainValue1, setMainValue1] = useState("");
    let [subValue1, setSubValue1] = useState("");

    const [todos, setTodos] = useState([]);
    const [todos1, setTodos1] = useState([]);

    const [Name, setName]=useState([]);

    const [SubCat, setSubCat]=useState([]);
    const [value, setValue]=useState([]);
    const [category, setCategory]=useState([]);
    const [category2, setCategory2]=useState([]);
    const [classical, setClassical]=useState([]);
    const [exercise, setExercise]=useState([]);

    const [switchToogled, setSwitchToogled]=useState([]);

    useEffect(()=>{
        function getClassical(){
            
            axios.get("https://kaushal-rashmika-music.herokuapp.com/mainCategory/get/")
            .then((res)=>{
              console.log(res.data)
              const filter1 = res.data.filter(
                (classic) => classic._id == "61936e9d9ea7c21aebd01113"
              );
                setClassical(filter1);
                setCategory(filter1[0].SubCategories)

                filter1.map((post1) => {
                  classical.push(post1.SubCategories);
                });

                const filter2 = res.data.filter(
                  (classic) => classic._id == "619deb0ca35d670b4e68ec3e"
                  // objectId
                );
                  console.log(filter2)
                  setExercise(filter2);
                  setCategory2(filter2[0].SubCategories)

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


      


      function sendData() {
        console.log(value)
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
                .put("https://kaushal-rashmika-music.herokuapp.com/mainCategory/ClassicalUpdate/61936e9d9ea7c21aebd01113" , updatedCategory)
                .then((res) => {                              
                  alert("success");
                  modalClose2();
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
                .put("https://kaushal-rashmika-music.herokuapp.com/mainCategory/ExerciseUpdate/619deb0ca35d670b4e68ec3e" , updatedCategory)
                .then((res) => {                              
                  alert("success");
                  modalClose2();
                })
                .catch((err) => {
                  console.log(err);
                });  
        }
        else{
          alert("Select A Category")
        }
      }



      // const [state, setState] = useState(category);

      // const  updateCategory = () => {
      //   let temp_state = [category];
      //   let temp_element = {subValue};
      //   alert(subValue)
      //   temp_element.counter = temp_element.counter+1;
      //   temp_state[0] = temp_element;
      //   setState( temp_state );
      //   alert(category)
      //   console.log(category)
      // }
      

   

      function updateCategory(index, subValue){
        console.log(subValue)
        console.log(index)
        const newTodos = [category];
        newTodos[index] = subValue;
        setTodos(newTodos);
        // alert(index)
        alert(category)
        alert(newTodos)
      }



      function deleteMainCategory(subValue){
        console.log(subValue)
        const newTodos = category.filter((t) => t !== subValue);
        setTodos(newTodos);
        // alert(newTodos)
        console.log(todos)

        // let deletedCategory = {     
        //   SubCategories : todos,
        //   UpdatedDateAndTime : Date(),
        // }
        // console.log(deletedCategory);
        //   axios
        //     .put("https://kaushal-rashmika-music.herokuapp.com/mainCategory/ClassicalUpdate/61936e9d9ea7c21aebd01113" , deletedCategory)
        //     .then((res) => {                              
        //       // alert("success");
        //       modalClose2();
        //     })
        //     .catch((err) => {
        //       console.log(err);
        //     });  
    
       
        alert(category)
      }

      const deleteMainCategory1 = (subValue1) => {
        console.log(subValue1)
        const newTodos1 = category2.filter((t) => t !== subValue1);
        setTodos1(newTodos1);
        // alert(newTodos)
        console.log(todos1)

        // let deletedCategory1 = {     
        //   SubCategories : todos1,
        //   UpdatedDateAndTime : Date(),
        // }
        // console.log(deletedCategory1);
        //   axios
        //     .put("https://kaushal-rashmika-music.herokuapp.com/mainCategory/ExerciseUpdate/619deb0ca35d670b4e68ec3e" , deletedCategory1)
        //     .then((res) => {                              
        //       alert("success");
        //       modalClose2();
        //     })
        //     .catch((err) => {
        //       console.log(err);
        //     }); 
      }





      // const deleteMainCategory = (subValue,index) => {
      //   const newTodos = {category}
      //   delete newTodos[subValue.index]
      //   setTodos(newTodos);
      //   console.log(subValue)
      //   console.log(newTodos)
      //   console.log(category)
      // }

      // const deleteMainCategory = (subValue) => {
      //   console.log(subValue)
      //   const newTodos = {category}
      //   delete newTodos[category.index]
      //   setTodos(newTodos);
      // }


      function updateCategory1(id) {
        console.log();

        let updatedCategory = {
            
            SubCategories : [],
            UpdatedDateAndTime : Date(),
          };

          console.log(updatedCategory);
            axios
              .put("https://kaushal-rashmika-music.herokuapp.com/mainCategory/update/" + id, updatedCategory)
              .then((res) => {
                               
                alert("success");
              })
              .catch((err) => {
                console.log(err);
              });     
      }

//  const [list, updateList] = useState(category);

//       const handleRemoveItem = (e) => {
//        const name = e.target.getAttribute([0])
//         updateList(list.filter(classic => classic !== name));
//       };

    // function deleteMainCategory(id) {
    //     console.log(id);
    //     axios
    //       .delete("https://kaushal-rashmika-music.herokuapp.com/mainCategory/delete/" + id)
    //       .then((res) => {
    //         // let afterDelete = abc.splice(index, 1);
    //         // setabc(afterDelete);
    
    //         Swal.fire({
    //           title: "Are you sure?",
    //           text: "You won't be able to revert this!",
    //           icon: "warning",
    //           showCancelButton: true,
    //           confirmButtonColor: "#3085d6",
    //           cancelButtonColor: "#d33",
    //           confirmButtonText: "Yes, delete it!",
    //         }).then((result) => {
    //           if (result.isConfirmed) {
    //             Swal.fire("Deleted!", "Your file has been deleted.", "success");
    //           }
    //         });
    //       })
    //       .catch((err) => {
    //         alert(err);
    //       });
    //   }

        function modalopen(val) {
          setMainValue("Classical Guitar Covers")
          setSubValue(val)
          setmodelOpen(true);
        }
        function modalClose() {
          setmodelOpen(false);
        }
        function modalopen1(val1) {
            setMainValue1("Exercise And Techniques")
            setSubValue1(val1)
            setmodelOpen1(true);
          }
          function modalClose1() {
            setmodelOpen1(false);
          }
          function modalopen2() {
            setmodelOpen2(true);
          }
          function modalClose2() {
            setmodelOpen2(false);
          }      
          function refresh(v2) {
            window.location.reload();
          }

  return (
     
 <div className="container">
      <br/>
      <br/>
      <div class="col text-right">
                <button type="button" class="btn btn-info add-new " onClick={() => refresh()}><i class="bi bi-arrow-clockwise"></i></button>
                <button type="button" class="btn btn-info add-new " onClick={() => modalopen2()}><i class="fa fa-plus"></i> Add New</button>
            </div>
            <br/>
       <div>     
        <div class="table-title">
          <div class="row ">
              <div class="col-sm-8"><h2>
                Classical Guitar Covers
                </h2></div>
          </div>
        </div>
  
          <table class="table table-striped text-center table-bordered" id="example" style={{border:"1px solid Lightgrey"}}>
      
            <thead>
                <tr>
                    <th scope="col">Sub Category</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
            {console.log(category)}
                {category.map((classic, index)=>{
                    return(
            <tr>
                <td>{classic}<br/>
                <br/>
                </td>
                <td>
                    &ensp;
                    <button style={{ border:'2px solid #279B14', borderRadius:'5px' }} onClick={() => modalopen(classic, index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16" style={{color:'#279B14'}}>
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </button>
                    &ensp;
                    <button style={{ border:'2px solid #D0193A', borderRadius:'5px' }} 
                    onClick={() => deleteMainCategory(classic,index)}
                    >
                      {/* {alert(index)} */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" style={{color:'#D0193A'}}>
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>    
                    &ensp;
                </td>
            </tr>
         )
        })}

            </tbody>
            </table>
</div>

{/* )
})} */}



            <div class="table-title">
        <div class="row ">
            <div class="col-sm-8"><h2>Guitar Technics & Lessons</h2></div>
            
        </div>
    </div>
  
          
    <table class="table table-striped text-center " id="example2" style={{border:"1px solid Lightgrey"}}>
              
              <thead>
                  <tr>
                      <th scope="col">Sub Category</th>
                      <th scope="col">Action</th>
                  </tr>
              </thead>
              <tbody>
              {console.log(category2)}
                  {category2.map((classic, index)=>{
                      return(
  
              <tr>
                  <td>{classic}<br/> 
                  <br/>
                  </td>
                  <td>
                      &ensp;
                      <button style={{ border:'2px solid #279B14', borderRadius:'5px' }} onClick={() => modalopen1(classic)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16" style={{color:'#279B14'}}>
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                          </svg>
                      </button>
                      &ensp;
                      <button style={{ border:'2px solid #D0193A', borderRadius:'5px'}} 
                      onClick={() => deleteMainCategory1(classic,index)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" style={{color:'#D0193A'}}>
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                          </svg>
                      </button>    
                      &ensp;
                  </td>
              </tr>
         )
        })}

        </tbody>
        </table> 

{/* Edit A sub category in Classical Guitar Covers*/}

<Modal show={modelOpen} size="lg">
        <Modal.Header>
            <div className="row text-center">
                    <h3 >&ensp;Editaaaa Your Sub Categories</h3> 
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
                <span type="email" class="form-control" id="exampleInputText"  aria-describedby="textHelp">{mainValue}</span>
                <small id="textHelp" class="form-text text-muted"></small>
                </div>
            </div>
            <div className="col-sm">
            <div class="form-group">
                <label for="exampleInputText">Sub Categories</label>
                <input type="text" class="form-control" id="sub" value={subValue} name="subs" onChange={(e) => {
              setSubValue(e.target.value);
              
            }}/>
            {/* {alert(subValue)} */}
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
                  onClick={() => updateCategory(classical.index)}
                  
                >
                  {console.log(classical.index)}
              {/* { alert(classical.index)} */}
                  <strong>Update</strong>
                </button>
                
              </center>
            </div>

          </div>
        </Modal.Footer>
      </Modal>





{/* Edit A sub category in Exercise and techniques*/}

<Modal show={modelOpen1} size="lg">
        <Modal.Header>
            <div className="row text-center">
                    <h3 >&ensp;Edit Your Sub Categories</h3> 
            </div>
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
            <div className="row text-center">
                    {/* <h3 >Edit Your Categories</h3> */}
            </div>
          </div>
          <div className="container">
            <div className="row">
            <div className="col-sm">
            <div class="form-group">
                <label for="exampleInputEmail1">Main Category</label>
                <span type="email" class="form-control" id="exampleInputText"  aria-describedby="textHelp">{mainValue1}</span>
                <small id="textHelp" class="form-text text-muted"></small>
                </div>
            </div>
            <div className="col-sm">
            <div class="form-group">
                <label for="exampleInputText">Sub Categories</label>
                <input type="text" class="form-control" id="sub" value={subValue1} name="subs" onChange={(e) => {
              setSubValue1(e.target.value);
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
                  onClick={() => updateCategory1()}
                >
              
                  <strong>Update</strong>
                </button>
                
              </center>
            </div>

          </div>
        </Modal.Footer>
      </Modal>



{/* Addnew Sub Category */}

<Modal show={modelOpen2} size="lg">
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
                <input type="text" class="form-control" id="inputText" required="true"
                 onChange={(e) => {setSubCat(e.target.value);}}
              />
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
<br/>
            </div>

  );
}


