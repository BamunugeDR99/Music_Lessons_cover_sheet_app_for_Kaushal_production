const router = require("express").Router();
let Customer = require("../models/customer");
const bcrypt = require('bcryptjs');



//Customer SignUp
router.route("/add").post(async(req,res)=>{

    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Email = req.body.Email;
    const ContactNumber = req.body.ContactNumber;
    const Gender = req.body.Gender;
    const Country = req.body.Country;
    const Username = req.body.Username;
    const Password = req.body.Password;
    
    
 try{

    const emailExist = await Customer.findOne({ Email: Email});
 
    if(emailExist){
 
      return res.status(422).json({ error: "Email Already Exist"});
    }
 
    const usernameExist = await Customer.findOne({ Username: Username});
 
    if(usernameExist){
 
     return res.status(422).json({ error: "Username Already Exist"});
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

        
     })
 
     await newCustomer.save();
 
 
    res.status(201).json({ message: "Customer Added Successfully!"});
 
     } catch(err){
 
         console.log(err);
     }
 
 }); 
 


//Get one customer
router.route("/get/:id").get(async (req,res) =>{

    let userID = req.params.id;

    const user = await Customer.findById(userID).then((cutomerss) =>{
        // res.status(200).send({status:"User fetched"});
        res.json(cutomerss);
        
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status : "Error with get user", error : err.message});
    })
});




//Get all customers
router.route("/getAll").get((req ,res)=> {
    Customer.find().then((customer)=>{
        res.json(customer)
        
    }).catch((err) =>{
        console.log(err)
    })
});




// Update CUstomer
router.route("/update/:id").put(async (req,res) =>{
    let userID = req.params.id;
    
    const{FirstName, LastName , Email, ContactNumber, Gender, Country , Username, Password} = req.body;

    //  FeedBackIDs, OrderIDs, LoginStatus, DeleteStatus, UpdatedUser
    try{

        
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
       
    }


    const update = await Customer.findByIdAndUpdate(userID, updatedCustomer);
        res.status(200).send({status: "User Updated"})

        }catch(err){
            console.log(err);
            res.status(500).send({status: "Error with updating data", error:err.message});
        }
    });

    // Delete CUstomer
router.route("/delete/:id").delete(async (req,res) =>{
    let userID = req.params.id;

        await Customer.findByIdAndDelete(userID)
        .then(() => {
            res.status(200).send({status : "User Deleted"});
        }).catch((err) => {

            console.log(err.message);
            res.status(500).send({status : "Error with delete", error : err.message});
        })
    });

//Update One

    router.route("/updateCus/:id").put(async (req, res) => {
        let userID = req.params.id;

        const{
              FeedBackIDs,
              OrderIDs,
              LoginStatus,
              DeleteStatus

             } = req.body;
      
        const updateC = await Customer.updateOne(
      
          {_id : userID},
          {$set : {FeedBackIDs :FeedBackIDs ,  OrderIDs: OrderIDs, LoginStatus : LoginStatus,  DeleteStatus :  DeleteStatus }},
      
      
        ).then(() => {
      
          res.status(200).send({ status: "Updated" });
        })
        .catch((err) => {
          console.log(err);
          res
            .status(500)
            .send({ status: "Error with updating data", error: err.message });
        });
      
      
        })


//Login route

router.post('/loginCustomer', async(req,res) => {

    try{
            const {Username, Password} = req.body;

            // if(!username || !password){

            //     return res.status(400).json({error: "Please filled the all data"})
            // }

            //check with database username

            const customerLogin = await Customer.findOne({ Username: Username });

            if(customerLogin){

                const isMatch = await bcrypt.compare(Password, customerLogin.Password);
            
            if(!isMatch){   
                
                res.status(400).json({error: "Invalid Credientials"});

            }else{

                //res.json({message: "Customer Sign In Successfully"});
                res.json({customerLogin: {
                    _id : customerLogin._id,
                }});

            }
        }else{

            res.status(400).json({error: "Customer does not exists"});
        }
           
            
    

    }catch(err){

        console.log(err);
    }


});

module.exports = router;