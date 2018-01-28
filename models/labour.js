var mongoose=require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
 var labourSchema= new mongoose.Schema({
   email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
   
     longitude: {
        type: String
    },
    number: {
        type: Number
    }
});
 

labourSchema.plugin(passportLocalMongoose)
module.exports= mongoose.model("Labour",labourSchema);