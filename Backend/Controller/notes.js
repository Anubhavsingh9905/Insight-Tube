const Video = require('../models/video');
const Folder = require('../models/folder');
const Note = require('../models/note');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports.getNotes = async(req, res) => {
    try{
        const id = new ObjectId(req.params);
        const userId = req.user._id;

        //console.log(id);

        const Notes = await Note.find({videoId: id, owner:userId});
        res.status(200).json(Notes);
    }
    catch(error){
        //console.log(error);
        res.status(500).json({message:"Some thing wnet wrong"});
    }
}

module.exports.addNotes = async(req, res) => {
    try{
        const {id, item, time, vId, Fid} = req.body;
        const userId = req.user._id;
        
        if(await Note.findOne({time: time, videoId: vId})){
            res.status(400).json({message: "You alread store a note on this timeStamp"});
            return;
        }
        //console.log(`userId:-- ${userId}, folderId:---- ${Fid}, videoId  :-- ${vId}`);
        //console.log(`video ${await Video.findById(vId)}`);
        const res1 = await Video.find({_id: vId, owner:new ObjectId(userId)});
        const res2 = await Folder.find({_id: Fid, author:new ObjectId(userId)});
        //console.log(res1);
        //console.log(res2);
        if( res1.length == 0|| res2.length == 0){
            res.status(400).json({message: "Folder or Video of the id is not exist"});
            return;
        }
        
        const newNote = new Note({
            id: id,
            time: time,
            content:item,
            videoId: vId,
            folderId: Fid,
            owner: req.user._id
        })

        await newNote.save();
        res.status(200).json("notes saved successfully");
    }
    catch(error){
        //console.log(error);
        res.status(500).json({message: "some thing went wrong"});
    }
}

module.exports.deleteNotes = async(req, res) => {
    try {
        const {nId} = req.params;
        //console.log(`id is this ${nId}`)
        await Note.findOneAndDelete({id: nId});

        res.status(200).json("notes deleted successfully");
    } catch (error) {
        //console.log(error);
        res.status(500).json({message: "some thing went wrong"});
    }
}