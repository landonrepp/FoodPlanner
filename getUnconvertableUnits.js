math = require("mathjs");
// const fs = require("fs");
const fs = require('fs');
var mysql = require('mysql');
// const http = require("http");
const port = 80;

const credentials = {
    host: '34.73.42.170',
    user: 'landonrepp',
    password: 'Ilike0909)()(',
    database: 'Nutrition'
}
let pool = mysql.createPool(credentials);


pool.getConnection((err,con)=>{
    con.query(`select householdServingMeasurement from vwIngredientsForUnitConversion
                group by householdServingMeasurement;
                `,(err,result,fields)=>{
        if(err) {
            console.log(err);
        }
        else{
            findConversions(result);
        }
    });
    con.release();
})

function findConversions(results){
    results.forEach(result =>{
        try{
            let x = math.unit(.5,result["householdServingMeasurement"]);
        }
        catch(ex){
            console.log(result["householdServingMeasurement"]);
        }
    });
}