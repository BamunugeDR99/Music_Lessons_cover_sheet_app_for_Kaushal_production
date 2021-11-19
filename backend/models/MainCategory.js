const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MainCategorySchema = new Schema({
    Name : {
        type : String,
        required : true
    },

    Status : {
        type : String,
        required : false
    },

    SubCategories : [{
        type : String,
        required : true
    }],

    AddedDateAndTime : {
        type : Date,
        required: true,
        default : new Date()
    },

    UpdatedDateAndTime : {
        type : Date,
        required : false,
        default : null
    },
    UpdatedUser : {
        type : String,
        required : false,
        default : null
    }

})

const MainCategory = mongoose.model("MainCategory",MainCategorySchema);
module.exports = MainCategory;