from pandas.io import sql
from sqlalchemy import create_engine
import pandas as pd
from bs4 import BeautifulSoup as bs
import json
import requests
from functools import reduce

import mysql.connector

with open("connectionstring.json","r") as mf:
    connectionstring = json.loads(mf.read())
mydb = mysql.connector.connect(
  host=connectionstring["host"],
  user=connectionstring["user"],
  password=connectionstring["password"],
  database=connectionstring["databse"]
)
def Average(lst): 
    return reduce(lambda a, b: int(a) + int(b), lst) / len(lst)

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
        "link":i["link"],
        "img":i["img"]
    }))
for i in range(len(recipes)):
    href = recipes[i]["link"]
    try:
        soup = bs(requests.get(href).text, "html.parser")
    except Exception as ex:
        print(ex)
        continue
    servingQuant = soup.find("div",{"class":"recipe-facts__servings"})
    if servingQuant is None:
        servingQuant = soup.find("div",{"class":"recipe-facts__yield"}).find("a").find("span").text
    else:
        servingQuant = servingQuant.find("a").text
    servingQuant = servingQuant.replace(" ","").split("-")
    servingQuant = [int(eval(i)) for i in servingQuant]
    print(servingQuant)
    recipes[i]["servingQuant"] = Average(servingQuant)

mycursor = mydb.cursor()
for i in recipes:
    recipeSql = "INSERT INTO tmptblRecipes (recipe,link,img,servingQuant) VALUES (%s,%s,%s,%s)"
    mycursor.execute(recipeSql,(i["title"],i["link"],i["img"],i["servingQuant"]))
mydb.commit()