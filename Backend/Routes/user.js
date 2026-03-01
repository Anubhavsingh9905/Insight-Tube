const Router = require("router");

const{isLoggedIn, isNotLoggedIn} = require('../middlewares');
const passport = require('passport');
const user = require('../Controller/user');


const router = Router();

//register
router.post("/register", isNotLoggedIn, user.Register);

//login
router.post("/login", isNotLoggedIn, passport.authenticate('local'), user.Login);

//logout
router.get('/logout', isLoggedIn, user.LogOut);

//check auth
router.get("/check-auth", user.CheckAuth)

module.exports = router;