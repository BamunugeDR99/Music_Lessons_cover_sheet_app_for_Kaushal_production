import React, { useState, useEffect } from "react";
import "../../css/login.css";

export default function Test(props){

    return(
        <div>

<div class="card mb-3" style={{maxWidth:"500px"}}>
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src="images/back1.jfif" style={{height:"200px"}} class="card-img" alt="..." />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>


<div class="card">
  <img src="https://codingyaar.com/wp-content/uploads/bootstrap-4-card-image-left-demo-image.jpg" class="card-img-top" />
  <div class="card-body">
    <h5 class="card-title">Card Title</h5>
    <p class="card-text">
      Some quick example text to build on the card title and make up the
      bulk of the card's content.
    </p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>


        </div>
    )
}