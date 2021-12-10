const router = require("express").Router();
let Covers = require("../models/Covers");

//Insert
router.route("/add").post((req, res) => {
  const Title = req.body.Title;
  const OriginalArtistName = req.body.OriginalArtistName;
  const ArrangedBy = req.body.ArrangedBy;
  const InstrumentsPlayedOn = req.body.InstrumentsPlayedOn;
  const SubCategory = req.body.SubCategory;
  const MainCategory = req.body.MainCategory;
  const NoOfPages = req.body.NoOfPages;
  const NoOfPreviewPages = req.body.NoOfPreviewPages;
  //const NoOfDownloads = req.body.NoOfDownloads;
  const Price = req.body.Price;
  const YoutubeLink = req.body.YoutubeLink;
  const FacebookLink = req.body.FacebookLink;
  const PreviewPages = req.body.PreviewPages;
  const CoverPdf = req.body.CoverPdf;
  //const FeedBackIDs = req.body.FeedBackIDs;
  // const Status = req.body.Status;
  // const UpdatedDateAndTime = req.body.UpdatedDateAndTime;
  const UpdatedUser = req.body.UpdatedUser;
  // const AddedDateAndTime = req.body.AddedDateAndTime;

  const newCovers = new Covers({
    Title,
    OriginalArtistName,
    InstrumentsPlayedOn,
    SubCategory,
    MainCategory,
    NoOfPages,
    NoOfPreviewPages,
    Price,
    ArrangedBy,
    YoutubeLink,
    FacebookLink,
    PreviewPages,
    UpdatedUser,
    CoverPdf,
  });

  newCovers
    .save()
    .then(() => {
      res.json({
        newCovers: {
          Title: newCovers.Title,
          OriginalArtistName: newCovers.OriginalArtistName,
          ArrangedBy: newCovers.ArrangedBy,
          InstrumentsPlayedOn: newCovers.InstrumentsPlayedOn,
          SubCategory: newCovers.SubCategory,
          MainCategory: newCovers.MainCategory,
          NoOfPages: newCovers.NoOfPages,
          NoOfPreviewPages: newCovers.NoOfPreviewPages,
          NoOfDownloads: newCovers.NoOfDownloads,
          Price: newCovers.Price,
          YoutubeLink: newCovers.YoutubeLink,
          FacebookLink: newCovers.FacebookLink,
          CoverPdf: newCovers.CoverPdf,
          FeedBackIDs: newCovers.FeedBackIDs,
          Status: newCovers.Status,
          UpdatedDateAndTime: newCovers.UpdatedDateAndTime,
          UpdatedUser: newCovers.UpdatedUser,
          AddedDateAndTime: newCovers.AddedDateAndTime,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
// get recommendation
// router.route("/getrecommendation").get(async (req, res) => {

//   const {
//     MainCategory,
//     SubCategory
//   } = req.body;
//   try {
//     const result = await Covers.find({ MainCategory: MainCategory, Status: 1 ,SubCategory : SubCategory});
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// });
// retrive

// route("/") this can use for fetching all the data from the DB
router.route("/getcovers").get((reg, res) => {
  Covers.find()
    .then((covers) => {
      res.json(covers);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: error.message });
    });
});

//Get all active covers
router.route("/getactive/").get(async (req, res) => {
  try {
    const result = await Covers.find({ Status: 1 });
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//Get covers by main category
router.route("/getcoverbymaincover/").get(async (req, res) => {
  let value = "Classical Guitar Covers";
  try {
    const result = await Covers.find({ MainCategory: value, Status: 1 });
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//Get covers by main category
router.route("/getcoverbymainexcercise/").get(async (req, res) => {
  let value = "Guitar Technics & Lessons";
  try {
    const result = await Covers.find({ MainCategory: value, Status: 1 });
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//getCoverById
router.route("/getcoverbyid/:id").get(async (req, res) => {
  let id = req.params.id;
  try {
    const result = await Covers.find({ _id: id });
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//Covers sort according to price range
router.route("/getcoverbypricerange/:price").get(async (req, res) => {
  let pricerange = req.params.price;
  try {
    const result = await Covers.find({ Price: { $gte: 150 } });
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// update
router.route("/update/:id").put(async (req, res) => {
  let coverID = req.params.id;
  const {
    Title,
    OriginalArtistName,
    ArrangedBy,
    InstrumentsPlayedOn,
    SubCategory,
    MainCategory,
    NoOfPages,
    NoOfPreviewPages,
    PreviewPages,
    //NoOfDownloads,
    Price,
    YoutubeLink,
    FacebookLink,
    CoverPdf,
    //FeedBackIDs,
    //Status,
    // UpdatedDateAndTime ,
    UpdatedUser,
    // AddedDateAndTime,
  } = req.body;

  const updateCovers = {
    Title,
    OriginalArtistName,
    ArrangedBy,
    InstrumentsPlayedOn,
    SubCategory,
    MainCategory,
    NoOfPages,
    NoOfPreviewPages,
    PreviewPages,
    //NoOfDownloads,
    Price,
    YoutubeLink,
    FacebookLink,
    CoverPdf,
    //FeedBackIDs,
    //Status,
    UpdatedDateAndTime: new Date(),
    UpdatedUser,
    // AddedDateAndTime,
  };

  const update = await Covers.findByIdAndUpdate(coverID, updateCovers)
    .then(() => {
      res.status(200).send({ status: "Cover updated" });
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
  let coverID = req.params.id;

  await Covers.findByIdAndDelete(coverID)
    .then(() => {
      res.status(200).send({ status: "Cover Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error with delete", error: err.message });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let coverID = req.params.id;
  const covers = await Covers.findById(coverID)
    .then((coverss) => {
      if(coverss.Status === "1"){
        res.json(coverss);

      }else{
        res.json(null)
      }
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get user", error: err.message });
    });
});

router.route("/getOneCover/:id").get(async (req, res) => {
  let coverID = req.params.id;
  const covers = await Covers.findById(coverID)
    .then((coverss) => {
      if(coverss.Status === "1" || coverss.Status === "2"){
        res.json(coverss);

      }else{
        res.json(null)
      }
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get user", error: err.message });
    });
});

router.route("/StatusUpdate/:id").put(async (req, res) => {
  let coverID = req.params.id;
  const { Status } = req.body;

  const StatusUpdate = {
    Status,
  };

  const update = await Covers.updateOne(
    { _id: coverID },
    { $set: { Status: Status } }
  )
    .then(() => {
      res.status(200).send({ status: "Status updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

router.route("/getRecommendations").get(async (req, res) => {
  const { MainCategory, SubCategory } = req.body;

  await Covers.find({ MainCategory: MainCategory, SubCategory: SubCategory })
    .then((covers) => {
      res.json(covers);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Error with get user", error: err.message });
    });
});

// Update by Chamodh
//Get covers by main category
router.route("/getcoverbymaincover/").get(async (req, res) => {
  let value = "Classical Guitar Covers";
  try {
    const result = await Covers.find({ MainCategory: value, Status: 1 });
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//Get covers by main category
router.route("/getcoverbymainexcercise/").get(async (req, res) => {
  let value = "Guitar Technics & Lessons";
  try {
    const result = await Covers.find({ MainCategory: value, Status: 1 });
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//getCoverById
router.route("/getcoverbyid/:id").get(async (req, res) => {
  let id = req.params.id;
  try {
    const result = await Covers.find({ _id: id });
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//Covers sort according to price range
router.route("/getcoverbypricerange/:price").get(async (req, res) => {
  let pricerange = req.params.price;
  try {
    const result = await Covers.find({ Price: { $gte: 150 } });
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//getActive and deactive covers
router.route("/getactivecovers/").get(async (req, res) => {
  let value = "Classical Guitar Covers";
  try {
    const result = await Covers.find({
      $or: [{ Status: 1 }, { Status: 2 }],
      $and: [{ MainCategory: value }],
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//getActive and deactive Exvercises
router.route("/getactiveExcercices/").get(async (req, res) => {
  let value = "Guitar Technics & Lessons";
  try {
    const result = await Covers.find({
      $or: [{ Status: 1 }, { Status: 2 }],
      $and: [{ MainCategory: value }],
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});





// increment NoOfDownloads by one 

router.route("/incrementCount/:id").put(async (req, res) => {
  let coverID = req.params.id;

  const covers = await Covers.findById(coverID)
  .then((coverss) => {

   
    const update =  Covers.updateOne(
      { _id: coverID },
      { $set: { NoOfDownloads: (Number(coverss.NoOfDownloads) + 1)} }
    )
      .then(() => {
        res.status(200).send({ status: "Count updated" });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ status: "Error with updating data", error: err.message });
      });
  })
  .catch((err) => {
    console.log(err.message);
    res
      .status(500)
      .send({ status: "Error with get user", error: err.message });
  });





  
});

module.exports = router;
