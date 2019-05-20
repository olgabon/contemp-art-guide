const express = require("express")
const app = express()
const User = require("../../models/user")
const bcrypt = require('bcrypt');


app.get("/login", (req, res)=> {
    res.render("user/login")
})

app.post("/login", (req, res)=> {
    User.find({username: req.body.username})
        .then((user)=> {
            if(user.length > 0) {
                bcrypt.compare(req.body.password, user[0].password, function(err, equal) {
                    if(equal) {
                            delete user[0].password
                        req.session.currentUser = user[0];
                        // res.cookie("loggedIn", "true", {signed: true})
                        res.redirect("/")
                    }
                    else {
                        res.redirect("loginTryAgain")
                    }
                })
            } else {
                res.send("Invalid credentials")
            }

        })
        .catch((err)=> {
            res.status(500).send("an error occured")
        })
})

app.get("/logout", (req, res)=> {
    // res.clearCookie("loggedIn")
    req.session.destroy((err)=> {
        if(err) res.redirect("/")
        else res.redirect("/")
    })
})

app.get("/loginTryAgain", (req, res)=> {
    res.render("user/loginTryAgain")
})

module.exports = app