import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
export default function DiscoverMoreCovers(props) {
  const [recommenedCovers, setRecommendedCovers] = useState([]);

  const MainCategory = props.MainCategory;
  const SubCategory = props.SubCategory;
  let mapNumber = [];
  useEffect(() => {
    function getRecommendCovers() {
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

  const numbers = [1, 2, 3, 4, 5, 67, 84];
  return (
    <div>
      <br />
      <Carousel responsive={responsive}>
        {recommenedCovers.map((num) => {
          return (
            <div className="container">
              <div class="card" style={{ width: "18rem" }}>
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#" class="card-link">
                    Card link
                  </a>
                  <a href="#" class="card-link">
                    Another link
                  </a>
                </div>
              </div>
            </div>
          );
        })}

        {/* <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div> */}
      </Carousel>
    </div>
  );
}
