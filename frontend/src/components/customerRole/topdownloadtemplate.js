import React from "react";

export default function TopDownloadTemplate() {
  return (
    <div>
      <div
        className="card"
        style={{
          width: "col-md-12",
          lineHeight: "2em",
          border: "solid #764A34",
        }}
      >
        <img
          className="card-img-top"
          src="images/images.jpeg"
          alt="Card image cap"
        />
        <div className="card-body">
          <center>
            <h7 className="card-title">Hall of Fame</h7>
            <br />

            <div className="row">
              <div className="col-md-6">
                <p className="card-title">Ryan Teddar</p>
              </div>
              <div className="col-md-6">
                <p className="card-title " style={{ color: "#764A34" }}>
                  Rs.150.00
                </p>
              </div>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
}
