const express = require("express")
const router = express.Router()
const { Bookmark } = require("../models/bookmarkModel")

//localhost:3000/bookmarks - create a bookmark
router.post("/",function(req,res){
    const body = req.body
    const bookmark = new Bookmark(body)
    bookmark.save()
        .then(function(bookmark){
            res.send(bookmark)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3000/bookmarks - show all bookmarks
router.get("/",function(req,res){
    Bookmark.find()
        .then(function(bookmark){
            res.send(bookmark)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3000/bookmarks/id/:id - show bookmark by id
router.get("/id/:id",function(req,res){
    const id = req.params.id
    Bookmark.findById(id)
        .then(function(bookmark){
            res.send(bookmark)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3000/bookmarks/:id - update bookmark by id
router.put("/:id",function(req,res){
    const id = req.params.id
    const body = req.body
    Bookmark.findByIdAndUpdate(id, body, {new: true, runValidators: true})
        .then(function(bookmark){
            if(bookmark){
                res.send({
                    bookmark,
                    notice: "successfully updated"
                })
            }
            else{
                res.status('404').send({})
            }
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3000/bookmarks/:id - delete bookmark by id
router.delete("/:id",function(req,res){
    const id = req.params.id
    Bookmark.findByIdAndDelete(id)
        .then(function(bookmark){
            if(bookmark){
                res.send({
                    bookmark,
                    notice: "successfully removed"
                })
            }else{
                res.status("404").send({})
            }
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3000/bookmarks/tags/:name - show bookmarks by tag name
router.get("/tags/:name",function(req,res){
    const name = req.params.name
    Bookmark.find({tags: name})
        .then(function(bookmark){
            res.send(bookmark)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3000/bookmarks/tags?name=tag1,tag2 - show bookmarks by tag names
router.get("/tags",function(req,res){
    const tags = req.query.names
    const tagsArray = tags.split(",")
    // //$in - OR, $all - AND
    Bookmark.find({tags: {$in: tagsArray}})
        .then(function(bookmark){
            res.send(bookmark)
        })
        .catch(function(err){
            res.send(err)
        })
})

module.exports = {
    bookmarkRouter: router
}