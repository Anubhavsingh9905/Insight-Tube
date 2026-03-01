const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const {MongoStore }= require('connect-mongo');
const cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local').Strategy;
const folderRouter = require('./Routes/folders');
const videoRouter = require("./Routes/video");
const userRouter = require("./Routes/user");
const notesRouter = require("./Routes/notes");
const aiSummaryQuizRouter = require("./Routes/aiSummaryQuiz");

const app = express();


app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());

main().then(() => {
    //console.log("DB connected");
    //console.log(MongoStore);
}).catch((err) => {
    //console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/youtubeLearning');
}

const store = MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/youtubeLearning',
    crypto: {
        secret: "processenvSCERET",
    },
    touchAfter: 24 * 3600,
});

const seesionOption = {
    store,
    secret: 'Youtube-Learning-Organiser',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000,
    }
};

app.use(cookieParser());
app.use(session(seesionOption));
app.use(passport.initialize());
app.use(passport.session());



passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById(id).exec();
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

app.get("/", (req, res) => {
    res.send("hello");
})

// folders
app.use("/folder", folderRouter);

//videos
app.use("/video", videoRouter);

//user
app.use("/user", userRouter);

// Notes
app.use("/notes", notesRouter);

//AI...............Summary & Quiz

app.use("/ai", aiSummaryQuizRouter)

const port = 8080;
app.listen(port, () => {
    //console.log(`app is listening at port : ${port} `);
});