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
        required : false,
        default : "Kaushal Rashmika"

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
        required : false,
        default : "0"
        
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
        required : false,
        default : null
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
        required: false,
        default : new Date().toLocaleString('en-US', {timeZone : 'Asia/Colombo'}),
    }

})

const Covers = mongoose.model("Covers",CoversSchema);
module.exports = Covers;