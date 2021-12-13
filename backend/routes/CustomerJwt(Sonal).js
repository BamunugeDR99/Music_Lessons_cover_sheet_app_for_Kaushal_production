const express = require("express");
const router = require("express").Router();
let Customer = require("../models/JwtCustomer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// add new customer
router.route("/add").post(async (req, res) => {
  const Email = req.body.Email;
  const Username = req.body.Username;
  const Password = req.body.Password;

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
      Email,
      Username,
      Password,
    });

    await newCustomer.save();

    res.status(201).json({ message: "Customer Added Successfully!" });
  } catch (err) {
    console.log(err);
  }
});

// Customer login route with JWT
router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const customer = await Customer.findOne({Username : username});

    if(customer){
      // res.json(customer._id)
      const accessToken = jwt.sign({CustomerID : customer._id},"MySecretKey",{expiresIn : "40s"});
    res.json(accessToken);
    }else{
        res.json("Username or Password is invalid!")
    }
});


// verify token and if it's valide then it will call the route
const verify = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    if(authHeader){
            const token = authHeader.split(" ")[1];
            jwt.verify(token,"MySecretKey", (err)=>{
                if(err){
                    return res.json("Token is not valid!");
                }
                next();
            })
    }else{
        res.json("You are not authenticated!")
    }
}

// refresh token 
router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const customer = await Customer.findOne({Username : username});

    if(customer){
      // res.json(customer._id)
      const accessToken = jwt.sign({CustomerID : customer._id},"MySecretKey",{expiresIn : "40s"});
    res.json(accessToken);
    }else{
        res.json("Username or Password is invalid!")
    }
});


router.put("/update/:id",verify , async (req, res) => {
    let userID = req.params.id;
  
    const { username,password,email} = req.body;
  
    const updateCustomer = await Customer.updateOne(
      { _id: userID },
      {
        $set: {
          Username: username,
          Password: password,
          Email: email,
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


// verify token and return a boolean value
router.get("/verify", async (req, res) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
            const token = authHeader.split(" ")[1];
            jwt.verify(token,"MySecretKey", (err)=>{
                if(err){
                    return res.json(false);
                }
                return res.json(true)
            })
    }else{
        res.json(true)
    }

});






module.exports = router;
