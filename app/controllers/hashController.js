const express = require("express")
const useragent = require("express-useragent")
const router = express.Router()
const { Bookmark } = require("../models/bookmarkModel")

router.use(useragent.express())

//localhost:3000/:hash - redirect to url by hash value
router.get("/:hash",function(req,res){
    const hash = req.params.hash
    const clickInfo = {
        ip: req.headers['x-real-ip'] || req.connection.remoteAddress,
        browser: req.useragent.browser,
        os: req.useragent.os,
        device: req.useragent.platform
    }                
    Bookmark.findOneAndUpdate({hashedUrl: hash}, {$push: {clickInfo: clickInfo}}, {new: true, runValidators: true})
        .then(function(bookmark){
            if(bookmark){
                res.redirect(bookmark.originalUrl)
            }else{
                res.send({
                    notice: "The resource you are looking for doesn’t exist"
                })
            }
        })
        .catch(function(err){
            res.send(err)
        })
})

module.exports = {
    hashRouter: router
}