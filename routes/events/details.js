const express = require("express")
const app = express()
const Events = require("../../models/createEvent")

app.get('/details/:id', (req, res) => {
    Events.findOne({_id:req.params.id})
    .then(event => {
    res.render('events/details', event);
    })
    .catch((err) => {
        console.log(err);
        res.send('err');
    })
})

module.exports = app