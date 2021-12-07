const router = require("express").Router();
let Cart = require("../models/shoppingCart");

router.route("/createCart").post((req, res) => {
  const CustomerID = req.body.CustomerID;
  const CoverIDs = req.body.CoverIDs;

  const newCart = new Cart({
    CustomerID,
    CoverIDs,
  });

  //Insert the created object to the DB //.save()->pass the obeject to the mongo DB through the schema in the model
  newCart
    .save()
    .then(() => {
      res.json("Cart Created"); //Pass to the frontend as response in json format
    })
    .catch((err) => {
      console.log(err); //Display the error in console
    });
});

router.route("/getAllCarts").get((req, res) => {
  //Variable declared at line 5
  Cart.find()
    .then((carts) => {
      res.json(carts);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Update cart
router.route("/updateCartCovers/:id").put(async (req, res) => {
  let customerID = req.params.id;


  const update = await Cart.updateOne(
    { CustomerID: customerID },
    { $set: { CoverIDs: [] } }
  )
    .then(() => {
      res.status(200).send({ status: "Cart updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

//Get one Customer's Cart
router.route("/getOneCart/:id").get((req, res) => {
  let customerID = req.params.id;

  const getOne = Cart.findOne({ CustomerID: customerID }).exec((err, post) => {
    if (err) {
      console.log(err);
    } else {
      res.send(post);
    }
  });
});

//Delete Cart
router.route("/deleteCart/:id").delete(async (req, res) => {
  let CartID = req.params.id;

  await Cart.findByIdAndDelete(CartID)
    .then(() => {
      res.status(200).send({ status: "Cart deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete Item", error: err.message });
    });
});

//delete cover from cart
router
  .route("/deleteCartCover/:coverid/:customerid")
  .delete(async (req, res) => {
    let coverid = req.params.coverid;
    let customerid = req.params.customerid;

    try {
      const result = await Cart.findOneAndUpdate(
        { CustomerID: customerid },
        { $pull: { CoverIDs: coverid } }
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

// db.getCollection('validacao_permalinks').update(
//   {'pecas.comentarios.id': "c1c586be8ded3d044f96fccc18473cf8"},
//   {
//       $pull: { 'pecas.$.comentarios': {
//           "id":"c1c586be8ded3d044f96fccc18473cf8"}
//       }
//    }
// )

router.route("/updateSItem/:id").put(async (req, res) => {
  let shoppingID = req.params.id;
  const { CustomerID, CoverIDs } = req.body;

  const updateItem = {
    CustomerID,
    CoverIDs,
  };

  const update = await Cart.findByIdAndUpdate(shoppingID, updateItem)
    .then(() => {
      res.status(200).send({ status: "cart updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

// router.route("/updateSItem/:id").put(async (req, res) => {
//     let CartID = req.params.id;
//     const {
//       customerID,
//       ItemIDs,PackageIDs

//     } = req.body;

//     const updateItem = {
//       customerID,
//       ItemIDs,
//       PackageIDs

//     };

//     const update = await Cart.findByIdAndUpdate(CartID, updateItem)
//       .then(() => {
//         res.status(200).send({ status: "cart updated" });
//       })
//       .catch((err) => {
//         console.log(err);
//         res
//           .status(500)
//           .send({ status: "Error with updating data", error: err.message });
//       });
//   });

module.exports = router;
