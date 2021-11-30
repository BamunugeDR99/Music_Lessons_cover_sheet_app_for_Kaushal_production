const router = require("express").Router();
let SubCategory = require("../models/SubCategory");

//Insert
router.route("/add").post((req, res) => {
  const Name = req.body.Name;
  const Status = req.body.Status;
//   const UpdatedDateAndTime = req.body.UpdatedDateAndTime;
  const UpdatedUser = req.body.UpdatedUser;
//   const AddedDateAndTime = req.body.AddedDateAndTime;

  const newSubCategory = new SubCategory({
    Name,
    Status,
    // UpdatedDateAndTime,
    UpdatedUser,
    // AddedDateAndTime
  });

  newSubCategory
    .save()
    .then(() => {
      res.json({
        newSubCategory: {
          _id: newSubCategory._id,
          Status : newSubCategory.Status,
        //   UpdatedDateAndTime : newSubCategory.UpdatedDateAndTime,
          UpdatedUser : newSubCategory.UpdatedUser,
        //   AddedDateAndTime : newSubCategory.AddedDateAndTime,
          
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// retrive

// route("/") this can use for fetching all the data from the DB
router.route("/get").get((reg, res) => {
  SubCategory.find()
    .then((subCategory) => {
      res.json(subCategory);
    })
    .catch((err) => {
      console.log(err);
    });
});

// update
router.route("/update/:id").put(async (req, res) => {
  let subCategoryID = req.params.id;
  const {
    Name,
    Status,
    // UpdatedDateAndTime,
    UpdatedUser,
    // AddedDateAndTime,
   
  } = req.body;

  const updateSubCategory= {
    Name,
    Status,
    UpdatedDateAndTime : new Date(),
    UpdatedUser,
    // AddedDateAndTime,
   
  };

  const update = await SubCategory.findByIdAndUpdate(subCategoryID, updateSubCategory)
    .then(() => {
      res.status(200).send({ status: "SubCategory updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

// // delete
router.route("/delete/:id").delete(async (req, res) => {
  let subCategoryID = req.params.id;

  await SubCategory.findByIdAndDelete(subCategoryID)
    .then(() => {
      res.status(200).send({ status: "SubCategory Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error with delete", error: err.message });
    });
});

// // get one student details (Specific)
router.route("/get/:id").get(async (req, res) => {
  let subCategoryID = req.params.id;
  const subCategory = await SubCategory.findById(subCategoryID)
    .then((subCategorys) => {
      // res.status(200).send({status:"User fetched"});
      res.json(subCategorys);
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get user", error: err.message });
    });
});



//Update Discount
router.route("/StatusUpdate/:id").put(async (req, res) => {
  let subCategoryID = req.params.id;
  const{
        Status
       } = req.body;

  const StatusUpdate  = {
    Status
  }

  const update = await SubCategory.updateOne(

    {_id : subCategoryID},
    {$set : {Status :Status}},


  ).then(() => {

    res.status(200).send({ status: "Status updated" });
  })
  .catch((err) => {
    console.log(err);
    res
      .status(500)
      .send({ status: "Error with updating data", error: err.message });
  });


  })


module.exports = router;
