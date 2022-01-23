const router = require("express").Router();
const Order = require("../models/order");
let Feedback = require("../models/order");

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
          return res.status(403).json("Token is not valid!");
        }
  
        console.log("==============Verify Function user==========================");
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





//Add Order
// router.route("/addOrder").post(async (req, res) => {
//   const { CoverIDs, CustomerID, TotalPrice, ReferenceNo } = req.body;

//   const newOrder = new Order({
//     CoverIDs,
//     CustomerID,
//     TotalPrice,
//     ReferenceNo,
//   });

//   newOrder
//     .save()
//     .then(() => {
//       res.status(201).json({ message: "Order Added Successfully!" });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });



//Add Order --> JWT Middleware Added
router.post("/addOrder", verify, async (req,res) => {

  const { CoverIDs, CustomerID, TotalPrice, ReferenceNo } = req.body;

  console.log(`Customer ID : ${CustomerID}`);
  console.log(`ID from the token : ${req.user._id}` );
  if (req.user._id ===CustomerID){

      
  const newOrder = new Order({

      CoverIDs,
      CustomerID,
      TotalPrice,
      ReferenceNo,
    });
  
    newOrder
      .save()
      .then(() => {
        res.status(201).json({ message: "Order Added Successfully!" });
      })
      .catch((err) => {
        console.log(err);
      });

  }

      

})









//Get one order
router.route("/getOrder/:id").get(async (req, res) => {
  let OrderObjectID = req.params.id;

  //can use findOne if searching by another attribute
  const order = await Order.findById(OrderObjectID)
    .then((covers) => {
      res.json(covers);
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get Order", error: err.message });
    });
});

//Get All Orders
router.route("/getOrders").get((req, res) => {
  //Variable declared at line 5
  Order.find()
    .then((covers) => {
      res.json(covers);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Update Order
router.route("/updateOrder/:id").put(async (req, res) => {
  let OrderObjectID = req.params.id;

  const { OrderID, CoverIDs, CustomerID, TotalPrice, ReferenceNo } = req.body;

  const UpdatedOrder = new Order({
    OrderID,
    CoverIDs,
    CustomerID,
    TotalPrice,
    ReferenceNo,
  });

  const update = await Order.findByIdAndUpdate(OrderObjectID, UpdatedOrder)
    .then(() => {
      res.json("Order Updated");
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

//Delete Order
router.route("/deleteOrder/:id").delete(async (req, res) => {
  let OrderObjectID = req.params.id;

  await Order.findByIdAndDelete(OrderObjectID)
    .then(() => {
      res.status(200).send({ status: "Order deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete Order", error: err.message });
    });
});

router.route("/getbyyear/:from/:to").get(async (req, res) => {
  let start = req.params.from;
  let end = req.params.to;
  try {
    const allOrders = await Order.find({
      TransactionDateAndTime: { $gte: start, $lt: end },
    });

    console.log(allOrders);
    res.status(200).json(allOrders);
    // res.status(200).json(end);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
module.exports = router;
