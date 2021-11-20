import React from "react";

export default function CoverTemplate(props) {
  return (
    <div>
      <div
        className="card"
        style={{
          width: "col-md-3",
          lineHeight: "1em",
          borderRadius: "10px",
        }}
      >
        <img
          className="card-img-top"
          src="images/mike.jpeg"
          alt="Card image cap"
          style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
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
              {props.name}
            </p>
            <p
              style={{ paddingLeft: "8px", fontSize: "14px" }}
              className="card-title  col-xs-12"
            >
              {props.artist}
            </p>
            <h6
              style={{ addingLeft: "8px", color: "#764A34" }}
              className="card-title col-xs-12"
            >
              ${props.price}
            </h6>
          </center>
        </div>
      </div>
    </div>
  );
}
