const express = require("express");
const router = require("express").Router();
let Customer = require("../models/customer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

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

//Get one customer
router.route("/get/:id").get(async (req, res) => {
  let userID = req.params.id;

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
});

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

// Update CUstomer
router.route("/update/:id").put(async (req, res) => {
  let userID = req.params.id;

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
      // FeedBackIDs,
      // OrderIDs,
      // LoginStatus,
      // DeleteStatus,
      // UpdatedUser
    };

    const update = await Customer.findByIdAndUpdate(userID, updatedCustomer);
    res.status(200).send({ status: "User Updated" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ status: "Error with updating data", error: err.message });
  }
});

// Delete CUstomer
router.route("/delete/:id").delete(async (req, res) => {
  let userID = req.params.id;

  await Customer.findByIdAndDelete(userID)
    .then(() => {
      res.status(200).send({ status: "User Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error with delete", error: err.message });
    });
});

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

let refreshTokens = [];

//Issue

router.post("/refresh", (req, res) => {
  //take the refresh token from the user

  const refreshToken = req.body.token;

  //send error if there is no token or it's invalid

  if (!refreshToken) return res.status(401).json("You are not authenticated!");

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }

  //if everything is ok, create new access token, refresh token and send to user

  jwt.verify(refreshToken, "myRefreshSecretKey", (err, customerLogin) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(customerLogin);
    const newRefreshToken = generateRefreshToken(customerLogin);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accsessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
});

const generateAccessToken = (customerLogin) => {
  return jwt.sign({ id: customerLogin._id }, "mySecretKey", {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (customerLogin) => {
  return jwt.sign({ id: customerLogin._id }, "myRefreshSecretKey");
};

//Login route

router.post("/loginCustomer", async (req, res) => {
  try {
    const { Username, Password } = req.body;

    // if(!username || !password){

    //     return res.status(400).json({error: "Please filled the all data"})
    // }

    //check with database username

    const customerLogin = await Customer.findOne({ Username: Username });

    if (customerLogin) {
      const isMatch = await bcrypt.compare(Password, customerLogin.Password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credientials" });
      } else {
        //res.json({message: "Customer Sign In Successfully"});

        //Generate access token

        const accsessToken = generateAccessToken(customerLogin);
        const refreshToken = generateRefreshToken(customerLogin);

        refreshTokens.push(refreshToken);

        res.cookie("jwt", accsessToken, {
          expires: new Date(Date.now() + 30000),
          httpOnly: true,
        });

        // console.log(`this is the cookie ${req.cookies.jwt}`);

        res.json({
          customerLogin: {
            _id: customerLogin._id,
            accsessToken: accsessToken,
            refreshToken: refreshToken,
          },
        });

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

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "mySecretKey", (err, customerLogin) => {
      if (err) {
        return res.status(403).json("Token is Invalid!");
      }

      req.customerLogin = customerLogin;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated");
  }
};

router.delete("/deleteUser/:id", verify, async (req, res) => {
  let userID = req.params.id;

  if (req.customerLogin.id === userID) {
    await Customer.findByIdAndDelete(userID)

      .then(() => {
        res.status(200).send({ status: "User has been Deleted" });
      })
      .catch((err) => {
        console.log(err.message);
        // res.status(500).send({status : "Error with delete", error : err.message});
      });
  } else {
    res.status(403).json("You can not delete this profile.");
  }
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
