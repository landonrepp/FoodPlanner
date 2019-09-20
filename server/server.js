const express = require("express");
// const fs = require("fs");
const fs = require('fs');
// const http = require("http");
var cors = require('cors')
const https = require("https");
const baseUrl = "/index.html";
const app = express();
const port = 8000;
const bodyParser = require('body-parser');

//internal dependancies
const ConnectionManager = require("./ConnectionManager");

const MealMapper = require("./MealMapper");


app.use(cors());
app.use(bodyParser.json()); // this will parse Content-Type: application/json 
app.use(bodyParser.urlencoded({ extended: true })); // this will parse Content-Type:  application/x-www-form-urlencoded


ConnectionManager.refreshDBLink();

app.get('/',(req,res)=>{
    // navigation redirect
    res.end(`<html><body><script>window.location.replace('${baseUrl}')</script><body></html>`)
});

app.get("/refreshDBLink",(req,res)=>{
    ConnectionManager.refreshDBLink();
    res.end();
});

app.get('/:path',(req,res)=>{
    console.log(req.url);

    fs.readFile('./client/'+req.params['path'], 'utf8', function(err, contents) {
        res.end(contents);
    });
});
app.route('/sql/sppost/:sp').post((req,res)=>{
    let sp=req.params['sp'];

    ConnectionManager.callSp(sp,true,params=req.body).then(result=>{
        res.end(JSON.stringify(result[0]));
    })
    .catch((err)=>{
        res.end(err);
    });
});
app.get('/sql/spget/:sp',(req,res)=>{
    let sp=req.params['sp'];
    ConnectionManager.callSp(sp).then(result=>{
        res.end(JSON.stringify(result[0]));
    })
    .catch((err)=>{
        res.end(err);
    });
});


app.listen(port,()=>{
    console.log('listening to port '+port);
});
