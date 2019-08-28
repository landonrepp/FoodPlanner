from pandas.io import sql
from sqlalchemy import create_engine
import pandas as pd
from bs4 import BeautifulSoup as bs
import json

import mysql.connector

mydb = mysql.connector.connect(
  host="34.73.42.170",
  user="landonrepp",
  passwd="",
  database="Nutrition"
)

with open("parsedData.json","r") as mf:
    recipes = json.loads(mf.read())


mycursor = mydb.cursor()
for i in recipes:
    for j in i["ingredients"]:
        if "-" in j["quantity"]:
            j["quantity"]= j["quantity"].split("-")[1]
        if " " in j["quantity"]:
            if len(j["quantity"].split(" ")[1])==0:
                j["quantity"] = j["quantity"].replace(" ","")
        try:
            quantity = eval(j["quantity"].replace("⁄","/").replace(" ","+"))
        except:
            quantity = 0
        print((i["link"],quantity,j["measure"],j["ingredient"]))
        ingredientSql = "INSERT INTO tmpTblIngredients (link,quantity,measure,ingredient) VALUES (%s,%s, %s,%s)"
        mycursor.execute(ingredientSql,(i["link"],quantity,j["measure"],j["ingredient"]))
mydb.commit()
