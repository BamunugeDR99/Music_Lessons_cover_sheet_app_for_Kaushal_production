import React from "react";

export default function CoverTemplate() {
  return (
    <div>
      <div
        className="card"
        style={{
          width: "col-md-4",
          lineHeight: "1em",
          border: "solid #764A34",
        }}
      >
        <img
          className="card-img-top"
          src="images/mike.jpeg"
          alt="Card image cap"
        />
        <div>
          <center>
            <p
              style={{
                paddingLeft: "8px",
                paddingTop: "8px",
                fontSize: "14px",
              }}
              className="card-title col-xs-12"
            >
              Hall of Fame
            </p>
            <p
              style={{ paddingLeft: "8px", fontSize: "14px" }}
              className="card-title  col-xs-12"
            >
              Ryan Teddar
            </p>
            <h6
              style={{ addingLeft: "8px", color: "#764A34" }}
              className="card-title col-xs-12"
            >
              Rs.150.00
            </h6>
          </center>
        </div>
      </div>
    </div>
  );
}
