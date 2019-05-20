const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    events:  [{type: mongoose.Schema.Types.ObjectId, ref: "createEvent"}]    
})

module.exports = mongoose.model("user", userSchema)
