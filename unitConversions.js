math = require("mathjs");
// const fs = require("fs");
const fs = require('fs');
var mysql = require('mysql');
// const http = require("http");

const port = 80;

const credentials = {
    host: '34.73.42.170',
    user: 'landonrepp',
    password: 'password',
    database: 'Nutrition'
}
let pool = mysql.createPool(credentials);



pool.getConnection((err,con)=>{
    console.log(`select * from vwIngredientsForUnitConversion`);
    con.query(`select * from vwIngredientsForUnitConversion
                where ingredientMeasure is not null
                and conversionCode = 0`,(err,result,fields)=>{
        if(err) {
            console.log(err);
        }
        else{
            findConversions(result);
        }
    });
    con.release();
})

async function updateTable(result){
    pool.getConnection((err,con)=>{
        con.query(`insert into tblNutritionalInformation (ingredientID,ingredientQuantity,ingredientMeasurement,conversionTable,conversionQuantity,conversionMeasurement)
                select ${result["ingredientID"]},${result["ingredientMeasurement"]},'${result["ingredientMeasure"]}',null,${b.value*100},'${b.units[0].unit.name}'`,(err,result,fields)=>{
            if(err) {
                console.log(err);
            }
            else{
                findConversions(result);
            }
        });
    });
}
async function findConversions(results){
    console.log(results);
    

    results.forEach((result)=>{
        try{
            let a = math.unit(result["ingredientMeasurement"],result["ingredientMeasure"].toLowerCase());
            let b;
            try{
                b = a.to(result["nutrientMeasure"].toLowerCase());
            }
            catch{
                try{
                    b = a.to(result["servingMeasurement"].toLowerCase());
                }
                catch{
                    try{
                        b = a.to(result["householdServingMeasurement"].toLowerCase());
                    }
                    catch{

                    }
                }
            }
            if(b){
                try{
                    updateTable(result);
                }
                catch(ex){
                    console.log(result["ingredientMeasure"]);   
                    try{
                        con.release();
                    }
                    catch{

                    }
                }
            }
        }
        catch(ex){
            console.log(result["ingredientMeasure"]);
        }
    });
}