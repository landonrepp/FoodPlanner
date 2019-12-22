const express = require("express");
// const fs = require("fs");
const fs = require('fs');
// const http = require("http");
var cors = require('cors')
const Constants = require('./Constants');
const https = require("https");
const baseUrl = "/index.html";
const app = express();
const ExpressSesssion = require("express-session");
const port = 8080;
const bodyParser = require('body-parser');
//internal dependancies
const ConnectionManager = require("./ConnectionManager");
const LoginService = require("./LoginService");
const MealMapper = require("./MealMapper");

app.use(ExpressSesssion(LoginService.SessionObj));// IMPORTANT:: this line must run before any other app.use

// https://www.sitepoint.com/user-authentication-mean-stack/

app.use(LoginService.passport.initialize());
app.use(LoginService.passport.session());

app.use(cors());
app.use(bodyParser.json()); // this will parse Content-Type: application/json 
app.use(bodyParser.urlencoded({ extended: true })); // this will parse Content-Type:  application/x-www-form-urlencoded
// app.use(ConnectionManager.router);
app.use("/login", LoginService.router);
app.use("/sql", ConnectionManager.router);
app.use("/meals",MealMapper.router);
ConnectionManager.refreshDBLink();

app.get("/google/authenticate",(req,res)=>{
    passport.authenticate('google-id-token'),{failureRedirect:'/login'},
    function(req,res){
        res.end(req.user);
        return;
    }
});

app.get('/',(req,res)=>{
    // navigation redirect
    res.end(`<html><body><script>window.location.replace('${Constants.CrossOriginURL}')</script><body></html>`);
});


// TODO: THIS PIECE https://stackoverflow.com/questions/39845526/how-to-serve-an-angular2-app-in-a-node-js-server
app.get('/:path',(req,res)=>{
    console.log(req.url);
    fs.readFile('./client/'+req.params['path'], 'utf8', function(err, contents) {
        res.end(contents);
    });
});

// app.post('/login', passport.authenticate('local', { successRedirect: '/',failureRedirect: '/login' }));

app.listen(port,()=>{
    console.log('listening to port '+port);
});
