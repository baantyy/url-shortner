const mongoose = require("mongoose")
const validator = require("validator")
const shorthash = require("shorthash")

const Schema = mongoose.Schema
const bookmarkSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    originalUrl:{
        type: String,
        required: true,
        unique: true
    },
    hashedUrl:{
        type: String
    },
    tags:{
        type: Array,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    clickInfo:[{
        ip: String,
        browser: String,
        os: String,
        device: String,
        date:{
            type: Date,
            default: Date.now
        }
    }]
})

//before saving
bookmarkSchema.pre("save",function(next){
    const bookmark = this    
    if(validator.isURL(bookmark.originalUrl)){
        if(bookmark.isNew){
            bookmark.hashedUrl = shorthash.unique(bookmark.originalUrl)
        }
        next()
    }else{
        return Promise.reject("url is invalid")
    }
})

//static methods


//instance methods

const Bookmark = mongoose.model("Bookmark",bookmarkSchema)
module.exports = {
    Bookmark
}