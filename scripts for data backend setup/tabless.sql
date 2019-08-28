use Nutrition;

create table tblScaleFactor(
	scaleFactorID int primary key auto_increment,
    scaleFactor nvarchar(20),
    scale real,
    sourceMeasurement int,
    targetMeasurement int
);

use Nutrition;
create table tblMeasurements (
	measurementID int primary key auto_increment,
    measurement nvarchar(60),
    initial nvarchar(10)
);
-- drop table tblMeasurements;

-- insert ignore into tblMeasurements (measurement, initial)
-- values ('microgram','mcg');
-- values ('grams','g'),('milligrams','mg'),('International Unit','IU'),('Calories','kcal'),('milligram ate','mg_ATE');

-- select initial,measurementID from tblMeasurements;
-- use Nutrition;
-- delete from tblMeasurements;

-- "productID","strName","data_source","gtin_upc","manufacturer","date_modified","date_available","ingredients_english"
create table tblProducts (
	productID int primary key auto_increment,
    strName text,
    data_source text,
    gtin_upc bigint,
    manufacturer text,
    date_modified datetime,
    date_available datetime,
    ingredients_english text
);
-- "NDB_No","Nutrient_Code","Nutrient_name","Derivation_Code","Output_value","Output_uom"
-- "productID","nutrientID","strName","Derivation_Code","quantity","measurementID"
create table tblNutrients (
	productID int,
	nutrientID int primary key auto_increment,
	strName text,
	Derivation_Code nvarchar(255),
	quantity real,
	measurementID int 
);

-- "NDB_No","Serving_Size","Serving_Size_UOM","Household_Serving_Size","Household_Serving_Size_UOM","Preparation_State"
-- "productID","servingSize","measurementID","householdServingSize","householdMeasurementID","Preparation_State"
create table tblServingSize(
	servingSizeID int primary key auto_increment,
    productID int,
    servingSize real,
    measurementID int,
    householdServingSize real,
    householdMeasurement text,
    Preparation_State text
);
drop table tblServingSize;
select * from tblServingSize;

create table tblRecipes(
    recipeID int primary key auto_increment,
    recipe nvarchar(255),
    calories real,
    protien real,
    carbs real,
    fat real
)

create table tblIngredients(
    ingredientID int primary key auto_increment,
    productID INT,
    recipeID INT,
    quantity REAL,
    measureID int,
    measure NVARCHAR(255)
)