// const passport = require("passport");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        //console.log("You are not logged in");
        return res.status(400).json({message: "You are not logged-in"});
    }
    next();
} 

module.exports.isNotLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        //console.log("You are already logged/registered in");
        return res.status(400).json({message: "You are already logged-in/registered "});
    }
    next();
} 