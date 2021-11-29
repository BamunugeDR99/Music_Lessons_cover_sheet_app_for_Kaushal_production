const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ShoppingCartSchema = new Schema({

    CustomerID : {
        type : String,
        required : true
    },

    CoverIDs : [{

        type:String
    }],
})

const ShoppingCart = mongoose.model("ShoppingCart",ShoppingCartSchema);
module.exports = ShoppingCart;