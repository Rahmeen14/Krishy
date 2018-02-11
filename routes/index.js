var express = require("express");
var moment = require("moment");
var router  = express.Router();
var User=require("../models/user.js");
var Labour= require("../models/labour.js");
var Farmer= require("../models/farmer.js");
var Agrodealer= require("../models/agrodealer.js");
var Cropbuyer= require("../models/cropbuyer.js");
var Item= require("../models/item.js");
var passport=require("passport");
var Report= require("../models/report.js");
const {requireRole} = require("../server/utils/role");
const fs = require('fs');
var PythonShell = require('python-shell'),
sys = require('sys');
var spawn = require("child_process").spawn;


//AUTH ROUTES

//  REGISTER
router.get("/cropsuitability", function(req, res){
     // res.sendFile("C:/Users/hp/Desktop/HackeamNsit/public/cropsuitability.html");
     res.render("cropsuitability",{data:null});
 });
router.post("/cropsuitability", function(req, res){
   console.log(req.body);
   var crop=req.body.crop;
   var lat=(Number)(req.body.latitude);
   var long =(Number)(req.body.longitude);
   console.log(typeof(lat));
   month=moment().format('MMMM');
   var options = {
  mode: 'text',
 // pythonPath: "C:/Users/hp/Anaconda3-2/python.exe",
  pythonPath:"C:/Users/hp/Anaconda3/python.exe",
  pythonOptions: ['-u'],
  scriptPath: './',
  args: ["./data/LatLong.csv","./data/ClimateData.csv",lat,long,month,crop]
};
var shell = new PythonShell('KNN.py', options);
shell.on('message', function (message) {
  console.log(message);
  var mes;
  if(message==0)
    mes="The conditions are not suitable for growing "+crop;
  else
    mes="Congratulations, The conditions are suitable for growing "+crop;
  res.render("cropsuitability",{data:message,mes:mes});
  //var place=message;
  // var len = message.length;
  // message = message.slice(2, len-1);
  //  console.log("message is"+message);
  // message = parseFloat(message);
  // console.log(message);
//   month=moment().format('MMMM');
//   console.log(typeof(month));
//   console.log(typeof(message));
//   console.log(month);

//   var options = {
//   mode: 'text',
//  // pythonPath: "C:/Users/hp/Anaconda3-2/python.exe",
//   pythonPath:"C:/Users/hp/Anaconda3/python.exe",
//   pythonOptions: ['-u'],
//   scriptPath: './',
//   args: ["./data/ClimateData.csv",place,month]
// };
// var shell = new PythonShell('lookup.py', options);
// shell.on('message', function (k) {
//   console.log("final");
//   console.log(k);
 
//   });
  });

 });
router.get("/report/:id", function(req, res){
   res.render("report.ejs", {id:req.params.id});
 });
router.post("/report/:id", function(req, res){
  User.findById(req.params.id,function(err,found)
   {
       if(err)
       {
           console.log(err);
       }
       else
       { console.log(req.body);
    var role = found.role;
            console.log(req.body.user);
            console.log(found);
            var username={
            id:req.params.id,
            username:found.username
          };
           var report = new Report({
           name: req.body.user.name,
           culprit: req.body.user.culpritName,
           malpractice: req.body.user.malpractice,
           street_number: req.body.street_number,
           autoLoc: req.body.autoLoc,
           route: req.body.route,
           locality: req.body.locality,
           country: req.body.country,
           state: req.body.state,
           postal_code: req.body.postal_code,          
           username: username
          });

      report.save(function(err){
        if(!err){
          console.log("Saved");
          res.redirect("/"+role+"/"+req.params.id);
      }

      });
    }
});
});
router.get("/register",function(req,res){
    res.render("register.ejs");
});
router.get("/labor", function(req, res){
    Labour.find({}, function(err, alllabour){
        if(!err)
        {
           var data = JSON.stringify(alllabour);
            fs.writeFileSync('C:/Users/hp/Desktop/HackeamNsit/public/labour.json', data); 
            //res.render("laborers", {labReq: alllabour});

        }
        res.sendFile("C:/Users/hp/Desktop/HackeamNsit/public/laborers.html");
   
}); });
router.post("/labor", function(req,res)
{

  console.log(req);
   User.find({"email":req.body.email},function(err,allusers)
   {
       if(err)
       {
           console.log(err);
       }
       else
       {
            console.log("here");
             var username={
            id:allusers[0]._id,
            username:allusers[0].username
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

      });
            
    }
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
router.get("/farmer/:id",function(req,res){
       console.log(req.user);
       Farmer.find({"username.id":req.params.id},function(err,allfarmers)
   {
       if(err)
       {
           console.log(err);
       }
       else
       {
            console.log("here");
            console.log(allfarmers);
              Item.find({"username.id":req.params.id}, function(err, items){
        if(err)
        {
            console.log(err);
        }
        else
        // res.render("items", {items: items});
       //res.render("agroProf", {agrodealer: agro[0],items:items});
        res.render("farmerProf", {farmer: allfarmers[0], id: req.params.id,items:items});
        });
           
       }
   });
      

});
router.get("/agrodealer/:id",function(req,res){

     //console.log(req.user);
      console.log(req.user);
    Agrodealer.find({"username.id":req.params.id},function(err,agro)
   {
       if(err)
       {
           console.log(err);
       }
       else
       {
            console.log("here");
            console.log(agro);
             Item.find({"username.id":req.params.id}, function(err, items){
        if(err)
        {
            console.log(err);
        }
        else
        // res.render("items", {items: items});
       res.render("agroProf", {agrodealer: agro[0],items:items});
        });
            
       }
   });
   // res.render("agroProf", {agrodealer: req.user});
}); 
router.get("/buyer/:id", function(req, res){
     Cropbuyer.find({"username.id":req.params.id},function(err,buyer)
   {
       if(err)
       {
           console.log(err);
       }
       else
       {
            console.log("here");
            console.log(buyer);
        Item.find({"type":"Crops"},function(err,items)
      {
         if(err)
        {
           console.log(err);
        }
        else
        {
            items.sort({"cost":1});
            console.log("here");
          //  console.log(buyer);
          //  res.render("itemdisplay", {items: items});
            res.render("buyerProf", {buyer: buyer[0],items:items});
       }
   });
            
       }
   });
    //res.render("buyerProf", {buyer: req.user});
});
router.post("/login", passport.authenticate("local", 
    {
        failureRedirect: "/login"
    }), function(req, res){
            console.log("success");
              console.log(req.user);
             if (req.user){
                if(req.user.role == "farmer")
                 res.redirect('/farmer/'+req.user._id);
                else if(req.user.role == "agrodealer")
                res.redirect("/agrodealer/"+req.user._id);
                else if(req.user.role == "cropbuyer")
                    res.redirect("/buyer/"+req.user._id);
            }
        
});

router.put("/:sid/items/:id", function(req, res){
    Item.findByIdAndUpdate(req.params.id, req.body.item, function(err, founditem){
        if(err)
        console.log("Error has occured");
        else
        res.redirect("/items/"+req.params.id);
    });
});    
    
router.get("/:sid/items/:id/edit", function(req, res){
    Item.findById(req.params.id, function(err, founditem){
        if(err)
        {
            console.log("Error has been made");
        }
        else
        {
             res.render("edit", {item: founditem,id:req.params.sid});
        }
    });
});


router.get("/:sid/items/new", function(req, res){
    res.render("new",{id:req.params.sid});
    
});

router.get("/:sid/buy", function(req, res){
    
  res.render("buy",{id:req.params.sid});
});

router.get("/:sid/fertilisers", function(req, res){
    
      Item.find({"type":"Fertilisers"},function(err,items)
   {
       if(err)
       {
           console.log(err);
       }
       else
       {
            items.sort({"cost":1});
            console.log("here");
          //  console.log(buyer);
            res.render("itemdisplay", {items: items});
       }
   });
  //res.render("buy",{id:req.params.sid});
});

router.get("/:sid/machines", function(req, res){
    Item.find({"type":"Machines"},function(err,items)
   {
       if(err)
       {
           console.log(err);
       }
       else
       {
            items.sort({"cost":1});
            console.log("here");
          //  console.log(buyer);
            res.render("itemdisplay", {items: items});
       }
   });
  //res.render("buy",{id:req.params.sid});
});
router.get("/:sid/crops", function(req, res){
    Item.find({"type":"Crops"},function(err,items)
   {
       if(err)
       {
           console.log(err);
       }
       else
       {
            items.sort({"cost":1});
            console.log("here");
          //  console.log(buyer);
            res.render("itemdisplay", {items: items});
       }
   });
  //res.render("buy",{id:req.params.sid});
});
router.get("/:sid/seeds", function(req, res){
     Item.find({"type":"Seeds"},function(err,items)
   {
       if(err)
       {
           console.log(err);
       }
       else
       {
            items.sort({"cost":1});
            console.log("here");
          //  console.log(buyer);
            res.render("itemdisplay", {items: items});
       }
   });
  //res.render("buy",{id:req.params.sid});
});

router.post("/:sid/items", function(req, res){
    //Item.create(req.body.item, function(err, newitem){
      var sid=req.params.sid;
    User.findById(req.params.sid,function(err,found)
   {
        console.log(found);
       if(err)
       {
           console.log(err);
       }
       else
       {
            console.log(found);
            var username={
            id:req.params.sid,
            username:found.username
          };
           var item = new Item({
           name: req.body.item.name,
           content: req.body.item.content,
           type: req.body.item.type,
           image: req.body.item.image,
           author: req.body.item.author,
           cost: req.body.item.cost,
           phone: req.body.item.phone,
           username: username
          });

      item.save(function(err){
        if(!err){
          console.log("Saved");
          if(found.role=="farmer")
              res.redirect("/farmer/"+req.params.sid);
          else
             res.redirect("/agrodealer/"+req.params.sid);
      }

      });
            
    }
});
        
      //  res.redirect("/items");
    //});
    
});

router.delete("/:sid/items/:id", function(req, res){
    Item.findByIdAndRemove(req.params.id, function(err){
        if(!err)
        {
            res.redirect("/agrodealer/"+req.params.sid);
        }
        else
        {
            console.log("Error occured");
            
        }
        
    });
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
