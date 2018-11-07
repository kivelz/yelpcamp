var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//Auth route
router.get("/register", function(req, res){
    res.render("register");
});
//handle signup logic
router.post("/register", function(req, res){
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
       if(err) {
           req.flash("error", err.message);
           return res.render("register");
       } 
       passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to Yelpcamp" + user.username);
           res.redirect("/campgrounds");
       });
   });
});

//show login form
router.get("/login", function(req, res){
    req.flash("error", "Please Login First!")
   res.render("login");
});
//handling login logic

router.post("/login", passport.authenticate("local", 
   {
       successRedirect: "/campgrounds", 
       failureRedirect: "/login"
   }), function(req, res){
   res.send("Login logic is here")
});

router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "You have successfully logged out");
   res.redirect("/campgrounds");
});


module.exports = router;