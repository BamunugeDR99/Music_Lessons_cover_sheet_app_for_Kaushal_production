const router = require("express").Router();
const jwt = require("jsonwebtoken");
//=======================================================================================================================
//              ==JWT===


//Function to create an AccessToken
 /*Parameters ==> 1.Payload
                  2.Secret Key
                  3.Expiration
                  */
                  const generateAccessToken = (user) => {
                    return jwt.sign({ _id: user._id }, "mySecretKey", {
                      expiresIn:"50s"
                    });
                  };
                  
                  //Function to create a refresh token --> Calls automatically when the accesstoken is expired and generates a new acess token
                  const generateRefreshToken = (user) => {
                    return jwt.sign({ _id: user._id }, "myRefreshSecretKey", {
                      expiresIn:"7d"
                    });
                  };
                  
                  
//Token Verification Function

router.post("/verifyToken", (req, res) => {

 //Check the Headers & find the authorization key & take it's value
 const authHeader = req.headers.authorization;
  
 //If there is a authorization key
 if (authHeader) {

   //Splitting the Bearer text
   const token = authHeader.split(" ")[1];



   //Verifying token
   /*Parameters ==> 1.token
                    2.secretkey
                    3.callback */
   jwt.verify(token, "mySecretKey", (err, user) => {
     if (err) {
        return res.json(false);
     }

     console.log("==============Verify Function user==========================");
     console.log(user);
     //If there is no error assign payload to the request

    return  res.json(true)

   });
 } else {
   
   return res.json(false);
 }


})

  
  

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
  
    jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => { 
      err && console.log(err);
  
    //   //Delete the current refresh token
    //   refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  
  
      
    //if everything is ok, create new access token, refresh token and send to 
      console.log("######Refresh Function Verified User#####");
      console.log(user);
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);
  
    //   refreshTokens.push(newRefreshToken);
  
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  
  });

module.exports = router;
