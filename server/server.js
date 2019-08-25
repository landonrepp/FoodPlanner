const express = require("express");
// const fs = require("fs");
const fs = require('fs');
var mysql = require('mysql');
// const http = require("http");
var cors = require('cors')
const https = require("https");
const baseUrl = "https://www.landonrepp.com/index.html";
const app = express();
const port = 80;
const bodyParser = require('body-parser');
// initialize storedProcedureList
let storedProcedureList = [];

const credentials = {
    host: 'localhost',
    user: 'landonrepp',
    password: 'password',
    database: 'Nutrition'
}



app.use(cors());
app.use(bodyParser.json()); // this will parse Content-Type: application/json 
app.use(bodyParser.urlencoded({ extended: true })); // this will parse Content-Type:  application/x-www-form-urlencoded

function handleErr(err){
    console.log(err);
    var pool = mysql.createPool(credentials);
}

var pool = mysql.createPool(credentials);
refreshDBLink();


function refreshDBLink(){
    callSp('getStoredProcedureList',false).then(result=>{
        let li = [];
        console.log(result[0]);
        for(i in result[0]){
            li.push(result[0][i].name);
        }
        storedProcedureList = li;
        console.log(storedProcedureList);
    });
}
function getMarketData(intID){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            con.query(`CALL getMarketHistory(${intID})`,(err,result,fields)=>{
                if(err) {
                    handleErr(err);
                    reject(err);
                }
                resolve(result)
            });
            con.release();
        });
    });
}
function getHotItems(){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            con.query(`CALL getHotItems()`,(err,result,fields)=>{
                if(err) {
                    handleErr();
                    reject(err);
                }
                else
                    resolve(result);
            });
            con.release();
        });
    });
}
function callSp(sp,checkIfExists = true,params=null){
    return new Promise((resolve,reject)=>{
        console.log(sp);
        if(storedProcedureList.indexOf(sp)==-1 && checkIfExists){
            reject("no stored procedure of that name");
            console.log("no stored procedure of that name");
        }
        else{
            strParams = "";
            for(i in params){
                if (typeof(params[i])== "number"){
                    strParams += `${params[i]},`
                }
                else{
                    strParams += `'${params[i]}',`
                }
            }
            if(strParams.length>0){
                strParams = strParams.substring(0,strParams.length-1)
            }
            pool.getConnection((err,con)=>{
                console.log(`CALL ${sp}(${strParams})`);
                con.query(`CALL ${sp}(${strParams})`,(err,result,fields)=>{
                    if(err) {
                        handleErr();
                        reject(JSON.stringify(err));
                    }
                    else{
                        resolve(result);
                    }
                });
                con.release();
            });
        }
    });
}

app.get('/',(req,res)=>{
    // navigation redirect
    res.end(`<html><body><script>window.location.replace('${baseUrl}')</script><body></html>`)
});

app.get('/hotItems',(req,res)=>{
    getHotItems().then(result=>{
        res.end(JSON.stringify(result[0].map(re=>{
            return re["itemsID"];
        })));
    });
});
app.get('/calc/:itemNumber',(req,res)=>{
    console.log(req.url);
    console.log(req.params['itemNumber']);
    getMarketData(req.params['itemNumber']).then((values)=>{
        res.end(JSON.stringify(values[0]));
    });
});

app.get("/refreshDBLink",(req,res)=>{
    refreshDBLink();
    res.end();
});

app.get('/:path?id=:id',(req,res)=>{
    console.log(req.url);

    fs.readFile('./client/'+req.params['path'], 'utf8', function(err, contents) {
        res.end(contents);
    });
});

app.get('/:path',(req,res)=>{
    console.log(req.url);

    fs.readFile('./client/'+req.params['path'], 'utf8', function(err, contents) {
        res.end(contents);
    });
});
app.route('/sql/sppost/:sp').post((req,res)=>{
    let sp=req.params['sp'];

    callSp(sp,true,params=req.body).then(result=>{
        res.end(JSON.stringify(result[0]));
    })
    .catch((err)=>{
        res.end(err);
    });
});
app.get('/sql/spget/:sp',(req,res)=>{
    let sp=req.params['sp'];
    callSp(sp).then(result=>{
        res.end(JSON.stringify(result[0]));
    })
    .catch((err)=>{
        res.end(err);
    });
});


app.listen(port,()=>{
    console.log('listening to port '+port);
});