const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Events = require("../../models/createEvent")

app.get("/", (req, res)=> {
  Events.find({}, (err, result)=> {
      res.render("index", {events: result})
  })
})


module.exports = app