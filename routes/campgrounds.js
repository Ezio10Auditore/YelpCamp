var exp=require("express");
var router=exp.Router({mergeParams: true});

var CampGround = require("../models/campground");
var Comment = require("../models/comment");

var middleware=require("../middleware");

router.get("/",function(req,res){
    CampGround.find({},function(err,CampG){
        if(err)
            {
                console.log("Ah shit here we go again");
                console.log(err);
            }
        else
            {
                res.render("campgrounds/campgrounds",{cg:CampG});
            }
    });
});

router.post("/",middleware.isLoggedIn,function(req,res){
    var Name=req.body.newCamp;
    var Image=req.body.newCampIMG;
    var Des=req.body.newCampDES;
    var prc=req.body.newCampPRC;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var obj={name: Name,price: prc,image: Image,description: Des,author:author};
    
    CampGround.create(obj,function(err,CampG){
        if(err)
            {
                console.log("Ah shit here we go again");
                console.log(err);
            }
        else
            {
                req.flash("success","Created your campground!");
                res.redirect("/campgrounds");
                console.log("Campground added");
                console.log(CampG);
            }
    });
});

router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});

router.get("/:id",function(req,res){
    CampGround.findById(req.params.id).populate("comments").exec(function(err,Cground){
        if(err)
            {
                console.log("Ah shit here we go again");
                console.log(err);
            }
        else
            {
                res.render("campgrounds/show",{campG:Cground});
            }
    })
});

router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
            CampGround.findById(req.params.id,function(err,foundCampground){
                if(err)
                    res.redirect("campgrounds");
                else
                    res.render("campgrounds/edit",{campG:foundCampground});
            });
});

router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    CampGround.findByIdAndUpdate(req.params.id,req.body.CG,function(err,newCG){
        if(err)
            res.redirect("/campgrounds");
        else{
            req.flash("success","Edited your campground!");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    CampGround.findByIdAndRemove(req.params.id,function(err){
        if(err)
            res.redirect("/campgrounds");
        else{
            req.flash("success","Deleted your campground!");
            res.redirect("/campgrounds");
        }
    });
});

module.exports=router;