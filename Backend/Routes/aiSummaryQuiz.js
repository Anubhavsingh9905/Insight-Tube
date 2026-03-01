const Router = require('router');
const{isLoggedIn} = require('../middlewares');
const aiSummaryQuiz = require('../Controller/aiSummaryQuiz');

const router = Router();


router.post("/transcript", isLoggedIn, aiSummaryQuiz.generateSummary);

router.post("/Quiz", isLoggedIn, aiSummaryQuiz.generateQuiz);

module.exports = router