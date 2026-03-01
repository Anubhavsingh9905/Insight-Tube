const Folder = require('../models/folder');
const Video = require('../models/video');
const Note = require('../models/note');

module.exports.getFolders = async (req, res) => {
    try{
        const userId = req.user._id;
        //console.log(userId);
        const folders = await Folder.find({author: userId}).sort({order: 1});
        res.json(folders);
    }
    catch(error){
        //console.log(error);
        res.status(500).json(error);
    }
}

module.exports.saveFolder =  async (req, res) => {
    try {
        const name = req.body.name;
        //console.log(name);

        const count = await Folder.countDocuments();
        const userId = req.user._id;

        const folder = new Folder({ name: name , order: count, author: userId});
        await folder.save();

        res.json(folder);
    }
    catch (err) {
        console.error(err);
        res.json(err);
    }
} 

module.exports.updateFolderOrder = async(req, res) => {
    try {
        const newFolder = req.body.newFolder;
        //console.log(newFolder);
        
        newFolder.map(async (nf, index) => {
            const id = nf._id
            await Folder.findByIdAndUpdate(id, {order: index});
        })
        
        res.json("suceessfully reordered");
    } catch (error) {
        //console.log(error);
        res.status(500).json(error)
    }
}

module.exports.deleteFolder = async (req, res) => {
    try {
        const Id = req.body.Id;
        //console.log(Id);
        await Folder.findByIdAndDelete(Id);
        await Video.deleteMany({folderId: new ObjectId(Id)});
        await Note.deleteMany({folderId: new ObjectId(Id)});
        res.json("Deleted");
    } catch (err) {
        //console.log(err);
        res.json(err);
    }
}