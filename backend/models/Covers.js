const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CoversSchema = new Schema({
    Title : {
        type : String,
        required : true
    },

    OriginalArtistName : {
        type : String,
        required : true
    },

    ArrangedBy : {
        type : String,
        required : true
    },

    InstrumentsPlayedOn : [{
        type : String,
        required : true
    }],

    SubCategory : {
        type : String,
        required : true
    },

    MainCategory : {
        type : String,
        required : true
    },

    NoOfPages : {
        type : String,
        required : true
    },

    NoOfPreviewPages : {
        type : String,
        required : true
    },
    
    NoOfDownloads : {
        type : String,
        required : true
    },

    Price : {
        type : String,
        required : true
    },

    YoutubeLink: {
        type : String,
        required : false,
        default: null
    },

    FacebookLink : {
        type : String,
        required : false,
        default: null
    },

    PreviewPages : [{
        type : String,
        required : true
    }],

    CoverPdf : {
        type : String,
        required :true
    },

    FeedBackIDs : [{
        type : String,
        required : true,
    }],

    Status : {
        type : String,
        required : false,
        default : "1"
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
    },

    AddedDateAndTime : {
        type : Date,
        required: true,
        default : new Date()
    }

})

const Covers = mongoose.model("Covers",CoversSchema);
module.exports = Covers;