var mongoose=require("mongoose");

var passportLocalMongoose = require("passport-local-mongoose");

 var reportSchema= new mongoose.Schema({
   malpractice: {
        type: String
        
    },
    locality: {
        type: String

    },
    postal_code: {
      type: Number
    },
    name: {
      type: String
    },
    culprit: {
      type: String
    },

    state: {
      type: String
    },
    country: {
      type: String
    },
    autoLoc: {
      type: String
    },
    street_number: {
      type: String
    },
    route:{
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