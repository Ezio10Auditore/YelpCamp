var exp=require("express");
var router=exp.Router({mergeParams: true});

var middleware=require("../middleware");

var CampGround = require("../models/campground");
var Comment = require("../models/comment"); 

router.get("/new",middleware.isLoggedIn,function(req,res){

    CampGround.findById(req.params.id,function(err,campC){
        if(err)
            console.log(err);
        else
            {
                res.render("comments/new",{campC:campC});
            }
    });
});
router.post("/",middleware.isLoggedIn,function(req,res){
    CampGround.findById(req.params.id,function(err,campC){
        if(err)
            {
                console.log(err);
                res.redirect("/campgrounds");
            }
        else
            {
                Comment.create(req.body.comment,function(err,comm){
                    if(err)
                        console.log(err);
                    else{
                        comm.author.id=req.user._id;
                        comm.author.username=req.user.username;
                        comm.save();
                        campC.comments.push(comm);
                        campC.save();
                        console.log(comm);
                        req.flash("success","Added your comment!"); 
                        res.redirect("/campgrounds/"+req.params.id);
                    }
                })
            }
    })
});

router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,comm){
        if(err)
            res.redirect("/campgrounds");
        else
            {
                res.render("comments/edit",{campC_id:req.params.id,comm:comm});
            }
    });
});  

router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,newCom){
        if(err)
            res.redirect("back");
        else{
            req.flash("success","Edited your comment!");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndDelete(req.params.comment_id,function(err){
        if(err)
            res.redirect("/campgrounds/"+req.params.id);
        else{
            req.flash("success","Deleted your comment!");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

module.exports=router;