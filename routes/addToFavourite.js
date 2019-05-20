const express = require("express")
const app = express()
const User = require("../models/user");

app.get("/addToFavourite", (req, res) => {
    console.log(req.query);
    const eventId = req.query.eventId;
    const userId = req.session.currentUser._id;
    debugger
    User.findOneAndUpdate({_id: userId }, {$addToSet:{events: eventId}}).then(updatedUser => {
        debugger
        res.redirect("/details/" + eventId);
    }).catch(err => {
        debugger
        throw err;
    })   
});

  module.exports = app;