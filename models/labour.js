var mongoose=require("mongoose");

 var labourSchema= new mongoose.Schema({
   email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    latitude: {
        type: String,

    },
   
     longitude: {
        type: String
    },
    number: {
        type: Number
    }
});
 
/*var Labour = mongoose.model("Campground", campgroundSchema);
module.exports= Campground;*/
var Labour = mongoose.model("Labour", labourSchema);
module.exports=Labour;

module.exports= mongoose.model("Labour",labourSchema);

