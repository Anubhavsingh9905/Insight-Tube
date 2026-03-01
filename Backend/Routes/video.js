const Router = require("router");
const{isLoggedIn, isNotLoggedIn} = require('../middlewares');
const video = require('../Controller/video')

const router = Router();

router.get("/:id", isLoggedIn, video.getVideos)

router.get("/videoPlayer/:id", isLoggedIn, video.getVideo)

router.post("/", video.saveVideo);

router.put("/reorder", video.updateVideosOrder); 

router.put("/done", isLoggedIn, video.statusUpdate)

router.delete("/:vid/:id", isLoggedIn, video.deleteVideo);


module.exports = router;