require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT||8080;
const path = require('path');
var User = require('./models/user');
var todoRoute = require('./routes/todo');
var authRoute = require('./routes/auth');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

var url=process.env.MONGODB_URI||"mongodb://localhost/todos"
mongoose.connect(url,{
        useNewUrlParser: true
    })
.then(() => console.log('MongoDB Connected...'))
.catch((err) => console.log(err))

const connection = mongoose.connection;

app.use(require("express-session")({
    secret:"dead",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(todoRoute);
app.use(authRoute);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}



app.listen(PORT, function() {
    console.log("Server is running....");
});
