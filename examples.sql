use Nutrition;
-- this gives a general idea of the flow. recipes are linked to their ingredients, and the nutritional information comes from tblNutrients, which is a database from the FDA
select * from tblRecipes REP
inner join tblIngredients ING
	on REP.RecipeID = ING.recipeID
inner join tblNutrients NUT
	on NUT.productID = ING.productID;
    
-- the two tables from the FDA are stored here
select * from tblNutrients NUT
inner join tblProducts PRO
on NUT.ProductID = PRO.productID;

-- this table holds measurements (ounces,pounds,etc)
select * from tblMeasurements;

-- this table will eventually be used convert from one measurement to another
select * from tblUnitConversion;