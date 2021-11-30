const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
    Name : {
        type : String,
        required : true
    },

    Status : {
        type : String,
        required : false
    },

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

const SubCategory = mongoose.model("SubCategory",SubCategorySchema);
module.exports = SubCategory;