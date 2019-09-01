from pandas.io import sql
from sqlalchemy import create_engine
import pandas as pd
from bs4 import BeautifulSoup as bs
import json

import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="landonrepp",
  password="password",
  database="Nutrition"
)

with open("data.json","r") as mf:
    data = json.loads(mf.read())

with open("example.html","w", encoding='utf-8') as mf:
    mf.write(bs(json.loads(data[0])["ingredients"]).prettify())
recipes = []
for i in data:
    ingredients = []
    i = json.loads(i)
    dat = bs(i["ingredients"])
    if i is None:
        continue
    for j in dat.find_all("li",{"class":"recipe-ingredients__item"}):
        quant = j.find("div",{"class":"recipe-ingredients__ingredient-quantity"})
        if quant is None:
            quant = "0"
        else:
            quant = quant.text
        item = j.find_all("span","recipe-ingredients__ingredient-part")
        # print(item)
        if len(item)>1:
            measure = item[0].text
            ingredient = item[1].text
        elif len(item) == 1:
            measure = item[0].text
            ingredient = "!!!"
        ingredients.append({
            "measure":measure,
            "ingredient":ingredient,
            "quantity":quant
        })
    recipes.append(({
        "ingredients":ingredients,
        "title": i["title"],
        "link":i["link"]
    }))

with open("parsedData.json","w") as mf:
    mf.write(json.dumps(recipes))

with open("parsedData.json","r") as mf:
    recipes = json.loads(mf.read())

mycursor = mydb.cursor()
for i in recipes:
    recipeSql = "INSERT INTO tblRecipes (recipe,link) VALUES (%s,%s)"
    mycursor.execute(recipeSql,(i["title"],i["link"]))
    mydb.commit()
    lastID = mycursor.lastrowid
    for j in i["ingredients"]:
        print("brefore:","\""+j["quantity"]+"\"")
        if "-" in j["quantity"]:
            j["quantity"]= j["quantity"].split("-")[1]
        if " " in j["quantity"]:
            if len(j["quantity"].split(" ")[1])==0:
                j["quantity"] = j["quantity"].replace(" ","")
        try:
            quantity = eval(j["quantity"].replace("⁄","/").replace(" ","+"))
        except:
            quantity = 0
        print(quantity)
        j["measure"] = j["measure"].replace("(","").replace(")","").strip()
        ingredientSql = "INSERT INTO tblIngredients (recipeID,quantity,measure,ingredient) VALUES (%s,%s, %s,%s)"
        mycursor.execute(ingredientSql,(lastID,quantity,j["measure"],j["ingredient"]))
    mydb.commit()