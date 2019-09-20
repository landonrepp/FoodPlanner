const ConnectionManager = require("./ConnectionManager");
const ExceptionHandler = require("./ExceptionHandler");

function createMealPlan(){
    mealPrepPlan = [];
    callSp("getRecipeWithNutritionInfo").then(result =>{
        res.end(result[0])
    })
    .catch(ex=>{
        ExceptionHandler.handleErr(ex);
    })
}