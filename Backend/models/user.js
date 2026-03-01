const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose').default;

const userSchema = new mongoose.Schema({
    emailId:{
        type:String,
        unique:true,
        match:[/^\S+@\S+\.\S+$/, 'Invalid email format'],
        required: true
    },
    phoneNumber:{
        type:Number,
        minlength:9,
        maxlength:15,
        required: true
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);