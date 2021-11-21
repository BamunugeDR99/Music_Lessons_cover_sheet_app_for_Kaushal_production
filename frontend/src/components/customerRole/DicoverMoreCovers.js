import React, { useState, useEffect } from "react";
import axios from "axios";
export default function DiscoverMoreCovers(props) {
  const [Covers, setCovers] = useState([]);
  const [recommenedCovers, setRecommendedCovers] = useState([]);

  const MainCategory = props.MainCategory;
  const SubCategory = props.SubCategory;
  let mapNumber = [];
  useEffect(() => {
    function getRecommendCovers() {
      axios
        .get("http://localhost:8070/covers/getCovers")
        .then((res) => {
          setCovers(res.data);
          // let a =  res.data.filter(
          //   (covers) =>
          //     covers.MainCategory === MainCategory &&
          //     covers.SubCategory === SubCategory
          // );
          // console.log(a)
          setRecommendedCovers(
            res.data.filter(
              (covers) =>
                covers.MainCategory === MainCategory &&
                covers.SubCategory === SubCategory
            )
          );
          calculateRows();
          //console.log(recommenedCovers)
        })
        .catch((err) => {
          alert(err);
        });
    }

    getRecommendCovers();
  }, []);

  function calculateRows() {
    let numberOfRows = Math.round(recommenedCovers.length / 3);
    // console.log(numberOfRows)
    for (let i = 0; i < numberOfRows; i++) {
      mapNumber.push(i);
    }
    // console.log(mapNumber)
  }
  return (
    // 3 cards will be shown  so there needs to be 2 maps
    <div className="container-lg">
      <br />
      {/* <h1>{props.message}</h1> */}
      <h1 style={{ textAlign: "center", color: "#764A34" }}>
        <b>Dicover more!</b>
      </h1>
      <br />
      <h3 style={{ textAlign: "left", color: "#000000" }}>
        <b>Our Reccomandations</b>
      </h3>
      <div className="discoverBody">
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            {/* one row */}

            <div class="carousel-item active">
              <div class="cards-wrapper">
                {/* Single card */}

                {/* {mapNumber.map((number, index) => {
                  {
                    recommenedCovers.map((covers, index) => {
                      if (index == 1) {
                        return (
                          <div class="card">
                            <img
                              src={"/images/istockphoto-1127565686-170667a.jpg"}
                              class="card-img-top"
                              alt="..."
                            />
                            <div class="card-body">
                              <h5 class="card-title">Card title</h5>
                              <p class="card-text">
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                              </p>
                              <a href="#" class="btn btn-primary">
                                Go somewhere
                              </a>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div class="card d-none d-md-block">
                            <img
                              src={"/images/istockphoto-1127565686-170667a.jpg"}
                              class="card-img-top"
                              alt="..."
                            />
                            <div class="card-body">
                              <h5 class="card-title">Card title</h5>
                              <p class="card-text">
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                              </p>
                              <a href="#" class="btn btn-primary">
                                Go somewhere
                              </a>
                            </div>
                          </div>
                        );
                      }
                    });
                  }
                })} */}
              </div>
            </div>

            {/* <div class="carousel-item ">
              <div class="cards-wrapper">
                {/* Single card 
                <div class="card">
                  <img
                    src={"/images/istockphoto-1127565686-170667a.jpg"}
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" class="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
                <div class="card d-none d-md-block">
                  <img
                    src={"/images/istockphoto-1127565686-170667a.jpg"}
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" class="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
                <div class="card d-none d-md-block">
                  <img
                    src={"/images/istockphoto-1127565686-170667a.jpg"}
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" class="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
            </div> */}
            {/* controls  */}
            <a
              class="carousel-control-prev"
              href="#carouselExampleControls"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleControls"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
