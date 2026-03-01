const Video = require('../models/video');
const Folder = require('../models/folder');
const User = require('../models/user');
const Note = require('../models/note');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports.getVideos = async(req, res) => {
    try {
        const userId = req.user._id;
        const id = new ObjectId(req.params.id);
        // console.error(req.params.id);
        // console.error(id);

        
        const videos = await Video.find({folderId: id, owner: userId}).sort({order: 1});
        //console.log(videos);
        res.json(videos)
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
}

module.exports.getVideo = async(req, res) => {
    try {
        const {id} = req.params;
        
        const video = await Video.findById(id);
        //console.log(id)
        //console.log(video);
        res.json(video);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}

module.exports.saveVideo = async (req, res) => {
    try {
        const { newtitle, newurl, newthumbnail, Fid } = req.body;

        if(await Video.findOne({url: newurl, folderId: Fid})){
            //console.log(await Video.findOne({url: newurl}));
            res.status(500).json("video is already present")
            return; 
        }

        const count = await Video.countDocuments({folderId: Fid})
        //console.log(count);

        const newVideo = new Video({
            title: newtitle,
            url: newurl,
            thumbnail: newthumbnail,
            folderId: Fid,
            order: count,
            owner: req.user._id
        });
        
        //console.log(`${newtitle}, ${newurl}, ${newthumbnail}, ${Fid}`);

        await newVideo.save();

        // update the video count when video get deleted 
        await Folder.findByIdAndUpdate(Fid, {$inc: {videoCnt: 1}});


        //update the progress percentage
        const folder = await Folder.findById(Fid, {videoCnt: 1, checkedCnt: 1});

        const totalVideoCnt = folder.videoCnt;
        const totalCheckedVideo = folder.checkedCnt;

        //console.log(totalVideoCnt);
        //console.log(totalCheckedVideo);

        await Folder.findByIdAndUpdate(Fid, {progressPercentage: totalVideoCnt > 0 ? ((totalCheckedVideo/totalVideoCnt)*100) : 0});


        //console.log(newVideo);
        res.json(newVideo);
    }
    catch (err) {
        //console.log(err);
        res.status(400).json({err});
    }
}

module.exports.updateVideosOrder = async(req, res) => {
    try {
        const newVideo = req.body.newVideo;
        //console.log(newVideo);
        
        newVideo.map(async (nv, index) => {
            const id = nv._id
            await Video.findByIdAndUpdate(id, {order: index});
        })
        
        res.json("suceessfully reordered");
    } catch (error) {
        //console.log(error);
        res.status(500).json(error);
    }
}

module.exports.statusUpdate = async(req,res) => {
    try {
        const {isChecked, id, Fid}= req.body;
        //console.log(!isChecked);
        //console.log(id);
        
        await Video.findByIdAndUpdate(id, {checked: !isChecked});

        if(!isChecked){
            await Folder.findByIdAndUpdate(Fid, {$inc: {checkedCnt: 1}});
        }
        else{
            await Folder.findByIdAndUpdate(Fid, {$inc: {checkedCnt: -1}});
        }
        
        // find total number of videos and checked videos
        const folder = await Folder.findById(Fid, {videoCnt: 1, checkedCnt: 1});
        const totalVideoCnt = folder.videoCnt;
        const totalCheckedVideo = folder.checkedCnt;

        //console.log(totalVideoCnt);
        //console.log(totalCheckedVideo);

        await Folder.findByIdAndUpdate(Fid, {progressPercentage: ((totalCheckedVideo/totalVideoCnt)*100)});

        res.status(200).json("success");
    } catch (error) {
        //console.log(error);
        res.status(500).json(error);
    }
}

module.exports.deleteVideo = async(req, res) => {
    try{
        const {vid, id} = req.params;
        //console.log(vid);

        // checked video is checked or not
        const video = await Video.findById(vid, {checked: 1});
        //console.log(video);
        const done = video.checked;

        // delete the video
        await Video.findByIdAndDelete(vid);
        await Note.deleteMany({videoId: new ObjectId(vid)});
        

        // check if video is checked and deleted then this process followed
        if(done){
            await Folder.findByIdAndUpdate(id, {$inc: {checkedCnt: -1}});
        }

        // update the video count when video get deleted 
        await Folder.findByIdAndUpdate(id, {$inc: {videoCnt: -1}});

        // update the progress% when video checkeed and got deleted
        const folder = await Folder.findById(id, {videoCnt: 1, checkedCnt: 1});
        const totalVideoCnt = folder.videoCnt;
        const totalCheckedVideo = folder.checkedCnt;

        //console.log(totalVideoCnt);
        //console.log(totalCheckedVideo);

        await Folder.findByIdAndUpdate(id, {progressPercentage: totalVideoCnt > 0 ? ((totalCheckedVideo/totalVideoCnt)*100) : 0});
        
        res.status(200).json({message: "Successfully Deleted"});
    }
    catch(error){
        console.error(error);
        res.status(500).json(error);
    }
}