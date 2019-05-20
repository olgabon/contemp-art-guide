const express = require("express")
const app = express()
const Events = require("../../models/createEvent")

//app.get("/", (req, res)=> {
//  Events.find({}, (err, result)=> {
//      res.render("index", {events: result})
//  })
//})

app.get("/", (req, res)=> {
  let city = req.query.search,
      searchQuery;

  if(city) searchQuery = {
    'city': new RegExp(city, 'i')
  }
  else searchQuery = {}
  Events.find(searchQuery, (err, result)=> {

    var dateEndResult = result.map(function(oneresult) {
      return Date.parse(oneresult.end)
    });
    console.log('endresult', dateEndResult)
    // if(Date.now() > result.end) {

    // }

    
      res.render("index", {events: result})
  })
  .catch((err) => {
        console.log(err);
        res.send('err');
    })
})

module.exports = app
