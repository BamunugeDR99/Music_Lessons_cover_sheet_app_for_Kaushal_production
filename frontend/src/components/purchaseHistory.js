import React, { Component, useEffect, useState } from "react";
import axios from "axios";

export default function PurchaseHistory(props) {

const [cover, setCover]= useState([]);
const [order, setOrder]= useState([]);
const [coverid, setCoverid]= useState([]);
const [cover2, setcover2]= useState([]);
let covers = [];
let coverID = " ";
let array2 = ["asd"];

useEffect(()=>{
  function getCovers(){
    // const objectId = props.match.params.id;
    axios.get("http://localhost:8070/order/getOrders")  
    .then((res)=>{
      console.log(res.data)
      const filter = res.data.filter(
        (cus)=>cus.CustomerID == "6199d490bfd483038f7067bf"
        // objectId
      );
      
        setOrder(filter)
        console.log(covers)
        console.log(filter)

        filter.map((post) => {
          covers.push(post.CoverIDs)

        });
    

        console.log(covers)
// let covers2 = covers.split(',')
          for(let i=0;i<covers[0].length;i++){
          console.log(covers[0][i])
            axios.get(`http://localhost:8070/covers/get/${covers[0][i]}`)
          .then((res)=>{

           array2.push(res.data)
         
            
             
          })
          }

          console.log(array2[1])
          //array.push eke awla 
          setcover2(array2)     
       

    })
    .catch((err) => {
      alert(err);
    });
  }
  getCovers();
  
}, []);


  // let i=0;
  // let Total=0;
  // for(i=0;i>-1;i++){
  //   Total = Total + cover.price;
  //   console.log(Total)
  // }
 


  return (
 
    
    <div className="container">
      <br/><br/>
    <div className="row">
        <div className="col-sm">
            <h3> <center>
                Purchase History
                </center>
            </h3>
            <br/>
        </div>
        <div className="col-sm">
            <div className="row">
                <div className="col-md-1"></div>
                <div class="col-md-10 input-group">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Search Music Covers"
                />
                <div class="input-group-append">
                    <button className="input-group-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                    </button>
                </div>
                </div>
                <div className="col-md-1"></div>
            </div>
            <br/>
        </div>
        <div className="col-sm text-right">
           
                
               <h6><b>No of downloads : 23</b></h6>
               <h6><b>Total : Rs. 1000/-</b></h6>
        </div>
     
    </div>
    <br/>
    
    {/* {cover2.map((post) => ( */}
      {array2.map((post) => {
        // alert("asd")
        return (
    <div className="card p-3" 
     style={{boxShadow: "10px 10px 6px -6px #aaaaaa",borderRadius: "10px", width:'90%', margin: 'auto', border:'2px solid sienna'}}>
           
            <div className="row" style={{width: "100%", margin:'auto'}}>
              <div className="col-sm text-center">
                <img class="rounded "
                style={{ width: "90%" , margin:'auto'}} 
                src={"Images/test2.jpg"}/>
                
                </div>
              

              <div className="col-sm">
                
              <br/>
                
                <div className="row" >
               
                
                    <div className="col" style={{ lineHeight:'2em'}}>
                 
                      <span><b> &ensp;&ensp;{post.Title}</b></span>
                    <br/>
                      <span> &ensp;&ensp;{post.MainCategory}</span>
                    <br/>
                      <span> &ensp;&ensp;{post.SubCategory}</span>
                  </div>
                </div>
<br/>
<br/>
                <div className="row">
               
                  <div className="col-sm">
                  
                    <button style={{borderRadius:'25px', backgroundColor:'#D0193A', color:'white'}}className="btn btn-sm btn-block" type="button">
                      Download
                    </button>
                    <br/>
                  </div>
                  <div className="col-sm">
                  
                      <button style={{borderRadius:'25px',backgroundColor:'#279B14', color:'white'}} className="btn btn-sm btn-block" type="button" >
                      View
                      {/* ,position:'absolute', bottom:'1',alignItems:'center' */}
                    </button>
                    <br/>
                  </div>
                 
                </div>
              </div>
              <br/>
              <div className="col-sm " style={{backgroundColor:'white', lineHeight:'2em'}}>
                <div className="text-right">
                <span class="text-center">11/11/2021</span>
                </div>
                     
                      <span style={{  color:' #764A34'}}>Original Artist &ensp;&ensp;:</span>
                      <span> &ensp;&ensp; {post.OriginalArtistName}</span>
                      <br/>
                      <span style={{ color:' #764A34'  }}>Arranged By &ensp;&ensp;:</span>
                      <span> &ensp;&ensp; {post.ArrangedBy}</span>
                      <br/>
                      <span style={{color:' #764A34'  }}>Instrument Played On &ensp;&ensp;:</span>
                      <span> &ensp;&ensp; {post.InstrumentsPlayedOn}</span>
                      <br/>
                    </div>
            </div>
    </div>
    
      );
    })}
  
      
</div>

  );
}

// export default AddStudent;
