import React, { Component, useState } from "react";
import axios from "axios";

export default function PurchaseHistory(props) {


  return (
 
    
    <div className="container">
      <br/><br/>
    <div className="row">
        <div className="col-sm">
            <h3> <center>
                Purchase History
                </center>
            </h3>
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
        </div>
        <div className="col-sm text-center">
           
                
               <h6><b>No of downloads: 10</b></h6>
               <h6><b>Total: Rs. 1000/-</b></h6>
        </div>
     
    </div>
    <br/><br/>
    
    <div className="card shadow p-3 mb-5 bg-white rounded-lg border border-light" 
     style={{boxShadow: "10px 10px 6px -6px #777",borderRadius: "15px"}}>
           
            <div className="row" style={{width: "100%",padding: "0px 0px 20px 0px",margin: "0px 10px 0px 2px"}}>
              <div className="col-sm text-center">
                <img class="rounded"
                style={{ width: "90%" ,alignItems:'center'}} 
                src={"Images/test2.jpg"}/>
                </div>

              <div className="col-sm" style={{ fontSize: "20px" , backgroundColor:'white'}}>
                

                <div className="row" >
                    <div className="col">
                      <span style={{ fontSize: "18px"}}><b> &ensp;&ensp;Song Name</b></span>
                    <br/>
                      <span style={{ fontSize: "15px"}}> &ensp;&ensp;&ensp;Category</span>
                    <br/>
                      <span style={{ fontSize: "15px"}}> &ensp;&ensp;&ensp;Sub Category</span>
                  </div>
                </div>
<br/>
                <div className="row">
                  <div className="col-sm">
                   
                    <button style={{ fontSize: "12px", borderRadius:'25px', backgroundColor:'#D0193A', color:'white'}}className="btn btn-sm btn-block" type="button">
                      Download
                    </button>
                    <br/>
                  </div>
                  <div className="col-sm">
                      <button style={{ fontSize: "12px" ,borderRadius:'25px',backgroundColor:'#279B14', color:'white'}} className="btn btn-sm btn-block" type="button" >
                      View
                      {/* ,position:'absolute', bottom:'1',alignItems:'center' */}
                    </button>
                  </div>
                </div>
              </div>
              <br/>
              <div className="col-sm" style={{backgroundColor:'white', fontSize: "16px", lineHeight:'2em'}}>
                <span class="text-right" style={{ fontSize: "15px"}}>11/11/2021</span>
                      <br/>
                      <span style={{ fontSize: "15px", color:' #764A34' }}>Original Artist &ensp;&ensp;:</span>
                      <span> &ensp;&ensp; Kaushal Rashmika</span>
                      <br/>
                      <span style={{ fontSize: "15px",color:' #764A34'  }}>Arranged By &ensp;&ensp;:</span>
                      <span> &ensp;&ensp; Kaushal Rashmika</span>
                      <br/>
                      <span style={{ fontSize: "15px",color:' #764A34'  }}>Instrument Played On &ensp;&ensp;:</span>
                      <span> &ensp;&ensp; Guitar</span>
                      <br/>
                    </div>
            </div>
          </div>

          <div className="card shadow p-3 mb-5 bg-white rounded-lg border border-light" 
     style={{boxShadow: "10px 10px 6px -6px #777",borderRadius: "15px"}}>
           
            <div className="row" style={{width: "100%",padding: "0px 0px 20px 0px",margin: "0px 10px 0px 2px"}}>
              <div className="col-sm  text-center">
                <img class="rounded"
                style={{ width: "90%" }} 
                src={"Images/test2.jpg"}/>
                </div>

              <div className="col-sm" style={{ fontSize: "20px" , backgroundColor:'white'}}>
                

                <div className="row" >
                    <div className="col">
                      <span style={{ fontSize: "18px"}}><b>Song Name</b></span>
                    <br/>
                      <span style={{ fontSize: "15px"}}>Category</span>
                    <br/>
                      <span style={{ fontSize: "15px"}}>Sub Category</span>
                  </div>
                </div>
<br/>

                <div className="row">
                  <div className="col-sm">
                    <button style={{ fontSize: "12px", borderRadius:'25px', backgroundColor:'#D0193A', color:'white'}}className="btn btn-sm btn-block" type="button">
                      Download
                    </button>
                  </div>
                  <br/>
                  <br/>
                  <div className="col-sm">
                      <button style={{ fontSize: "12px" ,borderRadius:'25px',backgroundColor:'#279B14', color:'white'}} className="btn btn-sm btn-block" type="button" >
                      View
                      {/* ,position:'absolute', bottom:'1',alignItems:'center' */}
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-sm" style={{backgroundColor:'white', fontSize: "16px", lineHeight:'2em'}}>
                <span class="text-right" style={{ fontSize: "15px"}}>11/11/2021</span>
                      <br/>
                      <span style={{ fontSize: "15px", color:' #764A34' }}>Original Artist &ensp;&ensp;:</span>
                      <span> &ensp;&ensp; Kaushal Rashmika</span>
                      <br/>
                      <span style={{ fontSize: "15px",color:' #764A34'  }}>Arranged By &ensp;&ensp;:</span>
                      <span> &ensp;&ensp; Kaushal Rashmika</span>
                      <br/>
                      <span style={{ fontSize: "15px",color:' #764A34'  }}>Instrument Played On &ensp;&ensp;:</span>
                      <span> &ensp;&ensp; Guitar</span>
                      <br/>
                    </div>
            </div>
          </div>

      
</div>

  );
}

// export default AddStudent;
