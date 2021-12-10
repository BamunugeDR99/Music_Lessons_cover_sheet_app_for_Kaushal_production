import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { storage } from "../../Configurations/firebaseConfigurations";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";

import k from "../../images/pre.png";
import z from "../../images/s.png";


import "../../css/searchBarStyles.css";
import { TextField, validator } from "react-textfield";


export default function Home(props) {


  const [searchtext, setSearchtext] = useState("");
  const [suggest, setSuggest] = useState([]);
  const [resfound, setResfound] = useState(true);
  let [myOptions, setMyOptions] = useState([]);
  const [opID, setMyOpID] = useState([]);
  const [covers, setCovers] = useState([]);
  let [value, setValue] = useState([]);


  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
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

  let [Top4Downloads, setTop4Downloads] = useState([]);

  useEffect(async () => {
    function test() {
      axios
        .get("https://kaushal-rashmika-music.herokuapp.com/covers/getactive")
        .then((res) => {
          getTop4Downloads(res.data);
        })
        .catch((err) => {
          //console.log(err);
        });
    }

    function getData() {
      if (myOptions.length <= 0) {
        axios
          .get("https://kaushal-rashmika-music.herokuapp.com/covers/getactive")
          .then((res) => {
            setCovers(res.data);
            for (var i = 0; i < res.data.length; i++) {
              setValue(res.data);
              myOptions.push(res.data[i].Title);
            }
          })
          .catch((err) => {
            alert(err);
          });
      }
    }
    getData();
    test();
  }, []);




  function getCover(searchtext) {
    // console.log(searchtext)
    // console.log(value)
    for (let i = 0; i < value.length; i++) {
      if (searchtext == value[i].Title) {
        // console.log(value[i]._id)
        props.history.push("/customer/detailedcover/" + value[i]._id);
      }
    }
  }

  const handleChange = (e) => {
    let searchval = e.target.value;
    let suggestion = [];
    if (searchval.length > 0) {
      suggestion = myOptions
        .sort()
        .filter((e) => e.toLowerCase().includes(searchval.toLowerCase()));
      setResfound(suggestion.length !== 0 ? true : false);
    }
    setSuggest(suggestion);
    setSearchtext(searchval);
  };

  const suggestedText = (value) => {
   // console.log(value);
    setSearchtext(value);
    setSuggest([]);
  };
  let c = 1;
  let k = [];

  let getSuggestions = () => {
    {
     // console.log(suggest.length);
    }
    if (suggest.length === 0 && searchtext !== "" && !resfound) {
      return (
        <p style={{ height: "30px", paddingTop: "3px" }}>
          &ensp;Search Content Not Found
        </p>
      );
    }
    // else if(suggest.length>5){
    return (
      (k = suggest.slice(0, 5)),
      // setSuggest(suggest.slice(0,5)),
     //console.log(k),
      (
        <ul
          style={{
            overflowY: "scroll",
            height: "20%",
            overflowY: "hidden",
            listStyle: "none",
          }}
        >
          {/* <select> */}
          {k.map((item, index) => {
            return (
              <div key={index}>
                {/* <options onClick={() => suggestedText(item)}>{item}  </options> */}
                <li
                  style={{ height: "30px", paddingTop: "3px" }}
                  onClick={() => suggestedText(item)}
                >
                  &ensp;{item}
                </li>
                {index !== suggest.length - 1}
                {/* {c <= 5 ? "bla": "as"} */}
              </div>
            );
          })}
          {/* </select> */}
        </ul>
      )
    );
    // }
  };


  function getTop4Downloads(data) {
    let count = 0;
    let currentmaxArray = [];
    let remainingArray = [];
    let tempArray = [];
    let tempArray2 = [];
    let LastArray = [];

    let initialArray = data;

    for (let i = 0; i < data.length; i++) {
      let max = initialArray.reduce(
        (max, b) => Math.max(max, b.NoOfDownloads),
        initialArray[0].NoOfDownloads
      );

      tempArray = initialArray.filter(
        (item) => item.NoOfDownloads === String(max)
      );

      for (let p = 0; p < tempArray.length; p++) {
        currentmaxArray.push(tempArray[p]);
      }

      count = currentmaxArray.length;

      if (count >= 4) {
        break;
      }

      tempArray2 = initialArray.filter(
        (item) => item.NoOfDownloads !== String(max)
      );

      for (let q = 0; q < tempArray2.length; q++) {
        remainingArray.push(tempArray2[q]);
      }

      initialArray = remainingArray;
      remainingArray = [];
    }

    for (let l = 0; l < 4; l++) {
      LastArray.push(currentmaxArray[l]);
    }

    setTop4Downloads(LastArray);
  }

  async function displayImages(coverImageName, index) {
    // if (recommenedCovers.length != 0) {
    const storageRef = ref(storage, `PreviewImages/${coverImageName}`);
    await getDownloadURL(storageRef)
      .then((url) => {
        document.getElementById(index).src = url;
        document.getElementById("temp" + index).hidden = true;
        document.getElementById(index).hidden = false;
      })
      .catch((err) => {
        // ErrorhandlingTxt("Reccomended covers are not available right now!")
      });
    // }
  }

  return (
    <div className="home" style={{ overflowX: "hidden" }}>
      {/* <img
        src={"/images/hm.jpeg"}
        class="img-fluid"
        alt="Cover Image"
        style={{ borderRadius: "0px", width: "100%" }}
      />{" "} */}

      <div class="hero_area">
        <div class="bg-box">
          <img
            src="https://images.unsplash.com/photo-1605020419798-46652aa15452?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
        </div>

        <section class="slider_section ">
          <div class="container ">
            <div class="row">
              <div class="col-md-7 col-lg-6 ">
                <div class="detail-box">
                  <br /> <br /> <br />
                  <h1>EXPLORE MORE THAN 8 CATEGORIES TO MUSIC NOTES</h1>
                  <br /> <br /> <br />
                  <p style={{ fontWeight: "bold" }}>
                    "Music Is the Art of Thinking With Sounds"
                  </p>
                  <p>~ Jules Cambarieu</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* <br />
      <br /> */}
     <div className="MainSearchBar" style = {{marginTop: "-120px",marginBottom : "-120px"}}>
        <div class="wrapper ">
          <div class="search-input" id="searchInput">
            <a href="" target="_blank" hidden></a>
            <input
              type="text"
              placeholder="Search covers..."
              value={searchtext}
              onChange={handleChange}
              style={{ color: "#000000" }}
            />

            {getSuggestions()}

            <div class="icon" onClick={getCover(searchtext)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <h1 style={{ color: "#764A34", textAlign: "center", fontWeight: "bold" }}>
        Discover them now!
      </h1>
      <br />
      <div>
        <h2 style={{ fontWeight: "bold", paddingLeft: "30px" }}>
          Our Top Downloads-
        </h2>
        <br />

        {/* <div
          class="card-deck"
          style={{ paddingRight: "50px", paddingLeft: "50px" }}
        > */}
        {/* <div class="card" style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px", borderRadius:"15px"}}>
            <img src={'/images/cover.jpg'} class="card-img-top" alt="..."  style={{borderRadius:"15px 15px 0px 0px"}}/>
                <div class="card-body">
                    <h4 class="card-title" style={{fontWeight:"bold"}}>Dance Monkey</h4>
                    <h5>By Toni Elizabeth Watson</h5>
                </div>
        </div> */}
        <Carousel responsive={responsive}>
          {Top4Downloads.map((covers, index) => {
            return (
              <div
                onClick={() => {
                  props.history.push("/customer/detailedcover/" + covers._id);
                }}
                class="card"
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
                  borderRadius: "15px",
                  marginRight: "15px",
                  marginLeft: "15px",
                }}
              >
                <img
                  id={"temp" + index}
                  src={"/images/imageplaceholder.png"}
                  class="card-img-top"
                  alt="..."
                  style={{ borderRadius: "15px 15px 0px 0px", height: "350px" }}
                />
                <img
                  hidden
                  id={index}
                  src={displayImages(covers.PreviewPages[0], index)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/imageplaceholder.png";
                  }}
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
        {/* </div> */}
      </div>
      <br />
      <br />
      <section class="about_section layout_padding">
        <div class="container  ">
          <div class="row">
            <div class="col-md-6 ">
              <br />
              <br />
              <br />
              <div class="img-box">
                <img src={z} alt="" />
              </div>
              <br />
              <br />
              <br />
            </div>

            <div class="col-md-6">
              <div class="detail-box">
                <div class="heading_container">
                  <h2>We Are Feane</h2>
                </div>
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable. If you are going to use a passage of
                  Lorem Ipsum, you need to be sure there isn't anything
                  embarrassing hidden in the middle of text. All
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
      <h1 style={{ color: "#764A34", textAlign: "center", fontWeight: "bold" }}>
        LISTEN TO WHAT I HAVE DONE SO FAR ...
      </h1>
      <br />
      <h2 style={{ fontWeight: "bold", paddingLeft: "30px" }}>
        Discover Classical Guitar Covers-
      </h2>
      <br />
      <div class="row" style={{ paddingLeft: "50px", paddingRight: "50px" }}>
        <div class="col-sm">
          <div class="embed-responsive embed-responsive-16by9">
            <iframe
              class="embed-responsive-item"
              src="https://www.youtube.com/embed/aTgXgN9fOsk"
              title="Youtube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <br />
        </div>

        <div class="col">
          <div class="embed-responsive embed-responsive-16by9">
            <iframe
              class="embed-responsive-item"
              src="https://www.youtube.com/embed/hXQxSi34GWY"
              title="Youtube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>

        {/* <div class="col-sm">
            <div class="embed-responsive embed-responsive-16by9">
                <iframe 
                    class="embed-responsive-item" 
                    src="https://www.youtube.com/embed/-dZ53Ffs0Gc"
                    title="Youtube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                ></iframe>

            </div>
        </div> */}
      </div>
      <br />
      <br />
      <h2 style={{ fontWeight: "bold", paddingLeft: "30px" }}>
        Discover Technics & Lessons-
      </h2>
      <br />
      <div class="row" style={{ paddingLeft: "50px", paddingRight: "50px" }}>
        <div class="col-sm">
          <div class="embed-responsive embed-responsive-16by9">
            <iframe
              class="embed-responsive-item"
              src="https://www.youtube.com/embed/JWSSS7tJ2wQ"
              title="Youtube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <br />
        </div>

        <div class="col">
          <div class="embed-responsive embed-responsive-16by9">
            <iframe
              class="embed-responsive-item"
              src="https://www.youtube.com/embed/nYWzZ7BM8pA"
              title="Youtube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* <div class="col-sm">
            <div class="embed-responsive embed-responsive-16by9">
                <iframe 
                    class="embed-responsive-item" 
                    src="https://www.youtube.com/embed/M-9O9RNLskw"
                    title="Youtube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                ></iframe>
            </div>
        </div> */}
      </div>
      <div class="features" style={{ backgroundColor: "white" }}>
        <div class="container">
          <div class="row">
            <div class="col text-center">
              <div class="section_title">
                <h1
                  style={{
                    color: "#764A34",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Our Services
                </h1>
              </div>
            </div>
          </div>
          <div class="row features_row">
            <div class="col-lg-4 text-lg-right features_col order-lg-1 order-2">
              <div class="features_item">
                <h2>Responsive</h2>
                <p>
                  Etiam nec odio vestibulum est mattis effic iturut magna. Pel
                  lentesque sit am et tellus.
                </p>
              </div>

              <div class="features_item">
                <h2>Clean code</h2>
                <p>
                  Nec odio vestibulum est mattis effic iturut magna. Pel
                  lentesque sit am et tellus bla ndit.
                </p>
              </div>
            </div>
            <div class="col-lg-4 d-flex flex-column align-items-center order-lg-2 order-1">
              <div class="features_image">
                <img src={k} alt="" />
              </div>
            </div>

            <div class="col-lg-4 features_col order-lg-3 order-3">
              <div class="features_item">
                <h2>Retina ready</h2>
                <p>
                  Nec odio vestibulum est mattis effic iturut magna. Pel
                  lentesque sit am et tellus bla ndit.
                </p>
              </div>

              <div class="features_item">
                <h2>Great team</h2>
                <p>
                  Etiam nec odio vestibulum est mattis effic iturut magna. Pel
                  lentesque sit am et tellus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}