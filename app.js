var exp=require("express");
var app=exp();
var flash=require("connect-flash");
app.use(flash());
var methodOverride=require("method-override");
app.use(methodOverride("_method"));
app.set("view engine","ejs");
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
var request=require("request");
var mongoose=require("mongoose");
var passport=require("passport");
var LocalStrategy=require("passport-local");
app.use(exp.static(__dirname+"/public"));
// mongoose.connect('mongodb://localhost:27017/YelpCamp',{ useNewUrlParser :true, useUnifiedTopology: true });

mongoose.connect('mongodb+srv://Jarvis:eminem313@cluster0-b9lnh.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log("CONNECTED!!!");
}).catch(err=>{
    console.log("Error : ",err.message);
});

var CampGround=require("./models/campground.js");
var Comment=require("./models/comment.js");
var User=require("./models/user.js");
var seeds=require("./seeds.js");


var commentRoutes=require("./routes/comments.js");
var campgroundRoutes=require("./routes/campgrounds.js");
var authRoutes=require("./routes/index.js"); 


// AUTHENTICATION=============================

app.use(require("express-session")({
    secret:"21 din mein paisa double",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});

// ROUTES================================================

seeds();
app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


// Listening===============================================

app.listen(process.env.PORT||3000,function(){
    console.log("Listening one server 3000");
});