const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    url: {
        type:String,
        required: true
    },
    thumbnail: {
        type:String,
        required: true
    },
    order: {
        type:Number,
        required: true
    },
    checked: {
        type: Boolean,
        default: false
    },
    folderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
})

module.exports = mongoose.model('Video', videoSchema);