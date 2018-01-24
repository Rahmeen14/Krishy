var express=require("express");
var app=express();
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

app.get("/",function(req,res){
    res.send("hello");
});
app.listen(3000, 'localhost',function(){
  console.log("server on duty, mallady");
});