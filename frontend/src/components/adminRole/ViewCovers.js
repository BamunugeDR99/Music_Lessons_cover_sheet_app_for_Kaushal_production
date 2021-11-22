import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "../../css/toogle.css";
export default function ViewCovers(props) {
  $(document).ready(function () {
    $("#Covers").DataTable();
  });

  return (
    <div>
      <br />

      <div className="container-xxl" style={{ overflowX: "auto" }}>
        <h2 style={{ color: "#764A34" }}>
          <b>Classical Guitar Covers</b>
        </h2>
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
            <tr>
              <td>Tiger Nixon</td>
              <td>System Architect</td>
              <td>Edinburgh</td>
              <td>61</td>
              <td>2011/04/25</td>
              <td>$320,800</td>
              <td>2011/04/25</td>
              <td>$320,800</td>
              <td>
                {" "}
                <label class="switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                </label>
              </td>
              <td>
                <button className="btn-sm" style={{ display: "inline" }}>
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
                <button className="btn-sm" style={{ display: "inline" }}>
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
                <button className="btn-sm" style={{ display: "inline" }}>
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
    </div>
  );
}
