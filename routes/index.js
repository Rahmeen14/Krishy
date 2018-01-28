var express = require("express");
var router  = express.Router();
var User=require("../models/user.js");
var Labour= require("../models/labour.js");
var passport=require("passport");
const {requireRole} = require("../server/utils/role");
//-------------
//AUTH ROUTES
//-----------
//  REGISTER
router.get("/register",function(req,res){
    res.render("register.ejs");
});
router.get("/labor", function(req, res){
    res.sendFile("../public/laborers.html");
});
router.post("/labor", function(req,res){
    console.log(req.body);
    var newUser = new User({email: req.body.email, latitude: req.body.latitude, longitude: req.body.longitude, number: req.body.number});
});
router.post("/register", function(req, res){
    console.log(req.body.role);
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
                role="crop-buyer";
            }
    var newUser = new User({email: req.body.email,username: req.body.username,role:role});
    console.log(newUser.role);
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            //req.flash("error",err.message);
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            //req.flash("success","Welcome to YelpCamp "+ req.body.username);
            if(req.body.role.farmer!=undefined)
            {
                res.render("farmerProf.ejs");
            }
            else if(req.body.role.agrodealer!=undefined)
            {
                res.render("agroProf.ejs");
            }
            else if(req.body.role.crop-buyer!=undefined)
            {
                res.render("buyerProf.ejs");
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
       console.log(req);
      res.render("farmerProf", {farmer: req.user});

});
router.get("/agrodealer",function(req,res){
     console.log(req.user);
    res.render("agroProf", {agrodealer: req.user});
});
router.get("/buyer", function(req, res){
    res.render("buyerProf", {buyer: req.user});
});
router.post("/login", passport.authenticate("local", 
    {
        failureRedirect: "/login"
    }), function(req, res){
            console.log("success");
             if (req.user){
                if(req.user.role == "farmer")
                 res.redirect('/farmer');
                else if(req.user.role == "agrodealer")
                res.redirect("/agrodealer");
                else if(req.user.role == "crop-buyer")
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










