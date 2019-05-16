const express = require("express")
const app = express()
const Events = require("../../models/createEvent")

app.get('/details/:id', (req, res) => {
    debugger
    Events.findOne({_id:req.params.id})
    .then(event => {
        console.log(event.downloadURL)
        debugger
    res.render('events/details', {eventURL: event.downloadURL});
    })
    .catch((err) => {
        console.log(err);
        res.render('err');
    })
})

module.exports = app