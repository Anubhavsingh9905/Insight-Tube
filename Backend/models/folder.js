const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    order: {
        type: Number,
        required: true
    },
    progressPercentage: {
        type: Number,
        default: 0,
    },
    videoCnt: {
        type: Number,
        default: 0,
    },
    checkedCnt: {
        type: Number,
        default: 0,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
})

module.exports = mongoose.model('Folder', folderSchema);