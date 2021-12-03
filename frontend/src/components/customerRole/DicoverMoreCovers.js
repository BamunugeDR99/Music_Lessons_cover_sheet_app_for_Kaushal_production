import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { storage } from "../../Configurations/firebaseConfigurations";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
export default function DiscoverMoreCovers(props) {
  const [recommenedCovers, setRecommendedCovers] = useState([]);
  const [ErrorhandlingTxt, setErrorhandlingTxt] = useState("");
  //const MainCategory = "Classical Guitar Covers";
  //const SubCategory = "Sinhala";
  let finalFilteredCovers = [];
  const MainCategory = props.mainCategory;
  const SubCategory = props.subCategory;
  useEffect(() => {
    async function getRecommendCovers() {
      // console.log(MainCategory, SubCategory);
     await axios
        .get("https://kaushal-rashmika-music.herokuapp.com/covers/getCovers")
        .then((res) => {
          let availableCovers = res.data.filter(
            (recCovers) => String(recCovers.Status) != "3"
          );

          availableCovers = availableCovers.filter(
            (recCovers) => String(recCovers.Status) != "2"
          );

          finalFilteredCovers = availableCovers.filter(
            (covers) =>
              covers.MainCategory === MainCategory &&
              covers.SubCategory === SubCategory
          );

          if (finalFilteredCovers.length === 0) {
            setErrorhandlingTxt("No more Reccomendations found!");
          } else {
            setErrorhandlingTxt("");
          }
          setRecommendedCovers(finalFilteredCovers);

        })
        .catch((err) => {
          alert(err);
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
          document.getElementById("temp"+index).hidden = true;
          document.getElementById(index).hidden = false;
        })
        .catch((err) => {
          setErrorhandlingTxt("Reccomended covers are not available right now!")
          //document.getElementById(index).src = "/images/imageplaceholder.png";
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
                id={"temp"+index}
                src={"/images/imageplaceholder.png" }
                class="card-img-top"
                alt="..."
                style={{ borderRadius: "15px 15px 0px 0px", height: "350px" }}
              />
              <img
              hidden
                id={index}
                src={
                  displayImages(covers.PreviewPages[0], index) }
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