var mongooose=require("mongoose");
var CampGround=require("./models/campground.js");
var Comment=require("./models/comment.js");

var data=[
    {
        name:"Spiti Valley, Himachal Pradesh",
        price:"2000/- night",
        image:"https://toib.b-cdn.net/wp-content/uploads/2017/08/spiti-valley-himachal-pradesh.jpg",
        description:"First on our list is, Spiti Valley nestled in the Keylong district of Himachal Pradesh. It is one of the best camping sites in India. Adventure enthusiasts and trekkers from all over the world come here to explore this untouched region in the Himalayas. There are barren hills, beautiful lakes, monasteries, lush valleys and stark beauty of nature. May to July are the perfect months for the adventure.",
        author:{
            id : "588c2e092403d111454fff75",
            username: "Jane"
        }
    },
    {
        name:"Chandratal Lake, Himachal Pradesh",
        price:"2000/- night",
        image:"https://toib.b-cdn.net/wp-content/uploads/2017/08/chandratal-lake-himachal-pradesh.jpg",
        description:"The high-altitude Chandratal Lake is one of the best places to visit in Himachal Pradesh for natural bliss. Situated about 4,300 meters above sea level, you can get to the lake shores after a trek. Popularly known as ‘Lake of Moon’ it’s a beauty which enchants you. Camping here provides a thrilling experience of natural bliss. The view of the lake reflecting the moonlight is definitely ethereal.",
        author:{
            id : "588c2e092403d111454fff78",
            username: "John"
        }
    },
    {
        name:"Solang Valley, Manali",
        price:"2000/- night",
        image:"https://toib.b-cdn.net/wp-content/uploads/2017/08/solang-valley-manali.jpg",
        description:"One of the best camping sites in India, Solang Valley in Manali attracts visitors from the far ends of the world. The verdant spread of lush greenery, the gurgling of a stream nearby and the host of thrilling adventures, makes camping all the more fun. Enjoy the bliss of the mountains or try skiing, trekking, rock climbing, rappelling, river crossing, paragliding, ATV Ride, zorbing, bonfire, and much more.",
        author:{
            id : "588c2e092403d111454fff79",
            username: "Jack"
        }
    },
    {
        name:"Tso Moriri, Ladakh",
        price:"2000/- night",
        image:"https://toib.b-cdn.net/wp-content/uploads/2017/08/tso-Moriri-Ladakh.jpg",
        description:"One of the highest lakes in the world, Tso Moriri in Ladakh is one of the great camping sites in India. The best time to camp here is during May to September as the lake remains frozen the rest of the year. Enjoy the comforts of the tents, watch the sunrise or go trekking, this will be an experience of a lifetime, the fondest memory of traveling in India.",
        author:{
            id : "588c2e092403d111454fff74",
            username: "Jill"
        }
    }
];

function SeedDB(){
    Comment.remove({},function(err){
        if(err)
            console.log(err);
        else
            console.log("Comments removed");
    });
    CampGround.remove({},function(err){
        if(err)
            console.log(err);
        else
            console.log("Campgrounds removed");
            data.forEach(function(seeds){
                CampGround.create(seeds,function(err,campground){
                    if(err)
                        console.log(err);
                    else
                        {
                            console.log("A new campground is added");
                            Comment.create({
                                text:"It's a good place but too colorful",
                                author:{
                                    id : "588c2e092403d111454fff76",
                                    username: "Batman"}
                            },function(err,comment){
                                if(err)
                                    console.log(err);
                                else
                                    {
                                        campground.comments.push(comment);
                                        campground.save(function(err){
                                            if(err)
                                                console.log(err);
                                            else
                                                console.log("Comment added");
                                        });
                                    }
                            });
                       }
                  });
             });
    });
};

module.exports=SeedDB;

