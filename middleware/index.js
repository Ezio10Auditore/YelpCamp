var middlewareObj={};
var CampGround = require("../models/campground");
var Comment = require("../models/comment"); 

middlewareObj.checkCampgroundOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        CampGround.findById(req.params.id,function(err,foundCampground){
            if(err){
                req.flash("error","Campground not found");
                res.redirect("back");
            }
            else
                {
                    if(foundCampground.author.id.equals(req.user._id)){
                        next();
                    }
                    else
                        {
                            req.flash("error","You can't do that");
                            res.redirect("back");
                        }
                }
        });  
    }
    else{
        req.flash("error","Access denied");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                req.flash("error","Comment not found");
                res.redirect("back");
            }
            else
                {
                    if(foundComment.author.id.equals(req.user._id)){
                        next();
                    }
                    else
                        {
                            req.flash("error","You can't do that");
                            res.redirect("back");
                        }
                }
        });
    }
    else{
        req.flash("error","Access denied");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else
        {
            req.flash("error","Please login first");
            res.redirect("/login");
        }
}

module.exports=middlewareObj;
