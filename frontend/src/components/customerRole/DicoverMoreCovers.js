import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
export default function DiscoverMoreCovers(props) {
  const [recommenedCovers, setRecommendedCovers] = useState([]);


  const MainCategory = "Guitar Technics & Lessons";
  const SubCategory = "Exercises";
  useEffect(() => {
    function getRecommendCovers() {

  // const MainCategory = props.mainCategory;
  // const SubCategory = props.subCategory;
  // console.log(MainCategory, SubCategory);
      axios
        .get("http://localhost:8070/covers/getCovers")
        .then((res) => {
          setRecommendedCovers(
            res.data.filter(
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


  return (
    <div>
      <br />
      <Carousel responsive={responsive}>
        {/* <div className="container"> */}
          {recommenedCovers.map((covers) => {
            return (
              <div
                class="card"
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
                  borderRadius: "15px",
                  marginRight : "15px",
                  marginLeft : "15px"
                }}
              >
                <img
                 src={"/images/"+covers.PreviewPages[0]}
                  class="card-img-top"
                  alt="..."

                  style={{ borderRadius: "15px 15px 0px 0px" , height : "350px"}}
                />
                <div class="card-body">
                  <h4 class="card-title" style={{ fontWeight: "bold" }}>
                    {covers.Title}
                  </h4>
                  <h5>{covers.OriginalArtistName}</h5>
                  <h5>{covers.MainCategory}</h5>
                  <h5>{covers.SubCategory}</h5>
                  <h3 style = {{float : "right", color : "#764A34"}}><b>US$ {covers.Price}</b></h3>

                </div>
              </div>
            );
          })}
        {/* </div> */}
      </Carousel>
    </div>
  );
}
