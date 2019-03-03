const express = require("express")
const router = express.Router()

const { bookmarkRouter } = require("../app/controllers/bookmarkController")
const { hashRouter } = require("../app/controllers/hashController")

router.use("/bookmarks",bookmarkRouter)
router.use("/",hashRouter)

module.exports = {
    routes: router
}