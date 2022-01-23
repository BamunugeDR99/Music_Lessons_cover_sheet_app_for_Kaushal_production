import axios from "axios";
import { useState } from "react";
import jwt_decode from "jwt-decode";
// import "../../css/testCus.css"
import Cookies from "js-cookie";

export default function TestCustomerUI(props){
    const [user, setUser] = useState("");
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
  
  

    
  //Refresh token function
  const refreshTokens = async () => {
    try {
                 console.log("Refresh Tokens running");
                  //Get the Cokkies
                  let refreshToken = Cookies.get("refresh");

                  console.log(refreshToken);

      //Pass the refresh token to refresh route
      const res = await axios.post("https://kaushal-rashmika-music.herokuapp.com/testcustomer/refreshToken", { token:refreshToken });

      // //update the user with new accessToken and new refreshToken
      // setUser({
      //   ...user,
      //   accessToken: res.data.accessToken,
      //   refreshToken: res.data.refreshToken,
      // });

      // console.log(res.data);
      //Set Cookies
      Cookies.set("access", res.data.accessToken);
      Cookies.set("refresh",res.data.refreshToken);



      console.log(res.data);
      //Returns a new acces token & new refresh token
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  //Creating new axios instance
  const axiosJWT = axios.create()

  //Token expires in 50 sec , after that we need to refresh and get a new token
  //To do this automatically --> axios interceptors --> do some function before every request in this case


  //Check expiration time of the token before sending any request
  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      console.log("Interceptor running");

            //Get the Cokkies
            let accessToken = Cookies.get("access");
            // let refreshToken = Cookies.get("refresh");


      //Decode the payload of the token and return it as an object
      const decodedToken = jwt_decode(accessToken);

      console.log(`Decoded Token :`);
      console.log(decodedToken)

      //Compare the expiration time with the current time
      console.log(decodedToken.exp * 1000 < currentDate.getTime());
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        //Calling refresh token function
        const data = await refreshTokens();

        console.log("Intercepted");
        console.log(data);
        //Update header
        config.headers["authorization"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (error) => {

      //If there is an error cancel everything
      return Promise.reject(error);
    }
  );

  //Handle Submit Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://kaushal-rashmika-music.herokuapp.com/testcustomer/loginCustomer", { Username, Password });
      setUser(res.data);
        console.log(res.data);

            //        console.log(res.data.accessToken);
            //       console.log(res.data.refreshToken);
            //       console.log(res.data._id);
            // localStorage.setItem('CustomerID', res.data._id);
            //Setting the Cookies
            Cookies.set("access", res.data.accessToken);
            Cookies.set("refresh",res.data.refreshToken);


    } catch (err) {
      console.log(err);
    }
  };


  //Handle delete function
  const handleDelete = async (id) => {

    console.log(id);
    setSuccess(false);
    setError(false);
    try {

            //Get the Cokkies
      let accessToken = Cookies.get("access");
      let refreshToken = Cookies.get("refresh");

      //Uses the axiosJWT instance
      await axiosJWT.delete("https://kaushal-rashmika-music.herokuapp.com/testcustomer/deleteUser/" + id, {
        //Set the authorization token to the header
        headers: { authorization: "Bearer " + accessToken },
      }).then((res) =>{

        setSuccess(true);
      console.log(res);
      alert("deleted");

      });
      
    } catch (err) {
      setError(true);
    }
  };



























  
    return (
    <div className="testCus">
      <div className="container">
       
  


      <div className="App">
            <form action="" >
                <input name="email" type="text" placeholder="Email address" onChange={(e) => setUsername(e.target.value)}/>
                <br />
                <br />

                <input name="password" type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)}/>
                <br />
                <br />
                <input type="submit" value="Login" onClick={handleSubmit}/>
                <br />
                <br />
            </form>
        <button onClick={()=>{handleDelete(user._id)}}>Delete</button>
        </div>

        
      </div>
      </div>
    );
  }
