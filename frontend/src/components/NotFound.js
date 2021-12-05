import React, { useState, radix } from "react";
import axios from "axios";
import "../css/notFoundStyles.css"
import { Link } from "react-router-dom";

export default function NotFound(props) {
  return (
  <div className = "notFound">
<h1>404 Error Page</h1>
<h1>Page Not Found</h1>

<section class="error-container">
  <span class="four"><span class="screen-reader-text">4</span></span>
  <span class="zero"><span class="screen-reader-text">0</span></span>
  <span class="four"><span class="screen-reader-text">4</span></span>
</section>
</div>)
}

// export default AddStudent;
