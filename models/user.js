var mongoose=require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema= new mongoose.Schema({
   email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["farmer", "agrodealer", "cropbuyer"]
    },
     password: {
        type: String
    }
});
userSchema.plugin(passportLocalMongoose)
module.exports= mongoose.model("User",userSchema);