const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Events = require("../../models/createEvent")
const User = require("../../models/user")

app.get("/createEvent", (req, res)=> {
      res.render("events/createEvent")
})

app.post("/createEvent", (req, res)=> {  
    const { name, description, city, location, start, end, downloadURL, ticketPrice, eventImage } = req.body
    const newEvent = new Events({ name, description, city, location, start, end, downloadURL, ticketPrice, eventImage });
    newEvent.save()
    .then(()=>{
        res.redirect('/')
    })
    .catch((err) => {
        res.render('err');
    })
})

app.get("/delete", (req, res)=> {
    let myId = mongoose.Types.ObjectId(req.session.currentUser._id)
    let eventToRemove = mongoose.Types.ObjectId(req.query.id)
    User.update({_id: myId}, { $pullAll: {events: [eventToRemove]} }, (err)=> {
        if(err) res.status(500).send("Event was not deleted. Error.")
        else res.redirect("/favouriteList/:id")
    })
})

module.exports = app