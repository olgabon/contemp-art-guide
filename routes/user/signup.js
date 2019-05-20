const express = require("express")
const app = express()
const User = require("../../models/user")
const bcrypt = require('bcrypt');


app.get("/signup", (req, res)=> {
    res.render("user/signup")
})
app.get("/userExists", (req, res)=> {
    res.render("user/userExists")
})

app.get("/signUpRedirect", (req, res)=> {
    res.render("user/signUpRedirect")
})

app.post("/signup", (req, res)=> {
    let newUser = {
        username: req.body.username,
        email: req.body.email,
    }
    User.find({username: req.body.username})
        .then((user)=> {
            if(user.length > 0) {
                res.redirect("/userExists")
            } else {
                bcrypt.hash(req.body.password, 10, function(err, hash) {
                    if(err) throw new Error("hashing error")
                    else {
                        newUser.password = hash
                        User.create(newUser)
                        .then((user)=> {
                            res.redirect('signUpRedirect')
                        })
                        .catch((err)=> {
                            res.status(500).send("An error occured")
                        })
                    }
                  });
            }
        })
        .catch((err)=> {
            res.status(500).send("An error occured")
    })

})

module.exports = app