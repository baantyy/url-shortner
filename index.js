const express = require("express")

const { mongoose } = require("./config/database")
const { routes } = require("./config/routes")

const app = express()
const port = 3000

app.use(express.json())
app.use("/",routes)

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(port,function(){
    console.log("Connecting to port", port)
})