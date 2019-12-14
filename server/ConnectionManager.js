const fs = require('fs');
let mysql = require('mysql');
const ExceptionHandler = require("./ExceptionHandler");
const router = require('express').Router();


const credentials = {
    host: 'localhost',
    user: 'landonrepp',
    password: 'password',
    database: 'Nutrition',
    timeout:10

}

// initialize storedProcedureList
let storedProcedureList = [];

function handleErr(err){
    console.log(err);
    pool = mysql.createPool(credentials);
}

let pool = mysql.createPool(credentials);

router.get("/refreshDBLink",(req,res)=>{
    refreshDBLink();
    res.end();
});

router.route('/sppost/:sp').post((req,res)=>{
    let sp=req.params['sp'];

    callSp(sp,true,params=req.body).then(result=>{
        res.end(JSON.stringify(result[0]));
    })
    .catch((err)=>{
        res.end(err);
    });
});
router.get('/spget/:sp',(req,res)=>{
    let sp=req.params['sp'];
    callSp(sp,true,req.body).then(result=>{
        res.end(JSON.stringify(result[0]));
    })
    .catch((err)=>{
        res.end(err);
    });
});

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
                strParams += `${params[i]},`
                // if (typeof(params[i])== "number"){
                //     strParams += `${params[i]},`
                // }
                // else{
                //     strParams += `'${params[i]}',`
                // }
            }
            if(strParams.length>0){
                strParams = strParams.substring(0,strParams.length-1)
            }
            pool.getConnection((err,con)=>{
                if(err){
                    handleErr();
                    return;
                }
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
function refreshDBLink(){
    callSp('getStoredProcedureList',false).then(result=>{
        let li = [];
        console.log(result[0]);
        for(i in result[0]){
            li.push(result[0][i].name);
        }
        storedProcedureList = li;
        console.log(storedProcedureList);
    })
    .catch(ex =>{
        ExceptionHandler.handleErr(ex);
    });
}

function callSql(strQuery){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            if(err){
                handleErr();
                return;
            }
            con.query(strQuery,(err,result,fields)=>{
                if(err) {
                    console.log("err "+ err)
                    handleErr();
                    reject(JSON.stringify(err));
                }
                else{
                    resolve(result[0]);
                }
            });
            con.release();
        });
    });
}

module.exports = {callSp, refreshDBLink, router, callSql }