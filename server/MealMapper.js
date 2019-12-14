//TODO: set this meal mapper up for more custom meals. as of now we'll be taking some sql shortcuts
const ConnectionManager = require("./ConnectionManager");
const ExceptionHandler = require("./ExceptionHandler");

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
    currentStack = {
        Calories: 0,
        Carbohydrates: 0,
        Fat: 0,
        Protein: 0
    }
    mealArr.forEach(meal => {
        currentStack.Calories += meal.Calories;
        currentStack.Carbohydrates += meal.Carbohydrates;
        currentStack.Fat += meal.Fat;
        currentStack.Protein += meal.Protein;
    });

    query = `select * from tblMealGroups MG
    inner join tblGroupedMeals GM
        on MG. MealGroupID = GM.MealGroupID
    where MG.calories between ${desiredStack.Calories * (1-margin) } and ${desiredStack.Calories * (1 + margin) }
    and MG.Carbohydrates between ${desiredStack.Carbohydrates * (1-margin)} and ${desiredStack.Carbohydrates * (1+margin)}
    and MG.Fat between ${desiredStack.Fat * (1-margin)} and ${desiredStack.Fat * (1+margin)}
    and MG.Protein between ${desiredStack.Protein * (1-margin)} and ${desiredStack.Protein * (1+margin)}
    and MG.meals = ${desiredStack.Meals- mealArr.length} 
    order by rand()
    limit 1;`;
    return ConnectionManager.callSql(query);
}


async function createMealPlans(desiredStack){
    let mealGroupsIDs = [];
    desiredStack = {
        "Calories":1800,
        "Carbohydrates":120,
        "Fat":120,
        "Protein": 120,
        "Meals": 3
    }
    let x = getOneMealStack(desiredStack, [], 1);
    return x;
    //TODO: call getOneMealStack in a to build stacks for the week.
    
}
module.exports = {createMealPlans};