const router = require("express").Router();
let Admin = require("../models/admin");

//Admin SignUp
router.route("/addAdmin").post(async(req,res)=>{

    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Username = req.body.Username;
    const Password = req.body.Password;
    

    const newAdmin = new Admin({
        FirstName,
        LastName,
        Username,
        Password,
        
        
    })


    newAdmin.save().then(() => {

        res.status(201).json({ message: "Admin Added Successfully!"});
     
    })
    .catch((err) => {
      
        console.log(err);
    
    });

}); 


//Get one admin
router.route("/getAdmin/:id").get(async (req,res) =>{
    let userID = req.params.id;
    const user = await Admin.findById(userID).then((adminss) =>{
        // res.status(200).send({status:"User fetched"});
        res.json(adminss);
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status : "Error with get user", error : err.message});
    })
});

//Get all admins
router.route("/getAllAdmins").get((req ,res)=> {
    Admin.find().then((admins)=>{
        res.json(admins)
        
    }).catch((err) =>{
        console.log(err)
    })
});


//Update

router.route("/updateAdmin/:id").put(async (req, res) => {
    
    let userID = req.params.id;
    const { FirstName, LastName, Password } = req.body;
  
    const updateAdmin = {

      FirstName,
      LastName,
      Password,

    };
  
    const update = await Admin.findByIdAndUpdate(userID, updateAdmin)
      .then(() => {
        res.status(200).send({ status: "Successfully Updated" });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ status: "Error with updating data", error: err.message });
      });
  });



//Delete
router.route("/deleteAdmin/:id").delete(async (req,res) =>{
    let userID = req.params.id;

        await Admin.findByIdAndDelete(userID)
        .then(() => {
            res.status(200).send({status : "Admin Deleted"});
        }).catch((err) => {

            console.log(err.message);
            res.status(500).send({status : "Error with delete", error : err.message});
        })
    });




//login
router.post('/loginAdmin', async(req,res) => {

    try{
            const {Username, Password} = req.body;

            if(!Username || !Password){

                return res.status(400).json({error: "Please filled the all data"})
            }

            //check with database username
            const adminLogin = await Admin.findOne({Username: Username});
    
            //console.log(customerLogin);
            if(!adminLogin){

                res.status(400).json({error: "Admin does not exists"});

            }

            else if (Password == adminLogin.Password){

                // res.json({message: "Admin Sign In Successfully"});
                //console.log(res.status.error);
                
                res.json({adminLogin: {
                    _id : adminLogin._id,
                }})
               
                
            }else{ 

                res.status(400).json({error: "Invalid Credientials"});
               
            }
          

    }catch(err){

        console.log(err);
    }


});

module.exports = router;