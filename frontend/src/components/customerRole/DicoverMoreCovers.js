import React, { useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { storage } from "../../Configurations/firebaseConfigurations";
import { ref, getDownloadURL } from "@firebase/storage";
import Swal from "sweetalert2";
export default function DiscoverMoreCovers(props) {
  const [recommenedCovers, setRecommendedCovers] = useState([]);
  const [ErrorhandlingTxt, setErrorhandlingTxt] = useState("");

  useEffect(() => {
    function getRecommendCovers() {
      const CoverID = props.CoverID;
      axios
        .get(`http://localhost:8070/covers/get/${CoverID}`)
        .then((res) => {
          const MainCategory = res.data.MainCategory;
          const SubCategory = res.data.SubCategory;
          axios
            .get("http://localhost:8070/covers/getCovers")
            .then((res) => {
              let availableCovers = res.data.filter(
                (recCovers) => String(recCovers.Status) != "3"
              );

              availableCovers = availableCovers.filter(
                (recCovers) => String(recCovers.Status) != "2"
              );

              availableCovers = availableCovers.filter(
                (covers) =>
                  covers.MainCategory === MainCategory &&
                  covers.SubCategory === SubCategory
              );

              availableCovers = availableCovers.filter(
                (covers) => covers._id != props.CoverID
              );

              setRecommendedCovers(availableCovers);

              if (availableCovers.length === 0) {
                setErrorhandlingTxt("No more Reccomendations found!");
              } else {
                setErrorhandlingTxt("");
              }
            })
            .catch((err) => {
              alert(err);
            });
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<p style = "color : #D0193A">Currently unavailable!',
          });
        });
    }

    getRecommendCovers();
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  async function displayImages(coverImageName, index) {
    if (recommenedCovers.length != 0) {
      const storageRef = ref(storage, `PreviewImages/${coverImageName}`);
      await getDownloadURL(storageRef)
        .then((url) => {
          document.getElementById(index).src = url;
        })
        .catch((err) => {
          ErrorhandlingTxt("Reccomended covers are not available right now!");
        });
    }
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
            </div>
            <div class="carousel-item">
              <div class="cards-wrapper">
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
            </div>
            <div class="carousel-item">
              <div class="cards-wrapper">
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
            </div>
          </div>
          {/* controls  */}
          <a
            class="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  );
}
