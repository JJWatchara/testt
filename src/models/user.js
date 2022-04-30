const mongoose = require('mongoose');

const collection = 'user';

const userSchema = mongoose.Schema({
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, require: true },
}, {
    
});
let Users = mongoose.model("User",userSchema)
module.exports = Users