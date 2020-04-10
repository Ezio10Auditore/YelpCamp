var exp=require("express");
var router=exp.Router();
var passport=require("passport");
var User=require("../models/user.js");

router.get("/",function(req,res){
    res.render("campgrounds/home");
});

router.get("/landing",function(req,res){
    res.render("landing");
}); 


router.get("/register",function(req,res){
    res.render("register");
});

router.post("/register",function(req,res){
    User.register(new User({
        username: req.body.username
    }),req.body.password,function(err,user){
        if(err)
            {
                req.flash("error",err.message);
                return res.redirect("register");
            }
        else
            passport.authenticate("local")(req,res,function(){
                req.flash("success","Welcome to YelpCamp "+req.body.username);
                res.redirect("/campgrounds");
            });
    });
});


router.get("/login",function(req,res){
    res.render("login");
});

router.post("/login",passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect:"/login"
}),function(req,res){
});

router.get("/logout",function(req,res){
    req.logOut();
    req.flash("success","Logged out");
    res.redirect("/campgrounds");
})

module.exports=router;