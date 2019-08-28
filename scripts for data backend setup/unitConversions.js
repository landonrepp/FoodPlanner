math = require("mathjs");
// const fs = require("fs");
const fs = require('fs');
var mysql = require('mysql');
// const http = require("http");

const port = 80;

const credentials = {
    host: '34.73.42.170',
    user: 'landonrepp',
    password: '',
    database: 'Nutrition'
}
let pool = mysql.createPool(credentials);



pool.getConnection((err,con)=>{
    console.log(`select * from vwIngredientsForUnitConversion`);
    con.query(`select * from vwIngredientsForUnitConversion
                where ingredientMeasure is not null
                and conversionCode = 0
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

function updateTable(results){
    console.log(results.length);
    let x = '';
    let values = [];
    results.forEach(result=>{
        console.log([result[0]["ingredientID"],result[0]["ingredientMeasurement"],result[0]["ingredientMeasure"],null,result[1][1],result[1][0].units[0].unit.name]);
        values.push([result[0]["ingredientID"],result[0]["ingredientMeasurement"],result[0]["ingredientMeasure"],null,result[1][1],result[1][0].units[0].unit.name])
    })
    x = x.slice(0, -1);
    return new Promise((resolve,reject)=>{   
        pool.getConnection((err,con)=>{
            if(err)
                console.log(err);
            con.query(`insert into tblNutritionalInformation (ingredientID,ingredientQuantity,ingredientMeasurement,conversionTable,conversionQuantity,conversionMeasurement)
                    values ?`,[values],(err,result,fields)=>{
                if(err) {
                    reject(err);
                }
                else{
                    resolve(result);
                }
            });
        });
    });
}
var findConversions = async function(results){
    // console.log(results);
    let promises = [];

    results.forEach((result)=>{
        try{
            let a = math.unit(result["ingredientMeasurement"],result["ingredientMeasure"].toLowerCase());
            let b;
            try{
                b = [a.to(result["nutrientMeasure"].toLowerCase()),a.toNumber(result["nutrientMeasure"].toLowerCase())];
            }
            catch{
                try{
                    b = [a.to(result["servingMeasurement"].toLowerCase()),a.toNumber(result["servingMeasurement"].toLowerCase())];
                }
                catch{
                    try{
                        b = [a.to(result["householdServingMeasurement"].toLowerCase()),a.toNumber(result["householdServingMeasurement"].toLowerCase())];
                    }
                    catch{

                    }
                }
            }
            if(b){
                try{
                    promises.push([result,b]);
                }
                catch(ex){
                    // console.log(result);   
                    try{
                        con.release();
                    }
                    catch{

                    }
                }
            }
        }
        catch(ex){
            // console.log(result["ingredientMeasure"]);
        }
    });
    console.log("running...");
    updateTable(promises).then((res)=>{
        console.log(res);
    })
    .catch(err=>{
        console.log(err);
    });
    // Promise.all(promises).then((values)=>{
    //     console.log(values);
    // });
}