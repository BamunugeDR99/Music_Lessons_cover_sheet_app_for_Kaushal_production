import React, { useState } from "react";
import axios from "axios";
import AddStudent2 from "./addStudent2";
import $ from "jquery";
import "../../css/searchBarStyles.css";
export default function AddStudent(props) {
  // function increment(){

  //   // if( completedIncrements.indexOf("#cart1") == -1 ) {
  //     var count = parseInt($("#countHolder").text());
  //      $("#countHolder").html(count + 1);

  //       completedIncrements.push("#cart1");
  //   }
  // }
  //     <div className="container">
  //         <div id="cart1" class="addcart" onClick = {increment}>Add Cart</div>
  //         <i class="fa" style={{fontSize:"24px"}}>&#xf07a;</i>
  // <span class='badge badge-warning' id='lblCartCount'> 5 </span>
  //     </div>

  const [status, setStatus] = useState(0);
  function test() {
    const searchWrapper = document.querySelector("#searchInput");
    if (status == 0) {
      searchWrapper.classList.add("active");
      setStatus(1);
    }else{
        searchWrapper.classList.remove("active");
        setStatus(0);
    }
  }
  return (
    <div className="MainSearchBar">
      <div class="wrapper">
        <div class="search-input" id="searchInput">
          <a href="" target="_blank" hidden></a>
          <input type="text" placeholder="Type to search.." />
          <div class="autocom-box">
            {/* <!-- here list are inserted from javascript --> */}
            <li>d</li>
            <li>d</li>
            <li>d</li>
          </div>
          <div class="icon" onClick={test}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default AddStudent;
