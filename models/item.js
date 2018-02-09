var mongoose=require("mongoose");

var itemSchema= new mongoose.Schema({
    name   : String,
    image  : String,
    type: String,
    author : String,
    phone:  String,
    cost :Number,
    content: String,
     username: {
      id:{ 
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"
      },
      username: String
   }
});



module.exports= mongoose.model("Item",itemSchema);