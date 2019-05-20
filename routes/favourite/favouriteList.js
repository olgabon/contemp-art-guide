const express = require("express")
const app = express()
const User = require("../../models/user")

app.get("/favouriteList/:id", (req, res)=> {
    const userId = req.session.currentUser._id
    User.findById(userId).populate("events").exec().then(user => {
        res.render("favorites", {events:user.events})

    }).catch(err => {
        throw err;
    })

})

module.exports = app
