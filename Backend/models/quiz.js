const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    quiz:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("Quiz", quizSchema);