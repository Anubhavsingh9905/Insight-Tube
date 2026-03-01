const User = require('../models/user');

module.exports.Register = async(req, res) => {
    try{
        let {username, emailId, password, phoneNumber} = req.body;
        let newUser = new User({emailId, username, phoneNumber});
        const registeredUser = await User.register(newUser, password);
        //console.log(registeredUser);
        
        registeredUser.save();
        req.logIn(registeredUser, (err) => {
            if(err){
                return next(err);
            }

            res.status(200).json({message: "registered in successfully"});
        });
        //console.log(`${username}, ${emailId}, ${phoneNumber} ${password}`);
        // res.status(200).json({message: "registered in successfully"});
    }
    catch(err){
        //console.log(err);
        res.status(500).json({message: "Some thing went wrong"});
    }
}

module.exports.Login = async(req,res) => {
    try{
        let {username} = req.body;
        //console.log("user", username);
        //console.log("Login request body:", req.body);
        //console.log("Session before login:", req.session);
        //console.log("Is authenticated:", req.isAuthenticated());

        //console.log("logged in");
        res.status(200).json({message: "logged in successfully"});
    }
    catch(error){
        res.status(500).json({message: "Username or Password is wrong"});
    }
}

module.exports.LogOut = (req, res) => {

    req.logOut((error) => {
        if(error){
            //console.log(error);
            next(error);
        }

        res.status(200).json({message: "Loged Out"});
    });
}

module.exports.CheckAuth = (req, res) => {
    //console.log("Check-auth cookies:", req.headers.cookie);
    //console.log("Is authenticated:", req.isAuthenticated());

    if (req.isAuthenticated && req.isAuthenticated()) {
        return res.json({ isAuthenticated: true, user: req.user });
    }
    res.json({ isAuthenticated: false, user: null });
}