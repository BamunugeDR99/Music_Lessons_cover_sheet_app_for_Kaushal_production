// import React, { useEffect, useState } from 'react'
// // import { TextField, validator } from 'react-textfield';
// // import Autocomplete from '@material-ui/lab/Autocomplete';
// import Autocomplete from "react-google-autocomplete";
// import axios from 'axios';

// export default function Search(props){

//   const [myOptions, setMyOptions] = useState([])
//   const [opID, setMyOpID] = useState([])
//   const [covers, setCovers] = useState([])
//   let [value, setValue]=useState([]);
  
//   let number=0;
      
//   useEffect(()=>{
//       function getData(){
//           axios
//               .get("https://kaushal-rashmika-music.herokuapp.com/covers/getcovers")
//               .then((res) => {
//                   // console.log(res.data)
//                   setCovers(res.data)
//                   for (var i = 0; i < res.data.length; i++) {
//                       myOptions.push(res.data[i].Title)
//                       opID.push(res.data[i]._id)
//                       // console.log(res.data[i]._id)
//                   }
//                    setMyOptions(myOptions)
  
//                   }).catch((err) => {
//                       alert(err);
//                     });        
                 
//       }
//   getData();
//   },[])
  
  
//   // console.log(covers)
  
  
//       function getDataFromAPI(value, id){  
//           console.log(value)
//           // console.log(myOptions)
//           // axios.get("https://kaushal-rashmika-music.herokuapp.com/covers/getcovers")
//           // .then((res)=>{
//             // console.log(res.data)
            
//             for(let i = 0; i < myOptions.length; i++){
//                 if(myOptions[i].Title == value){
//                   // number=1;
//                   console.log("Successful")
//                 }
//                 else{
//                   console.log('Unsuccesful')
//                 }
//             }
//             // if(number==1){
//             //   console.log("Successful")
//             // }
//             // else{
//             //   console.log('Unsuccesful')
//             // }
//           // })
//       }
  
      
//       // function searched(){
//       //    if(number==1){
//       //         console.log("Successful")
//       //       }
//       //       else{
//       //         console.log('Unsuccesful')
//       //       }
//       // }
  
  
//   return (
//       // <div className="row">
//     <div style={{margin:'20px'}}>
//     <Autocomplete
//       style={{ width: 500 }}
//       freeSolo
//       autoComplete
//       autoHighlight
//       options={myOptions}
//       renderInput={(params) => (
//       <input {...params}
//           onChange={(e) => {getDataFromAPI(e.target.value);}}
//         // onClick={getDataFromAPI}
//         variant="outlined"
//         label="Search Box"
//       />
//       )}
          
//     />
//        <button class="btn" type="submit" style={{color:"#764A34", border: "2px solid #764A34"}} 
//       onClick={() => { props.history.push("/customer/detailedcover/" + opID) }}
//         >Search</button>
//       <br/><br/>
      
//     </div>
      
//       /* </div> */
//   );
//   }
  

// // import React, { useState } from "react";
// // import axios from "axios";
// // // import AddStudent2 from "./addStudent2";
// // import $ from "jquery";
// // import "../../css/searchBarStyles.css";
// // import {Link} from 'react-router-dom';
// // export default function AddStudent(props) {
// //   // function increment(){

// //   //   // if( completedIncrements.indexOf("#cart1") == -1 ) {
// //   //     var count = parseInt($("#countHolder").text());
// //   //      $("#countHolder").html(count + 1);

// //   //       completedIncrements.push("#cart1");
// //   //   }
// //   // }
// //   //     <div className="container">
// //   //         <div id="cart1" class="addcart" onClick = {increment}>Add Cart</div>
// //   //         <i class="fa" style={{fontSize:"24px"}}>&#xf07a;</i>
// //   // <span class='badge badge-warning' id='lblCartCount'> 5 </span>
// //   //     </div>

// //   const [status, setStatus] = useState(0);
// //   function test() {
// //     const searchWrapper = document.querySelector("#searchInput");
// //     if (status == 0) {
// //       searchWrapper.classList.add("active");
// //       setStatus(1);
// //     }else{
// //         searchWrapper.classList.remove("active");
// //         setStatus(0);
// //     }
// //   }
// //   return (
// //     <div className="MainSearchBar">
// //         // link
// //        <button> <Link to = "/b"> cfc</Link></button>
// //       <div class="wrapper">
// //         <div class="search-input" id="searchInput">
// //           <a href="" target="_blank" hidden></a>
// //           <input type="text" placeholder="Type to search.." />
// //           <div class="autocom-box">
// //             {/* <!-- here list are inserted from javascript --> */}
// //             <li>d</li>
// //             <li>d</li>
// //             <li>d</li>
// //           </div>
// //           <div class="icon" onClick={test}>
// //             <svg
// //               xmlns="http://www.w3.org/2000/svg"
// //               width="16"
// //               height="16"
// //               fill="currentColor"
// //               class="bi bi-search"
// //               viewBox="0 0 16 16"
// //             >
// //               <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
// //             </svg>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // export default AddStudent;

