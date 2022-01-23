const router = require("express").Router();
const jwt = require("jsonwebtoken");
//=======================================================================================================================
//              ==JWT===

let refreshTokens = [];
//Function to create an AccessToken
 /*Parameters ==> 1.Payload
                  2.Secret Key
                  3.Expiration
                  */
                  const generateAccessToken = (user) => {
                    return jwt.sign({ _id: user._id },process.env.ACCESS_TOKEN_SECRET, {
                      expiresIn:"50s"
                    });
                  };
                  
                  //Function to create a refresh token --> Calls automatically when the accesstoken is expired and generates a new acess token
                  const generateRefreshToken = (user) => {
                    return jwt.sign({ _id: user._id },process.env.REFRESH_TOKEN_SECRET , {
                      expiresIn:"7d"
                    });
                  };
                  
                  
//Token Verification Function
const verify = (req, res, next) => {

    //Check the Headers & find the authorization key & take it's value
    const authHeader = req.headers.authorization;
  
    console.log(`Auth Header : ${authHeader}`);
  
    //If there is a authorization key
    if (authHeader) {
  
      //Splitting the Bearer text
      const token = authHeader.split(" ")[1];
  
      console.log(`Token : ${token}`)
  
  
      //Verifying token
      /*Parameters ==> 1.token
                       2.secretkey
                       3.callback */
      jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          console.log("==============Verify Function1 Fail==========================");
          return res.status(403).json("Token is not valid!");
        }
  
        console.log("==============Verify Function1 Success==========================");
        console.log(user);
        //If there is no error assign payload to the request
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You are not authenticated!");
    }
  };
  
  

  //Refresh Token Route
router.post("/refreshToken", (req, res) => {
    //take the refresh token from the user
    const refreshToken = req.body.token;
  
    //send error if there is no token or it's invalid
    if (!refreshToken) return res.status(401).json("You are not authenticated!");
  
    // //If refresh token is not inside the array
    // if (!refreshTokens.includes(refreshToken)) {
    //   return res.status(403).json("Refresh token is not valid!");
    // }
  
    //If the refresh key exists validate it
  
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err, user) => { 
      err && console.log(err);
  
      // //Delete the current refresh token
      // refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  
  
      
    //if everything is ok, create new access token, refresh token and send to 
      console.log("######Refresh Function Verified User#####");
      console.log(user);
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);
  
      refreshTokens.push(newRefreshToken);
  
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  
  });

















                  
//Token Verification Function

router.post("/verifyToken/:id", verify,async (req, res) => {

  let userID = req.params.id;
  console.log("************Verify Token Function**********")
  console.log(`User ID : ${userID}`);
  console.log(`ID from the token : ${req.user._id}` );
  if (req.user._id === userID) {

      return res.json(true);
  }

  else{

      return res.json(false);
  }


})



//Token Verification Function2

router.post("/verifyToken", (req, res) => {

  console.log("************Verify Token Function22**********")

  //Check the Headers & find the authorization key & take it's value
  const authHeader = req.headers.authorization;
  
  console.log(`Auth Header in VF2 : ${authHeader}`);

  //If there is a authorization key
  if (authHeader) {

    console.log("Header ek have");
    //Splitting the Bearer text
    const token = authHeader.split(" ")[1];

    console.log(`Token in VF2 : ${token}`)


    //Verifying token
    /*Parameters ==> 1.token
                     2.secretkey
                     3.callback */
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log("==============Verify Token Function2 Failed==========================");
        return res.status(403).json("Token is not valid!");
      }

      console.log("==============Verify Token Function2 Success==========================");
      console.log(user);
      //If there is no error assign payload to the request
      return res.status(200).json(true);
    });
  } else {
    res.status(401).json("No Header You are not authenticated!");
  }


})



//Token Verification Function3

router.post("/verifyToken3", (req, res) => {

  console.log("*********Verify Function 3 Called!");
  console.log();
  //Check the Headers & find the authorization key & take it's value
  const authHeader = req.headers.authorization;
   
  console.log(`Header in verify Function 3 : - ${authHeader}`);
  console.log();
  //If there is a authorization key
  if (authHeader) {
 
    //Splitting the Bearer text
    const token = authHeader.split(" ")[1];
 
    console.log("GG");
       
  console.log(`Token in verify Function 3 : - ${token}`);
  console.log();
 
    //Verifying token
    /*Parameters ==> 1.token
                     2.secretkey
                     3.callback */
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {

        console.log("==============Verify Token Function Failed==========================");
         return res.json(false);
        
      }
 
      console.log("==============Verify Token Function 3 Success==========================");
      console.log(user);
      //If there is no error assign payload to the request
 
     return  res.json(true)
 
    });
  } else {
    
    return res.json(false);
  }
 
 
 })
 
  
  


module.exports = router;
