//TODO: set this meal mapper up for more custom meals. as of now we'll be taking some sql shortcuts
const ConnectionManager = require("./ConnectionManager");
const ExceptionHandler = require("./ExceptionHandler");
const router = require('express').Router();

function createMealPlan(){
    mealPrepPlan = [];
    ConnectionManager.callSp("getRecipeWithNutritionInfo").then(result =>{
        res.end(result[0]);
    })
    .catch(ex=>{
        ExceptionHandler.handleErr(ex);
    })
}

async function getOneMealStack(desiredStack, mealArr, margin = .2){
    if(typeof(desiredStack) === "string"){
        desiredStack = JSON.parse(desiredStack);
    }
    currentStack = {
        calories: 0,
        carbohydrates: 0,
        fat: 0,
        protein: 0
    }
    mealArr.forEach(meal => {
        currentStack.calories += meal.calories||0;
        currentStack.carbohydrates += meal.carbohydrates||0;
        currentStack.fat += meal.fat||0;
        currentStack.protein += meal.protein||0;
    });

    query = `select R.recipeID, R.recipe, R.link, R.calories, R.protein, R.carbs, R.fat, R.image, R.servings from 
    
    (select * from tblMealGroups MG
    where 1=1
    ${desiredStack.calories?`and MG.calories between ${(desiredStack.calories- currentStack.calories) * (1-margin) } and ${(desiredStack.calories- currentStack.calories) * (1 + margin) }`:``}
    ${desiredStack.carbohydrates?`and MG.Carbohydrates between ${(desiredStack.carbohydrates- currentStack.carbohydrates) * (1-margin)} and ${(desiredStack.carbohydrates- currentStack.carbohydrates) * (1+margin)}`:``}
    ${desiredStack.fat? `and MG.Fat between ${(desiredStack.fat- currentStack.fat) * (1-margin)} and ${(desiredStack.fat- currentStack.fat) * (1+margin)}`:``}
    ${desiredStack.protein?`and MG.Protein between ${(desiredStack.protein- currentStack.protein) * (1-margin)} and ${(desiredStack.protein- currentStack.protein) * (1+margin)}`:``}
    ${desiredStack.meals?`and MG.meals = ${desiredStack.meals- mealArr.length} `:``}
    order by rand()
    limit 1) MG
    inner join tblGroupedMeals GM
        on MG.MealGroupID = GM.MealGroupID
    inner join vwRecipesWithNutrition R
        on GM.RecipeID = R.RecipeID;`;
    console.log(query);
    return ConnectionManager.callSql(query);
}
function getCol(matrix, col){
    var column = [];
    for(var i=0; i<matrix.length; i++){
       column.push(matrix[i][col]);
    }
    return column;
 }
async function createMealPlans(desiredStack){
    let mealPlan = [[],[],[]];
    for(let i = 0; i<7;i++){
        for(let j = 0;j<3;j++){
            mealPlan[j][i] = null;
        }
    }
    desiredStack = (!desiredStack||typeof(desiredStack)==="string" || !desiredStack.meals)?{
        "calories":1800,
        "carbohydrates":120,
        "fat":120,
        "protein": 120,
        "meals": 3
    }:desiredStack;

    let unsetMeals;
    let result;
    let colors = ['#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#42d4f4', '#f032e6', '#fabebe', '#469990', '#e6beff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#000075', '#a9a9a9', '#ffffff', '#000000'];
    let counter = 0;
    for(let i = 0; i<7; i++){
        unsetMeals = [];
        for(let j = 0; j<mealPlan.length;j++){
            if(!mealPlan[j][i]){
                unsetMeals.push(j);
            }
        }
        if(unsetMeals.length>0){
            result = await getOneMealStack(desiredStack, getCol(mealPlan, i).filter(x=>x),1);
            console.log(result);
            for(let j = 0;j<unsetMeals.length;j++){
                result[j].mealColor = colors[(counter++)%colors.length];
                result[j].mealNumber = counter;
                mealPlan[unsetMeals[j]].fill(result[j],i,i+result[j].servings);
            }
        }
    }
    return mealPlan;
}

router.post("/getMealplan",(req,res)=>{
    createMealPlans(req.body).then(result=>{
        res.end(JSON.stringify(result));
    });
    
});

module.exports = {createMealPlans,router};
