import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Home(props) {

return(

    <div className="home" style={{overflowX:"hidden"}}>

        <img src = {'/images/home1.jpg'} class="img-fluid" alt="Cover Image" style={{borderRadius:"0px 0px 10px 10px", width:"100%"}}/> <br/><br/>
        
        <h1 style={{color:"#764A34", textAlign:"center", fontWeight:"bold"}}>Discover them now!</h1><br/>

        <div>

        <h2 style={{fontWeight:"bold", paddingLeft:"30px"}}>Our Top Downloads-</h2><br/>

    <div class="card-deck" style={{paddingRight:"50px", paddingLeft:"50px"}}>
  
        {/* <div class="card" style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px", borderRadius:"15px"}}>
            <img src={'/images/cover.jpg'} class="card-img-top" alt="..."  style={{borderRadius:"15px 15px 0px 0px"}}/>
                <div class="card-body">
                    <h4 class="card-title" style={{fontWeight:"bold"}}>Dance Monkey</h4>
                    <h5>By Toni Elizabeth Watson</h5>
                </div>
        </div> */}

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
               
                img src={'/images/cover.jpg'}
                class="card-img-top"
                alt="..."
                style={{ borderRadius: "15px 15px 0px 0px", height: "350px" }}
              />
              <div class="card-body">
                <h4 class="card-title" style={{ fontWeight: "bold" }}>
                Believer
                </h4>
                <h5>By Imagine Dragons</h5>
               
              </div>
            </div>


        
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
               
                img src={'/images/cover.jpg'}
                class="card-img-top"
                alt="..."
                style={{ borderRadius: "15px 15px 0px 0px", height: "350px" }}
              />
              <div class="card-body">
                <h4 class="card-title" style={{ fontWeight: "bold" }}>
                Attention
                </h4>
                <h5>By Charlie Puth</h5>
               
              </div>
            </div>

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
               
                img src={'/images/cover.jpg'}
                class="card-img-top"
                alt="..."
                style={{ borderRadius: "15px 15px 0px 0px", height: "350px" }}
              />
              <div class="card-body">
                <h4 class="card-title" style={{ fontWeight: "bold" }}>
                Pirates of the Caribbean Theme
                </h4>
                <h5>By Klaus Badelt</h5>
               
              </div>
            </div>

      
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
               
                img src={'/images/cover.jpg'}
                class="card-img-top"
                alt="..."
                style={{ borderRadius: "15px 15px 0px 0px", height: "350px" }}
              />
              <div class="card-body">
                <h4 class="card-title" style={{ fontWeight: "bold" }}>
                Dance Monkey
                </h4>
                <h5>By Toni Elizabeth Watson</h5>
               
              </div>
            </div>

        </div>

    
    </div>

<br/><br/>

        <h1 style={{color:"#764A34", textAlign:"center", fontWeight:"bold"}}>LISTEN TO WHAT I HAVE DONE SO FAR ...</h1><br/>

        <h2 style={{fontWeight:"bold", paddingLeft:"30px"}}>Discover Classical Guitar Covers-</h2><br/>


    <div class="row" style={{paddingLeft:"50px", paddingRight:"50px"}}>
       
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
            <br/>
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
  
  <br/><br/>
  
        <h2 style={{fontWeight:"bold", paddingLeft:"30px"}}>Discover Technics & Lessons-</h2><br/>

    <div class="row" style={{paddingLeft:"50px", paddingRight:"50px"}}>
    
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
            <br/>
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


<br/><br/>


</div>




    )
}