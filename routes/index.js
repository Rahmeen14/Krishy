var express = require("express");
var router  = express.Router();
var User=require("../models/user.js");
var Labour= require("../models/labour.js");
var Farmer= require("../models/farmer.js");
var Agrodealer= require("../models/agrodealer.js");
var Cropbuyer= require("../models/cropbuyer.js");
var passport=require("passport");
const {requireRole} = require("../server/utils/role");
const fs = require('fs');

//AUTH ROUTES
//-----------
//  REGISTER
router.get("/register",function(req,res){
    res.render("register.ejs");
});
router.get("/labor", function(req, res){
    Labour.find({}, function(err, alllabour){
        if(!err)
        {
           var data = JSON.stringify(alllabour);
            fs.writeFileSync('labour.json', data); 
            //res.render("laborers", {labReq: alllabour});

        }
        console.log(__dirname);
       res.sendFile("C:/users/hp/webdev/hackathons/hackeamnsit/public/laborers.html");
   
}); });
router.post("/labor", function(req,res)
{
    var username={
        id:req.user._id,
        username:req.user.username
    };
 var lab = new Labour({
    email: req.body.email,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    number: req.body.number,
    username:username
 });
 lab.save(function(err){
    if(!err){
        console.log("Saved");
        res.redirect("/labor");
    }
    else
        console.log(err);

 });
    
});
router.post("/register", function(req, res){
    //console.log(req.body.role);
    //var role =String(req.body.role);

   
    var role;
     if(req.body.role.farmer!=undefined)
            {
                role="farmer";
               
            }
            else if(req.body.role.agrodealer!=undefined)
            {
                role="agrodealer";
            }
            else 
            {
                role="cropbuyer";
            }
            var newUser = new User({email: req.body.email,username: req.body.username,role:role,phone:req.body.phone});
    
   // console.log(newUser.role);
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            //req.flash("error",err.message);
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            //req.flash("success","Welcome to YelpCamp "+ req.body.username);
            console.log("user is");
            console.log(user);
              var username={
            id:user._id,
            username:user.username
            };
            if(req.body.role.farmer!=undefined)
            {
                 var farmer = new Farmer({email: user.email,phone:user.phone,username:username});
                farmer.save(function(err){
            if(!err){
                console.log("Saved");
            res.redirect("/login");
            }
            else
            {
                console.log(err);
            }
            
             }); //  res.redirect("/login");
            }
            else if(req.body.role.agrodealer!=undefined)
            {
                 var agrodealer = new Agrodealer({email: user.email,phone:user.phone,username:username});
                agrodealer.save(function(err){
            if(!err){
                console.log("Saved");
            res.redirect("/login");
            }
            else
            {
                console.log(err);
            }
            
             });
            }
            else if(req.body.role.cropbuyer!=undefined)
            {
                var cropbuyer = new Cropbuyer({email: user.email,phone:user.phone,username:username});
                cropbuyer.save(function(err){
            if(!err){
                console.log("Saved");
            res.redirect("/login");
            }
            else
            {
                console.log(err);
            }
            
             });
            }
          // res.redirect("/login"); 
        });
    });
});

//LOGIN 
router.get("/login",function(req,res){
    res.render("login");
});
router.get("/farmer",function(req,res){
       console.log(req.user);
       Farmer.find({"email":req.user.email},function(err,allfarmers)
   {
       if(err)
       {
           console.log(err);
       }
       else
       {
            console.log("here");
            console.log(allfarmers);
            res.render("farmerProf", {farmer: allfarmers[0]});
       }
   });
      

});
router.get("/agrodealer",function(req,res){
     //console.log(req.user);
      console.log(req.user);
       Agrodealer.find({"email":req.user.email},function(err,agro)
   {
       if(err)
       {
           console.log(err);
       }
       else
       {
            console.log("here");
            console.log(agro);
            res.render("agroProf", {agrodealer: agro[0]});
       }
   });
   // res.render("agroProf", {agrodealer: req.user});
});
router.get("/buyer", function(req, res){
     Cropbuyer.find({"email":req.user.email},function(err,buyer)
   {
       if(err)
       {
           console.log(err);
       }
       else
       {
            console.log("here");
            console.log(buyer);
            res.render("buyerProf", {buyer: buyer[0]});
       }
   });
    //res.render("buyerProf", {buyer: req.user});
});
router.post("/login", passport.authenticate("local", 
    {
        failureRedirect: "/login"
    }), function(req, res){
            console.log("success");
             // console.log(req.user);
             if (req.user){
                if(req.user.role == "farmer")
                 res.redirect('/farmer');
                else if(req.user.role == "agrodealer")
                res.redirect("/agrodealer");
                else if(req.user.role == "cropbuyer")
                    res.redirect("/buyer");
            }
        
});
// router.post("/login",requireRole("agrodealer"), passport.authenticate("local", 
//     {
//         failureRedirect: "/login"
//     }),function(req, res){
//             console.log(res.user);
//             res.redirect('/');
        

// });
// router.post('/login', passport.authenticate("local", function(err, user ,res){
//     var error = err;
//     if (error) return res.status(401).json(error);
//     if (!user) return res.status(404).json({message: 'Something went wrong, please try again.'});

//     else {
//         if(requireRole("farmer")){
//             res.redirect('/farmer');
//         }
//         else if(requireRole("agrodealer")){
//             res.redirect('/farmer');
//         }
//         else{
//             res.redirect('/crop-buyer');
//         }
//     }
// }));
//LOGOUT
router.get("/logout",function(req,res){
   req.logout(); 
  // req.flash("success","Logged You Out!!");
   res.redirect("/");
});

module.exports = router;
