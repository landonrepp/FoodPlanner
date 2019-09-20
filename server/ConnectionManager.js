const fs = require('fs');
let mysql = require('mysql');
const ExceptionHandler = require("./ExceptionHandler");

module.exports = {callSp, refreshDBLink }

const credentials = {
    host: 'localhost',
    user: 'landonrepp',
    password: 'password',
    database: 'Nutrition'

}

// initialize storedProcedureList
let storedProcedureList = [];

function handleErr(err){
    console.log(err);
    pool = mysql.createPool(credentials);
}

let pool = mysql.createPool(credentials);

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
