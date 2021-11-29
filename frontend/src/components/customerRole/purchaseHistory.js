import React, { Component, useEffect, useState } from "react";
import axios from "axios";

export default function PurchaseHistory(props) {
  const [cover, setCover] = useState([]);
  const [searchValue, setSearchvalue] = useState([]);
  const [noData, setNoData] = useState([]);
  const [empty, setEmpty] = useState([]);
  let [total, setTotal] = useState([]);
  let [time, setTime] = useState([]);
  let [tot, setTot] = useState([]);
  let covers = [];
  let array2 = [];

  let Tot=0;
  let TotalPrice = 0;

  useEffect(() => {
    function getCovers() {
      // const objectId = props.match.params.id;
      axios
        .get("http://localhost:8070/order/getOrders")
        .then((res) => {
          console.log(res.data)
          const filter = res.data.filter(
            (cus) => cus.CustomerID == "6199d490bfd483038f7067bf"
            // objectId
          );

          filter.map((post) => {
            covers.push(post.CoverIDs);
          });
          for(let i = 0; i < res.data.length; i++){
            // console.log(res.data[i].TotalPrice)
            // Tot += Number(res.data[i].TotalPrice)
            // setTot(res.data[i].TotalPrice)
            // console.log(res.data[i].TransactionDateAndTime)
            setTime(res.data[i].TransactionDateAndTime)
        }
          
          axios.get("http://localhost:8070/covers/getcovers").then((res) => {
            getSpecificOrderCoverDetiles(res.data);
          });
        })
        .catch((err) => {
          alert(err);
        });
    }
    getCovers();
  }, []);


  function getSpecificOrderCoverDetiles(allCovers) {
    for (let j = 0; j < allCovers.length; j++) {
      for (let i = 0; i < covers[0].length; i++) {
        if (covers[0][i] == allCovers[j]._id) {
          array2.push(allCovers[j]);
          TotalPrice = TotalPrice + Number(array2[j].Price)
          console.log(TotalPrice)
          setTotal(TotalPrice)
          setNoData(array2.length)
        }
      }
    }
    setCover(array2);
  }

  function searchByName(val) {
    setSearchvalue(val);

    let searchResult = cover.filter(
      (post) =>
        post.Title.toLowerCase().includes(val.toLowerCase()) ||
        post.MainCategory.toLowerCase().includes(val.toLowerCase())||
        post.SubCategory.toLowerCase().includes(val.toLowerCase())
    );
    // if (searchResult.length != 0) {
    //   // setCover(searchResult);
    //   setEmpty("");
    // } else {
    //   setEmpty("No Covers available !");
    //   setCover([]);
    // }

    setCover(searchResult);

    if (searchResult !== null) {
     //
     setEmpty("");
    }

    if (searchResult.length === 0) {
      //alert("d");
     //
     setCover(cover);
     setEmpty("No Covers available !");
      // setCover([]);
    }
  }



  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        <div className="col-sm">
          <h3 style={{color:'#764A34'}}>
            {" "}
            <center><b>Purchase History</b></center>
          </h3>
          <br />
        </div>
        <div className="col-sm">
          <div className="row">
            <div className="col-md-1"></div>
            <div class="col-md-10 input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Search Music Covers"
                onChange={(e) => {
                  searchByName(e.target.value)}}
              />
              <div class="input-group-append">
                <button className="input-group-text">
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
                </button>
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
          <br />
        </div>
        <div className="col-sm text-right">

        {/* <div className="row"> */}

            {/* <div className="col-6">
              <div style={{backgroundColor: "white",borderRadius: "10px", borderColor: props.color,border: `solid black`, padding: "20px 20px 20px 20px", }}>
                <div className="row">
                  <div className="col-8">
                    <span style={{ color: props.color }}>{noData}</span>
                    <br />
                    <span>No of downloads</span>
                  </div>
                  <div className="col">
                    <i class={props.icon} aria-hidden="true"style={{color: props.color,fontSize: "20px", marginTop: "10px",}} ></i>
                  </div>
                </div>
              </div>
            </div>
            <br/>
            <div className="col-6">
              <div style={{backgroundColor: "white",borderRadius: "10px", borderColor: '#D0193A ',border: `solid black`, padding: "20px 20px 20px 20px", }}>
                <div className="row">
                  <div className="col-8 text-right">
                    <span style={{ color: props.color }}>Rs. {total}/-</span>
                    <br />
                    <span>Total</span>
                  </div>
                  <div className="col">
                    <i class={props.icon} aria-hidden="true"style={{color: props.color,fontSize: "20px", marginTop: "10px",}} ></i>
                  </div>
                </div>
              </div>
            </div> */}

           <h6>
            <b>No of downloads : {noData}</b>
          </h6>
          <h6>
            <b>Total : $ {total}</b>
          </h6>
          {/* </div> */}
        </div>
      </div>
      <br /><center>
        <h3 style={{color:'#D0193A '}}>{empty}</h3>
        </center>
        <br/>
      {/* {cover2.map((post) => ( */}
      {cover.map((post) => {
        TotalPrice += Number(post.Price)
        // console.log(TotalPrice)
          // setTotal(TotalPrice)
        // alert("asd")
        return (
          <div
            className="card p-3"
            style={{
              boxShadow: "10px 10px 6px -6px #aaaaaa",
              borderRadius: "10px",
              width: "90%",
              margin: "auto",
              marginBottom : "10px",
              border: "2px solid sienna",
            }}
          >
            <div className="row" style={{ width: "100%", margin: "auto" }}>
              <div className="col-sm text-center">
                <img
                  class="rounded"
                  placeholder={"images/923d10247b982186a4ebb24b7ba6fba8.jpg"}
                  // alt={"images/test2.jpg"}
                  style={{ width: "100%", margin: "auto" }}
                  src={"images/923d10247b982186a4ebb24b7ba6fba8.jpg"}
                  // ref={'images/test2.jpg'} onError={
                  //   () => this.img.src = 'images/test2.jpg'}
                  onError={(e)=>{ if (e.target.src !== "images/923d10247b982186a4ebb24b7ba6fba8.jpg"){
                    e.target.onerror = null;
                     e.target.src="images/923d10247b982186a4ebb24b7ba6fba8.jpg";}
                }
           }
                />
              </div>

              <div className="col-sm">
                <br />

                <div className="row">
                  <div className="col" style={{ lineHeight: "2em" }}>
                    <span>
                      <b> &ensp;&ensp;{post.Title}</b>
                    </span>
                    <br />
                    <span> &ensp;&ensp;{post.MainCategory}</span>
                    <br />
                    <span> &ensp;&ensp;{post.SubCategory}</span>
                    <br />
                    <span> &ensp;&ensp;Price : ${post.Price}</span>
                  </div>
                </div>
                <br />
                <br />
                <div className="row">
                  <div className="col-sm">
                    <button
                      style={{
                        borderRadius: "25px",
                        backgroundColor: "#D0193A",
                        color: "white",
                      }}
                      className="btn btn-sm btn-block"
                      type="button"
                    >
                      Download
                    </button>
                    <br />
                    <br />
                  </div>
                  <div className="col-sm">
                    <button
                      style={{
                        borderRadius: "25px",
                        backgroundColor: "#279B14",
                        color: "white",
                      }}
                      className="btn btn-sm btn-block"
                      type="button"
                    >
                      View
                      
                    </button>
                    <br />
                  </div>
                </div>
              </div>
              <br />
              <div
                className="col-sm "
                style={{ backgroundColor: "white", lineHeight: "2em" }}
              >
                <div className="text-right">
                  <span class="text-center">{time}</span>
                </div>
                <br/>

                <span style={{ color: " #764A34" }}>
                  Original Artist&ensp;:
                </span>
                <span>&ensp;{post.OriginalArtistName}</span>
                <br />
                <span style={{ color: " #764A34" }}>
                  Arranged By&ensp;:
                </span>
                <span>&ensp;{post.ArrangedBy}</span>
                <br />
                <span style={{ color: " #764A34" }}>
                  Instrument Played On&ensp;:
                </span>
                <span>&ensp;{post.InstrumentsPlayedOn}</span>
                <br />
              </div>
            </div>
          </div>
         
        );
      })}

{/* {console.log(TotalPrice)} */}
{/* {setTotal(TotalPrice)} */}
        
    </div>
    
  
  );
}

    
