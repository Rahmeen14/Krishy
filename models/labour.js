var mongoose=require("mongoose");
<<<<<<< HEAD

=======
var passportLocalMongoose = require("passport-local-mongoose");
>>>>>>> master
 var labourSchema= new mongoose.Schema({
   email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    latitude: {
        type: String,
<<<<<<< HEAD
        
=======
        required: true
>>>>>>> master
    },
   
     longitude: {
        type: String
    },
    number: {
        type: Number
    }
});
 
<<<<<<< HEAD
/*var Labour = mongoose.model("Campground", campgroundSchema);
module.exports= Campground;*/
var Labour = mongoose.model("Labour", labourSchema);
module.exports=Labour;
=======

labourSchema.plugin(passportLocalMongoose)
module.exports= mongoose.model("Labour",labourSchema);
>>>>>>> master
