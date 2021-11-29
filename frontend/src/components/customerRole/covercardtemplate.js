import React from "react";
import "./../../css/covercard.css";

export default function CoverTemplate(props) {
  return (
    <div>
      <main>
        <div className="container" style={{ position: "relative" }}>
          <div className="row ">
            <div className="col">
              <div className="cardcss h-100 shadow">
                {" "}
                <img
                  src="images/images.jpeg"
                  className="card-img-top"
                  alt="..."
                />
                <div className="label-top shadow-sm">{props.category}</div>
                <div className="card-body">
                  <center>
                    <h7 className="card-title">{props.title}</h7>
                    <br />

                    <div className="row">
                      <div className="col-md-12">
                        <p className="card-title">{props.artist}</p>
                      </div>
                      <div className="col-md-12">
                        <p className="card-title " style={{ color: "#764A34" }}>
                          ${props.price}
                        </p>
                      </div>
                    </div>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
