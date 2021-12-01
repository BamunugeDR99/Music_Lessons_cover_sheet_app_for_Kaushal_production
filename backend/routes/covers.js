const router = require("express").Router();
let Covers = require("../models/Covers");

//Insert
router.route("/add").post((req, res) => {
  const Title = req.body.Title;
  const OriginalArtistName = req.body.OriginalArtistName;
  const ArrangedBy = parseInt(req.body.ArrangedBy);
  const InstrumentsPlayedOn = req.body.InstrumentsPlayedOn;
  const SubCategory = req.body.SubCategory;
  const MainCategory = req.body.MainCategory;
  const NoOfPages = req.body.NoOfPages;
  const NoOfPreviewPages = req.body.NoOfPreviewPages;
  const NoOfDownloads = req.body.NoOfDownloads;
  const Price = req.body.Price;
  const YoutubeLink = req.body.YoutubeLink;
  const FacebookLink = req.body.FacebookLink;
  const PreviewPages = req.body.PreviewPages;
  const CoverPdf = req.body.CoverPdf;
  const FeedBackIDs = req.body.FeedBackIDs;
  const Status = req.body.Status;
  // const UpdatedDateAndTime = req.body.UpdatedDateAndTime;
  const UpdatedUser = req.body.UpdatedUser;
  // const AddedDateAndTime = req.body.AddedDateAndTime;

  const newCovers = new Covers({
    Title,
    OriginalArtistName,
    ArrangedBy,
    InstrumentsPlayedOn,
    SubCategory,
    MainCategory,
    NoOfPages,
    NoOfPreviewPages,
    NoOfDownloads,
    Price,
    YoutubeLink,
    FacebookLink,
    PreviewPages,
    CoverPdf,
    FeedBackIDs,
    Status,
    UpdatedDateAndTime,
    UpdatedUser,
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
          // UpdatedDateAndTime : newCovers.UpdatedDateAndTime,
          UpdatedUser: newCovers.UpdatedUser,
          // AddedDateAndTime : newCovers.AddedDateAndTime,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

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
    NoOfDownloads,
    Price,
    YoutubeLink,
    FacebookLink,
    CoverPdf,
    FeedBackIDs,
    Status,
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
    NoOfDownloads,
    Price,
    YoutubeLink,
    FacebookLink,
    CoverPdf,
    FeedBackIDs,
    Status,
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

// // get one cover details (Specific)
router.route("/get/:id").get(async (req, res) => {
  let coverID = req.params.id;
  const covers = await Covers.findById(coverID)
    .then((coverss) => {
      // res.status(200).send({status:"User fetched"});
      res.json(coverss);
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get user", error: err.message });
    });
});

//Update status
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

module.exports = router;
