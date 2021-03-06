import axios from "axios";
import React, { useState, useEffect } from "react";
import $ from "jquery";
import DataTable from "datatables.net";

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'jquery/dist/jquery.min.js';
// //Datatable Modules
// import "datatables.net-dt/js/dataTables.dataTables"
// import "datatables.net-dt/css/jquery.dataTables.min.css"

export default function CustomerFeedback(props) {
  let CustomerName = "";
  let [CoverName, setCovername] = useState("");
  let Comment = "";
  let CommentDate = "";

  let CommentDetails = {
    CustomerName,
    Comment,
    CommentDate,
  };

  let [AllComments, setAllComments] = useState([]);
  let [finalFeedback, setfinalFeedback] = useState([]);
  let [TopDownloads, setTopDownloads] = useState([]);
  let [Top4Downloads, setTop4Downloads] = useState([]);
  let [Loading, setLoading] = useState(true);

  useEffect(() => {
    async function getFeedbacks() {
      setLoading(false);
      let coverID = props.match.params.id;

      axios
        .get("https://kaushal-rashmika-music.herokuapp.com/covers/get/" + coverID)
        .then((res) => {
          setCovername(res.data.Title);

          axios
            .get("https://kaushal-rashmika-music.herokuapp.com/feedback/getAllFeedback")
            .then((res) => {
              //Filtered feedbacks
              let AllFeedBacks = res.data.filter(
                (item) => item.CoverID === coverID
              );

              getFeedbackss(AllFeedBacks);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function test() {
      axios
        .get("https://kaushal-rashmika-music.herokuapp.com/covers/getcovers")
        .then((res) => {
          getTop4Downloads(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getFeedbacks();
    test();
  }, []);

  function getTop4Downloads(data) {
    let count = 0;
    let currentmaxArray = [];
    let remainingArray = [];

    let initialArray = data;

    for (let i = 0; i < data.length; i++) {
      let max = initialArray.reduce(
        (max, b) => Math.max(max, b.NoOfDownloads),
        initialArray[0].NoOfDownloads
      );

      console.log("Max : " + max);

      currentmaxArray.push(
        initialArray.filter((item) => item.NoOfDownloads === String(max))
      );
      console.log(currentmaxArray);
      count = currentmaxArray.length;
      if (count >= 4) {
        break;
      }

      remainingArray.push(
        initialArray.filter((item) => item.NoOfDownloads !== String(max))
      );

      initialArray = remainingArray;
      console.log(initialArray);
    }

    console.log(currentmaxArray);
  }

  async function getFeedbackss(AllF) {
    for (let i = 0; i < AllF.length; i++) {
      await axios
        .get("https://kaushal-rashmika-music.herokuapp.com/customer/get/" + AllF[i].CustomerID)
        .then((res) => {
          console.log(AllF[i].AddedDateAndTime);
          CommentDetails = {
            CustomerName: res.data.FirstName + " " + res.data.LastName,
            CommentDate: (AllF[i].AddedDateAndTime),
          
            Comment: AllF[i].Comment,
          };

          AllComments.push(CommentDetails);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log(AllComments[0]);
    setfinalFeedback(AllComments);

    setLoading(true);
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }

  return (
    <div className="container justify-content-center"  style={{ minHeight:"100vh", paddingTop:"80px"}}>
  
      <h1 style={{color:"#764A34 ", fontWeight:"bold"}}>FeedBack</h1>

      <h3>{`Cover Name : ${CoverName}`}</h3>

      <center>
      <div class="spinner-grow text-secondary  justify-content-center" role="status" hidden={Loading}>
      <span class="sr-only">Loading...</span>
    </div>
    </center>

    <div style={{  overflowX: "auto"}}>
    <br/>
      <table className="table table-bordered display" id="example">
        <thead>
          <tr>
            <th scope="col" style={{ fontWeight: "bold" }}>
              Customer Name
            </th>

            <th scope="col" style={{ fontWeight: "bold" }}>
              Date
            </th>
            <th scope="col" style={{ fontWeight: "bold" }}>
              Comment{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {finalFeedback.map((feedback) => {
            return (
              <tr>
                <td>{feedback.CustomerName}</td>
                <td>{feedback.CommentDate}</td>
                <td>{feedback.Comment}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}
