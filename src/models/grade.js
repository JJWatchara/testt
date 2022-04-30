const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    id_member: { type: String, require: true },
    course: { type: String, require: true },
    credit: { type: Number, require: true },
    grade: { type: Number, require: true },
}, {
    
});
let Grade = mongoose.model("Grade",userSchema)
module.exports = Grade