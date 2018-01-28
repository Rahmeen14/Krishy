var express = require('express');
var app=express();
const path= require('path');
var bodyParser=require('body-parser');
const http= require('http');
const socketIO=require('socket.io');
var mongoose=require("mongoose");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
const public_path= path.join(__dirname, "../public");
const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const {requireRole} = require("./utils/role");
mongoose.connect("mongodb://user:password@ds117128.mlab.com:17128/ruralhack");
const {Users} = require("./utils/users");
var User=require("../models/user.js");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var indexRoute=require("../routes/index.js");
var users = new Users();
var server= http.createServer(app);

var io = socketIO(server); 
//^^^ This is our web sockets server
const port= process.env.PORT || 3000;
app.use(express.static(public_path));
//^^^this is our http server
app.use(require("express-session")({
    secret: "First project",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});
app.use(indexRoute);






// chat functionality



//Chat app functionality
io.on('connection', function(socket){
	console.log("New User enters tadaaaa");
	
	socket.on('join', function(params, callback){
		if(!isRealString(params.name) || !isRealString(params.room))
		{
			//console.log("Lol why ?");
			return callback("You have made an error filling blank form details");

		}

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);
		socket.emit('updateUserList', users.getUserList(params.room));
		socket.emit("newMessage", generateMessage("Admin", `Welcome to ${params.room} chat room`));	

		socket.broadcast.to(params.room).emit("newMessage",generateMessage("Admin", `${params.name} joined the room`));

	
		callback();
	});

	socket.on("createMessage", function(mail,callback){
		//console.log("Created Message", mail);
		var user = users.getUser(socket.id);
		if(user && isRealString(mail.text))
		{
			io.to(user.room).emit("newMessage", generateMessage(user.name, mail.text));
		
		}
		callback({text: "Yay sent", status: "fair enough"});
	});

	socket.on('currentLocation', function(location){
	var text= location.latitude + "," + location.longitude;
	var user = users.getUser(socket.id);
					
    io.to(user.room).emit('findMap', generateLocationMessage(user.name , text));
	});
	socket.on('disconnect', function(){
			var user = users.removeUser(socket.id);
			io.to(user.room).emit("updateUserList", users.getUserList(user.room));
			io.to(user.room).emit("newMessage", generateMessage('Admin', `${user.name} has left the room`));
			console.log("Client Disconnected");
			//socket.broadcast.emit("newMessage",generateMessage("admin", "A user left the chat"));
			});
	
	});


server.listen(port, function(){
	console.log("server on duty, mallady");
});