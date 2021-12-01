import axios from "axios";
import React, { useState, useEffect } from "react";
import $ from "jquery";
import DataTable from "datatables.net";

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'jquery/dist/jquery.min.js';
// //Datatable Modules
// import "datatables.net-dt/js/dataTables.dataTables"
// import "datatables.net-dt/css/jquery.dataTables.min.css"



export default function CustomerFeedback() {

  


    let CustomerName = "";
    let [CoverName, setCovername] = useState("");
    let Comment = "";
    let CommentDate = "";

    let CommentDetails = {
        CustomerName,
        Comment,
        CommentDate
    };

    let [AllComments, setAllComments] = useState([]);
    let [finalFeedback, setfinalFeedback] = useState([]);
    let [Top4Downloads, setTop4Downloads] = useState([]);
    


    useEffect(() => {

        async function getFeedbacks() {
            let coverID = "61a0a96ac60e5237bce988d2";

            axios.get("http://localhost:8070/covers/get/" + coverID).then((res) => {

                setCovername(res.data.Title);

                axios.get("http://localhost:8070/feedback/getAllFeedback").then((res) => {

                    //Filtered feedbacks
                    let AllFeedBacks = res.data.filter((item) => item.CoverID === coverID);

                    getFeedbackss(AllFeedBacks);

                }).catch((err) => {
                    console.log(err);
                })






            }).catch((err) => {
                console.log(err);
            })


        }

        function test(){

            axios.get("http://localhost:8070/covers/getcovers").then((res)=> {

                getTop4Downloads(res.data);



            }).catch((err)=> {
                console.log(err);
            })
        }

        getFeedbacks();
        test();

    }, [])


    function getTop4Downloads(data){

        let count =0;
        let currentmaxArray = [];
        let remainingArray = [];
        let tempArray=[];
        let tempArray2=[];
        let LastArray = []


        let initialArray = data;

        for(let i = 0 ; i < data.length; i++){

          
            let max = initialArray.reduce((max, b) => Math.max(max, b.NoOfDownloads), initialArray[0].NoOfDownloads);
            

            tempArray = initialArray.filter((item) => item.NoOfDownloads === String(max));

     
            for(let p = 0 ; p < tempArray.length; p++){

                currentmaxArray.push(tempArray[p]);
            }



            count = currentmaxArray.length;
      
            if(count >= 4){
                break;
            }

            tempArray2 = initialArray.filter((item) => item.NoOfDownloads !== String(max));


           
            for(let q = 0 ;q < tempArray2.length ; q++ ){
                remainingArray.push(tempArray2[q]);
            }

    
            initialArray = remainingArray;
            remainingArray = [];
   


        }


        
        for(let l = 0 ; l < 4 ; l++){

            LastArray.push(currentmaxArray[l]);


        }


        setTop4Downloads(LastArray);




    }

    async function getFeedbackss(AllF) {

        for (let i = 0; i < AllF.length; i++) {


            await axios.get("http://localhost:8070/customer/get/" + AllF[i].CustomerID).then((res) => {


                CommentDetails = {
                    CustomerName: res.data.FirstName + " " + res.data.LastName,
                    CommentDate: String(AllF[i].AddedDateAndTime.substr(0, 10)),
                    Comment: AllF[i].Comment
                }

               
                AllComments.push(CommentDetails);

            }).catch((err) => {
                console.log(err);
            })

        }
        console.log(AllComments[0]);
        setfinalFeedback(AllComments);


 
        $(document).ready(function () {
            $('#example').DataTable();
        });
    }

    return (
        <div className="container justify-content-center">
            <h1>FeedBack</h1>

            <h3>{`Cover Name : ${CoverName}`}</h3>


            <table className="table table-bordered display" id="example">
                <thead>
                    <tr>
                        <th scope="col" style={{fontWeight:"bold"}}>Customer Name</th>
                       
                        <th scope="col" style={{fontWeight:"bold"}}>Date</th>
                        <th scope="col" style={{fontWeight:"bold"}}>Comment </th>

                    </tr>
                </thead>
                <tbody>
                    {

                        finalFeedback.map((feedback) => {




                            return (

                                <tr>

                                    <td>{feedback.CustomerName}</td>
                                    <td>{feedback.CommentDate}</td>
                                    <td>{feedback.Comment}</td>

                                </tr>


                            )



                        })}



                </tbody>
            </table>


            {/* <div>

                  {Top4Downloads.map((download) => {

                      return(
                        <div>

                            <p>{download.Title} <span>{` : ${download.NoOfDownloads}`}</span></p>
                        </div>
                      )
                  })

                  }      

            </div> */}
        </div>
    )
}