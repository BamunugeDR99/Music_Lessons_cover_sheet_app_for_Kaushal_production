import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { storage } from "../../Configurations/firebaseConfigurations";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
export default function DiscoverMoreCovers(props) {
  const [recommenedCovers, setRecommendedCovers] = useState([]);

  const MainCategory = "Classical Guitar Covers";
  const SubCategory = "Sinhala";
  //const MainCategory = props.mainCategory;
  //const SubCategory = props.subCategory;
  useEffect(() => {
    function getRecommendCovers() {
      // console.log(MainCategory, SubCategory);
      axios
        .get("http://localhost:8070/covers/getCovers")
        .then((res) => {
          const availableCovers = res.data.filter(
            (recCovers) => recCovers.Status != "3" || recCovers.Status != "2"
          );
          setRecommendedCovers(
            availableCovers.filter(
              (covers) =>
                covers.MainCategory === MainCategory &&
                covers.SubCategory === SubCategory
            )
          );
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

  function displayImages(coverImageName,index) {
    let imageUrl = "";
    const storageRef = ref(storage, `PreviewImages/${coverImageName}`);
   getDownloadURL(storageRef).then((url) => {
      // imageUrl = url;
      document.getElementById(index).src=  url;
      // "https://firebasestorage.googleapis.com/v0/b/kaushal-music-production-app.appspot.com/o/PreviewImages%2F923d10247b982186a4ebb24b7ba6fba8.jpg?alt=media&token=3441eb0f-dcfa-496f-93d2-0b59294462e9"
    });
    
  }

  return (
    <div>
      <br />
      <Carousel responsive={responsive}>
        {/* <div className="container"> */}
        {recommenedCovers.map((covers,index) => {
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
                id = {index}
                src = {displayImages(covers.PreviewPages[0],index) || "/images/Imageplaceholder.png"}
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
        {/* </div> */}
      </Carousel>
    </div>
  );
}
