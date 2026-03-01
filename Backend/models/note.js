const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    time: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
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
});

module.exports = mongoose.model("Notes", noteSchema);