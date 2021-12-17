const express = require("express");
const router = require("express").Router();
let Customer = require("../models/customer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());



//=======================================================================================================================
//              ==JWT===

let refreshTokens = [];
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
const verify = (req, res, next) => {

    //Check the Headers & find the authorization key & take it's value
    const authHeader = req.headers.authorization;
  
    // console.log(authHeader);
  
    //If there is a authorization key
    if (authHeader) {
  
      //Splitting the Bearer text
      const token = authHeader.split(" ")[1];
  
    //   console.log(token)
  
  
      //Verifying token
      /*Parameters ==> 1.token
                       2.secretkey
                       3.callback */
      jwt.verify(token, "mySecretKey", (err, user) => {
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
  
    //If refresh token is not inside the array
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid!");
    }
  
    //If the refresh key exists validate it
  
    jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => { 
      err && console.log(err);
  
      //Delete the current refresh token
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  
  
      
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
//=======================================================================================================================

// update purchased covers
router.route("/addPurchasedCover/:id").put(async (req, res) => {
  let CustomerID = req.params.id;
  const { PurchasedCovers } = req.body;

  const updatedArray = {
    PurchasedCovers,
  };

  const update = await Customer.findByIdAndUpdate(CustomerID, updatedArray)
    .then(() => {
      res.status(200).send({ status: "updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

//Customer SignUp
router.route("/add").post(async (req, res) => {
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const Email = req.body.Email;
  const ContactNumber = req.body.ContactNumber;
  const Gender = req.body.Gender;
  const Country = req.body.Country;
  const Username = req.body.Username;
  const Password = req.body.Password;
  // const FeedBackIDs = req.body.FeedBackIDs;
  // const OrderIDs = req.body.OrderIDs;
  // const LoginStatus = req.body.LoginStatus;
  // const DeleteStatus = req.body.DeleteStatus;
  // const UpdatedUser = req.body.UpdatedUser;

  try {
    const emailExist = await Customer.findOne({ Email: Email });

    if (emailExist) {
      return res.status(422).json({ error: "Email Already Exist" });
    }

    const usernameExist = await Customer.findOne({ Username: Username });

    if (usernameExist) {
      return res.status(422).json({ error: "Username Already Exist" });
    }

    const newCustomer = new Customer({
      FirstName,
      LastName,
      Email,
      ContactNumber,
      Gender,
      Country,
      Username,
      Password,
      //  FeedBackIDs,
      //  OrderIDs,
      //  LoginStatus,
      //  DeleteStatus,
      //  UpdatedUser,
    });

    await newCustomer.save();

    res.status(201).json({ message: "Customer Added Successfully!" });
  } catch (err) {
    console.log(err);
  }
});

//Get one customer --> Middleware Added
router.get("/get/:id" , verify, async (req, res) => {

  let userID = req.params.id;

  console.log(`User ID : ${userID}`);
  console.log(`ID from the token : ${req.user._id}` );
  if (req.user._id === userID){

      const user = await Customer.findById(userID)
      .then((cutomerss) => {
        // res.status(200).send({status:"User fetched"});
        res.json(cutomerss);
      })
      .catch((err) => {
        console.log(err.message);
        res
          .status(500)
          .send({ status: "Error with get user", error: err.message });
      });
  }


} )

//Get all customers
router.route("/getAll").get((req, res) => {
  Customer.find()
    .then((customer) => {
      res.json(customer);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Update One 1  --> Middleware Added
router.put("/update/:id", verify, async(req, res) => {

  let userID = req.params.id;
  console.log(`User ID : ${userID}`);
  console.log(`ID from the token : ${req.user._id}` );
  if (req.user._id === userID){


      const {
          FirstName,
          LastName,
          Email,
          ContactNumber,
          Gender,
          Country,
          Username,
          Password,
        } = req.body;
      
        //  FeedBackIDs, OrderIDs, LoginStatus, DeleteStatus, UpdatedUser
        try {
          const updatedCustomer = {
            FirstName,
            LastName,
            Email,
            ContactNumber,
            Gender,
            Country,
            Username,
            Password,
      
          };
      
          const update = await Customer.findByIdAndUpdate(userID, updatedCustomer);
          res.status(200).send({ status: "User Updated" });
        } catch (err) {
          console.log(err);
          res
            .status(500)
            .send({ status: "Error with updating data", error: err.message });
        }

  }


})



//Update One

router.route("/updateCus/:id").put(async (req, res) => {
  let userID = req.params.id;

  const { FeedBackIDs, OrderIDs, LoginStatus, DeleteStatus } = req.body;

  const updateC = await Customer.updateOne(
    { _id: userID },
    {
      $set: {
        FeedBackIDs: FeedBackIDs,
        OrderIDs: OrderIDs,
        LoginStatus: LoginStatus,
        DeleteStatus: DeleteStatus,
      },
    }
  )
    .then(() => {
      res.status(200).send({ status: "Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});



//Login route

router.post("/loginCustomer", async (req, res) => {
  try {
    const { Username, Password } = req.body;

    // if(!username || !password){

    //     return res.status(400).json({error: "Please filled the all data"})
    // }

    //check with database username

    let customerLogin = await Customer.findOne({ Username: Username });

    if (customerLogin) {
      const isMatch = await bcrypt.compare(Password, customerLogin.Password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credientials" });
      } else {
        //res.json({message: "Customer Sign In Successfully"});

        //Generate access token
        const accessToken = generateAccessToken(customerLogin);
        const refreshToken = generateRefreshToken(customerLogin);

        // console.log(`this is the cookie ${req.cookies.jwt}`);

        res.json({
  
            _id: customerLogin._id,
            accessToken: accessToken,
            refreshToken: refreshToken,
     
        });


        refreshTokens.push(refreshToken);
        // console.log(accsessToken);
        // console.log(refreshToken);
      }
    } else {
      res.status(400).json({ error: "Customer does not exists" });
    }
  } catch (err) {
    console.log(err);
  }
});


//Delete Customer --> Middleware Added
router.delete("/deleteUser/:id", verify, async (req, res) => {
  let userID = req.params.id;

  console.log(`User ID : ${userID}`);
  console.log(`ID from the token : ${req.user._id}` );
  if (req.user._id === userID) {
    // await Customer.findByIdAndDelete(userID)

    //   .then(() => {
    //     res.status(200).send({ status: "User has been Deleted" });
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //     // res.status(500).send({status : "Error with delete", error : err.message});
    //   });

    res.status(200).send({ status: "User has been Deleted" });
    console.log("Deleted !!!!")
  } else {
    res.status(403).json("You can not delete this profile.");
  }
});




// Protected route, can only be accessed when user is logged-in
router.post("/protected", verify, (req, res) => {
  return res.json({ message: "Protected content!" });
});





//Logout

router.post("/logout", verify, (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("You logged out successfully.");
});

//Get all customer emails

router.route("/getAllEmails").get((req, res) => {
  Customer.find()
    .then((customer) => {
      let emails = [];

      for (let i = 0; i < customer.length; i++) {
        emails.push(customer[i].Email);
      }

      res.json(emails);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get all customer usernames

router.route("/getUsernames").get((req, res) => {
  Customer.find()
    .then((customer) => {
      let usernames = [];

      for (let i = 0; i < customer.length; i++) {
        usernames.push(customer[i].Username);
      }

      res.json(usernames);
    })
    .catch((err) => {
      console.log(err);
    });
});

// update password
router.route("/updatePassword/:id").put(async (req, res) => {
  let userID = req.params.id;

  const { Password } = req.body;

  const updateC = await Customer.updateOne(
    { _id: userID },
    {
      $set: {
        Password: Password,
      },
    }
  )
    .then(() => {
      res.status(200).send({ status: "Password Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

// update login Status
router.route("/loginStatus/:id").put(async (req, res) => {
  let userID = req.params.id;

  const { LoginStatus } = req.body;

  const updateC = await Customer.updateOne(
    { _id: userID },
    {
      $set: {
        LoginStatus: LoginStatus,
      },
    }
  )
    .then(() => {
      res.status(200).send({ status: "Login Status Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

// get email
router.route("/getEmail/:email").get(async (req, res) => {
  let email = req.params.email;
  console.log(email);
  const user = await Customer.find({ Email: email })
    .then((customer) => {
      // res.status(200).send({status:"User fetched"});
      res.json(customer);
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get user", error: err.message });
    });
});

// check purchased cover

router
  .route("/checkPurchaseCovers/:customerid/:coverid")
  .get(async (req, res) => {
    let CustomerID = req.params.customerid;
    let CoverID = req.params.coverid;
    let status = false;
    const user = await Customer.find({ _id: CustomerID })
      .then((customer) => {
        // res.status(200).send({status:"User fetched"});

        for (let i = 0; i < customer[0].PurchasedCovers.length; i++) {
          if (CoverID == customer[0].PurchasedCovers[i]) {
            status = true;
          }
        }
        res.json(status);
      })
      .catch((err) => {
        console.log(err.message);
        res
          .status(500)
          .send({ status: "Error with get user", error: err.message });
      });
  });

// update purchased covers
router.route("/addPurchasedCover/:id").put(async (req, res) => {
  let CustomerID = req.params.id;
  const { PurchasedCovers } = req.body;

  const updatedArray = {
    PurchasedCovers,
  };

  const update = await Customer.findByIdAndUpdate(CustomerID, updatedArray)
    .then(() => {
      res.status(200).send({ status: "updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});



module.exports = router;
