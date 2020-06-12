const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes")
const bodyParser = require("body-parser")
require('dotenv').config()

const app = express()

mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.use(bodyParser.json())
    app.use("/api", routes)

    app.listen(5000, () => {
      console.log("Server has started!")
    })
  }, err => {
      console.log(err)
  })

  module.exports = app;