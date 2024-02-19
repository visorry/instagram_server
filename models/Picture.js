const mongoose = require('mongoose')

const pictureSchema = new mongoose.Schema({
    quote: {type: String, required: true},
    photo : {type: String, required: true},
    device : {type: String, required: true},
    commentsCount : {type: Number, required: true},
    userID  : {type: String, required: true},
});

module.exports = mongoose.model('Picture' , pictureSchema);