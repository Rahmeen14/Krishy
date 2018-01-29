var mongoose=require("mongoose");

var passportLocalMongoose = require("passport-local-mongoose");

 var labourSchema= new mongoose.Schema({
   email: {
        type: String,
        
    },
    latitude: {
        type: String,

    },
   
     longitude: {
        type: String
    },
    number: {
        type: Number
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
var Labour = mongoose.model("Labour", labourSchema);
module.exports=Labour;


