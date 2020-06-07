var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');


router.get('/todos/register',function(req,res){
    User.find(function(err,users){
        if(err){
            console.log(err);
        }else{
            res.json(users);
        }
    })
})

router.post('/todos/register',function(req,res){
    console.log("i am")
    var newUser = new User({username:req.body.username,email:req.body.email})
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect('/');
        });
    });
});

router.post('/todos/login', passport.authenticate("local",{
    successRedirect:'http://localhost:4000/',
    failureRedirect:'/login'
}), function(req,res){
    console.log("i am in login");
});
module.exports = router;