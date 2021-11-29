const router = require("express").Router();
let MainCategory = require("../models/MainCategory");

//Insert
router.route("/add").post((req, res) => {
  const Name = req.body.Name;
  const SubCategories = req.body.SubCategories;
  const Status = req.body.Status;
//   const UpdatedDateAndTime = req.body.UpdatedDateAndTime;
  const UpdatedUser = req.body.UpdatedUser;
//   const AddedDateAndTime = req.body.AddedDateAndTime;

  const newMainCategory = new MainCategory({
    Name,
    SubCategories,
    Status,
    // UpdatedDateAndTime,
    UpdatedUser,
    // AddedDateAndTime
  });

  newMainCategory
    .save()
    .then(() => {
      res.json({
        newMainCategory: {
          _id: newMainCategory._id,
          // Name: newMainCategory.Name,
          SubCategories: newMainCategory.Name,
          Status : newMainCategory.Status,
        //   UpdatedDateAndTime : newMainCategory.UpdatedDateAndTime,
          UpdatedUser : newMainCategory.UpdatedUser,
        //   AddedDateAndTime : newMainCategory.AddedDateAndTime,
          
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
  MainCategory.find()
    .then((mainCategory) => {
      res.json(mainCategory);
    })
    .catch((err) => {
      console.log(err);
    });
});

// update
router.route("/update/:id").put(async (req, res) => {
  let mainCategoryID = req.params.id;
  const {
    // Name,
    SubCategories,
    Status,
    // UpdatedDateAndTime,
    UpdatedUser,
    // AddedDateAndTime,
   
  } = req.body;

  const updateMainCategory= {
    // Name,
    SubCategories,
    Status,
    UpdatedDateAndTime : new Date(),
    UpdatedUser,
    // AddedDateAndTime,
   
  };

  const update = await MainCategory.findByIdAndUpdate(mainCategoryID, updateMainCategory)
    .then(() => {
      res.status(200).send({ status: "MainCategory updated" });
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
  let mainCategoryID = req.params.id;

  await MainCategory.findByIdAndDelete(mainCategoryID)
    .then(() => {
      res.status(200).send({ status: "MainCategory Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error with delete", error: err.message });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let mainCategoryID = req.params.id;
  const mainCategory = await MainCategory.findById(mainCategoryID)
    .then((mainCategorys) => {
      res.json(mainCategorys);
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get user", error: err.message });
    });
});



//Update Status
router.route("/StatusUpdate/:id").put(async (req, res) => {
  let mainCategoryID = req.params.id;
  const{
        Status
       } = req.body;

  const StatusUpdate  = {
    Status
  }

  const update = await MainCategory.updateOne(

    {_id : mainCategoryID},
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

  //Update Classical Guitar Covers
router.route("/ClassicalUpdate/:id").put(async (req, res) => {
  let mainCategoryID = req.params.id;
  const{
        SubCategories,
        UpdatedDateAndTime,
       } = req.body;

  const ClassicalUpdate  = {
    SubCategories,
    UpdatedDateAndTime : new Date(),
  }

  const update = await MainCategory.updateOne(

    {_id : mainCategoryID},
    {$set : {SubCategories :SubCategories,UpdatedDateAndTime:UpdatedDateAndTime}},


  ).then(() => {

    res.status(200).send({ status: "Category updated" });
  })
  .catch((err) => {
    console.log(err);
    res
      .status(500)
      .send({ status: "Error with updating data", error: err.message });
  });


  })


    //Update Exercise and techniques
router.route("/ExerciseUpdate/:id").put(async (req, res) => {
  let mainCategoryID = req.params.id;
  const{
        SubCategories,
        UpdatedDateAndTime,
       } = req.body;

  const ExerciseUpdate  = {
    SubCategories,
    UpdatedDateAndTime : new Date(),
  }

  const update = await MainCategory.updateOne(

    {_id : mainCategoryID},
    {$set : {SubCategories :SubCategories,UpdatedDateAndTime:UpdatedDateAndTime}},


  ).then(() => {

    res.status(200).send({ status: "Category updated" });
  })
  .catch((err) => {
    console.log(err);
    res
      .status(500)
      .send({ status: "Error with updating data", error: err.message });
  });


  })

  router.route("/deleteSubCategory/:CategoryName/:id").delete(async (req, res) => {
    let CategoryName = req.params.CategoryName;
    let id = req.params.id;
  
    try {
      const result = await MainCategory.findOneAndUpdate({ _id : id }, {"$pull": {SubCategories: CategoryName}});
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

module.exports = router;
