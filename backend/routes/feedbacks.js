const router = require("express").Router();
let Feedback = require("../models/feedback");

//Add Feedback
router.route("/addFeedback").post(async(req,res)=>{

    const 
    {

    Comment,
    CustomerID,
    CoverID,
    // UpdatedUser


    }= req.body;
    

    const newFeedback = new Feedback({
      
        Comment,
        CustomerID,
        CoverID,
     // UpdatedUser
        
        
    })


    newFeedback.save().then(() => {

        res.status(201).json({ message: "Feedback Added Successfully!"});
     
    })
    .catch((err) => {
      
        console.log(err);
    
    });

}); 


//Issue
//Get one feedback
router.route("/getFeedback/:id").get(async (req,res) =>{

    let userID = req.params.id;

    const feedback = await Feedback.findById(userID).then((feedbackss) =>{
        // res.status(200).send({status:"User fetched"});
        res.json(feedbackss);
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status : "Error with get user", error : err.message});
    })
});


//Get all feedbacks
router.route("/getAllFeedback").get((req ,res)=> {
    Feedback.find().then((feedbacks)=>{
        res.json(feedbacks)
        
    }).catch((err) =>{
        console.log(err)
    })
});


//Update

router.route("/updateFeedback/:id").put(async (req, res) => {
    
    let userID = req.params.id;
    const
    { 
        Comment,
        CustomerID,
        CoverID,
    
    
    
    } = req.body;
  
    const updateFeedback = {

      Comment,
      CustomerID,
      CoverID,

    };
  
    const update = await Feedback.findByIdAndUpdate(userID, updateFeedback)
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
router.route("/deleteFeedback/:id").delete(async (req,res) =>{
    let userID = req.params.id;

        await Feedback.findByIdAndDelete(userID)
        .then(() => {
            res.status(200).send({status : "Feedback Deleted"});
        }).catch((err) => {

            console.log(err.message);
            res.status(500).send({status : "Error with delete", error : err.message});
        })
    });



module.exports = router;