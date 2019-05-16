const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Events = require("../../models/createEvent")

app.get("/createEvent", (req, res)=> {
      res.render("events/createEvent")
  })

app.post("/createEvent", (req, res)=> {  
    const { name, description, location, downloadUrl, ticketPrice, eventImage } = req.body
    debugger
    const newEvent = new Events({ name, description, location, downloadUrl, ticketPrice, eventImage });
    newEvent.save()
    .then(()=>{
        res.redirect('/')
    })
    .catch((err) => {
        console.log(err);
        res.render('err');
    })
})

app.get("/delete", (req, res)=> {
    let objectId = mongoose.Types.ObjectId(req.query.id)
    Events.deleteOne({_id: objectId}, (err)=> {
        if(err) res.status(500).send("Event was not deleted. Error.")
        else res.redirect("/")
    })
  })






module.exports = app