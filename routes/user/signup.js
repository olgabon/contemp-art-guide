const express = require("express")
const app = express()
const User = require("../../models/user")
const bcrypt = require('bcrypt');


app.get("/signup", (req, res)=> {
    res.render("user/signup")
})

app.post("/signup", (req, res)=> {
    let newUser = {
        username: req.body.username,
        email: req.body.email,
    }
    User.find({username: req.body.username})
        .then((user)=> {
            if(user.length > 0) {
                res.send("User name already exists")
            } else {
                bcrypt.hash(req.body.password, 10, function(err, hash) {
                    // Store hash in your password DB.
                    debugger
                    if(err) throw new Error("hashing error")
                    else {
                        newUser.password = hash
                        User.create(newUser)
                        .then((user)=> {
                            res.redirect('/')
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