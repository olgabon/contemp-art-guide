const express = require("express")
const app = express()
const mongoose = require("mongoose")
const hbs = require('hbs');
const bodyParser = require('body-parser')
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);
const bcrypt = require("bcrypt")
const saltRounds = 10;
const cookieParser = require('cookie-parser')

app.use(session({
    secret: "basic-auth-secret",
    cookie: { maxAge: 60000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
  }));
app.use(cookieParser("super secret")) // for signed cookies

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public/'))

// Bodyparser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


mongoose.connect('mongodb://localhost/events', {useNewUrlParser: true}, (err)=> {
    if(!err)console.log("connected")
    else console.log("ERROR ERROR ERROR", err)
})


app.use("/", attachUserInfo, require("./routes/events/eventsList"))
app.use("/", attachUserInfo, require("./routes/events/createEvent"))
app.use("/", attachUserInfo, require("./routes/events/details"))
app.use("/", attachUserInfo, require("./routes/user/login"))
app.use("/", attachUserInfo, require("./routes/user/signup"))


function attachUserInfo(req, res, next) {
    res.locals.currentUser = req.session.currentUser
    next()
  }



app.listen(3000, ()=> {
    console.log("Listening!!!!!")
})