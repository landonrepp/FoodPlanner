from bs4 import BeautifulSoup as bs
import requests
import json

def distinct(arr):
    retarr = []
    for i in arr:
        if i not in retarr:
            retarr.append(i)
    return retarr

with open("veganrocks.html","r") as mf:
    soup = bs(mf.read())

hrefs = []
for i in soup.find_all("a"):
    if i.get('href') is not None:
        if "/en/base/recipes" in i.get('href'):
            hrefs.append(i.get('href'))

hrefs = distinct(hrefs)
recipes = []
for i in hrefs:
    response = requests.get(i)
    soup = bs(response.text)
    for j in soup.find_all("a"):
        if j.get('href') is not None:
            if "/en/" in j.get('href') and 'base' not in j.get('href'):
                recipes.append(j.get('href'))

tbls = {}
for i in recipes:
    response = requests.get(i)
    soup = bs(response.text)
    test = json.dumps(tbls)
    tbl = soup.find("div",{"class":"zurreck-recipes-ingredients"})
    if tbl is not None:
        tbls[i]=str(tbl)

with open("tables.json","w") as mf:
    mf.write(json.dumps(tbls))