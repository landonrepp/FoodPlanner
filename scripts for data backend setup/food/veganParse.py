from bs4 import BeautifulSoup as bs
import requests
import json

with open("tables.json","r") as mf:
    tables = mf.read()
    tables = tables.replace("\\u00a0","")

tables = json.loads(tables)
recipes = {}
for i in tables:
    recipe = {}
    table = tables[i]
    table = bs(table,features="lxml").find_all("tr")
    for j in table:
        cols = j.find_all("td")
        if cols[1].get("class") != ["rb-it"]:
            recipe[str(cols[1].text)] = str(cols[0].text)

    recipes[i] = json.dumps(recipe)

with open("recipes.json","w") as mf:
    mf.write(json.dumps(recipes,indent=4, sort_keys=True))