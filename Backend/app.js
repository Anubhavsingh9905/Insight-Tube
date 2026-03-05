const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const cors = require('cors');
const dotenv = require('dotenv');
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

dotenv.config();

app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
app.use(express.json());

main().then(() => {
    console.log("DB connected");
}).catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}

const store = MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    crypto: {
        secret: process.env.SESSION_SECERET,
    },
    touchAfter: 24 * 3600,
});

const seesionOption = {
    store,
    secret: process.env.SESSION_SECERET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,         
        sameSite: "none"
    }
};

app.set("trust proxy", 1);
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

const port = process.env.PORT||8080;
app.listen(port, () => {
    console.log(`app is listening at port : ${port} `);
});
