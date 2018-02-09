var mongoose=require("mongoose");

var passportLocalMongoose = require("passport-local-mongoose");

 var reportSchema= new mongoose.Schema({
   malpractice: {
        type: String
        
    },
    location: {
        type: String

    },
    pin: {
      type: Number
    },
    name: {
      type: String
    },
    culprit: {
      type: String
    },
    username: {
      id:{ 
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"
      },
      username: String
   }
});
 

/*var Labour = mongoose.model("Campground", campgroundSchema);
module.exports= Campground;*/
//labourSchema.plugin(passportLocalMongoose)
var Report = mongoose.model("Report", reportSchema);
module.exports=Report;