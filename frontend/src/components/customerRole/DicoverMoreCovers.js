import React, { useState, useEffect } from "react";
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
    <div>
      <h5 style={{ textAlign: "center", color: "#D0193A" }}>
        {ErrorhandlingTxt}
      </h5>
      <br />
      <Carousel responsive={responsive}>
        {recommenedCovers.map((covers, index) => {
          return (
            <div
              class="card"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
                borderRadius: "15px",
                marginRight: "15px",
                marginLeft: "15px",
              }}
            >
              <img
                id={index}
                src={
                  displayImages(covers.PreviewPages[0], index) ||
                  "/images/Imageplaceholder.png"
                }
                class="card-img-top"
                alt="..."
                style={{ borderRadius: "15px 15px 0px 0px", height: "350px" }}
              />
              <div class="card-body">
                <h4 class="card-title" style={{ fontWeight: "bold" }}>
                  {covers.Title}
                </h4>
                <h5>{covers.OriginalArtistName}</h5>
                <h5>{covers.MainCategory}</h5>
                <h5>{covers.SubCategory}</h5>
                <h3 style={{ float: "right", color: "#764A34" }}>
                  <b>US$ {covers.Price}</b>
                </h3>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
