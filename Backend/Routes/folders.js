const Router = require("router");

const mongoose = require('mongoose');
const{isLoggedIn, isNotLoggedIn} = require('../middlewares');
const ObjectId = mongoose.Types.ObjectId;
const folder = require('../Controller/folder');

const router = Router();

router.get('/', isLoggedIn, folder.getFolders);

router.post('/', isLoggedIn, folder.saveFolder);

router.put("/reorder", folder.updateFolderOrder);

router.delete('/', folder.deleteFolder);

module.exports = router;