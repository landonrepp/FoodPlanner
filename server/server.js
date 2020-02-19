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
const port = 8000;
const bodyParser = require('body-parser');
//internal dependancies
const ConnectionManager = require("./ConnectionManager");
const LoginService = require("./LoginService");
const MealMapper = require("./MealMapper");
const path = require("path");
const AppFolder = path.resolve('../foodPlanner/dist/foodPlanner');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(ExpressSesssion(LoginService.SessionObj));// IMPORTANT:: this line must run before any other app.use

app.set('trust proxy', 1)

// https://www.sitepoint.com/user-authentication-mean-stack/

app.use(LoginService.passport.initialize());
app.use(LoginService.passport.session());

// app.use(cors());
app.use(bodyParser.json()); // this will parse Content-Type: application/json 
app.use(bodyParser.urlencoded({ extended: true })); // this will parse Content-Type:  application/x-www-form-urlencoded
// app.use(ConnectionManager.router);
app.use("/login", LoginService.router);
app.use("/sql", ConnectionManager.router);
app.use("/meals",MealMapper.router);

ConnectionManager.refreshDBLink();



// TODO: THIS PIECE https://stackoverflow.com/questions/39845526/how-to-serve-an-angular2-app-in-a-node-js-server
// app.get('/:path',(req,res)=>{
//     console.log(req.url);
//     fs.readFile('./client/'+req.params['path'], 'utf8', function(err, contents) {
//         res.end(contents);
//     });
// });

// app.post('/login', passport.authenticate('local', { successRedirect: '/',failureRedirect: '/login' }));

// this line is much more secure than the commented out bits
app.get('*.*', express.static(AppFolder, {maxAge: '1y'}));

// ---- SERVE APLICATION PATHS ---- //
app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: AppFolder});
});

app.listen(port,()=>{
    console.log('listening to port '+port,"0.0.0.0");
});
