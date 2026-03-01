const Router = require("router");
const{isLoggedIn, isNotLoggedIn} = require('../middlewares');
const notes = require("../Controller/notes");

const router = Router();

router.get("/:id", isLoggedIn, notes.getNotes)

router.post("/", isLoggedIn, notes.addNotes);

router.delete("/:nId", notes.deleteNotes)

module.exports = router