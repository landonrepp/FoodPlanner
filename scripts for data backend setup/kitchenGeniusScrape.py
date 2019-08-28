from bs4 import BeautifulSoup as bs
import requests
import json

def distinct(arr):
    retarr = []
    for i in arr:
        if i not in retarr:
            retarr.append(i)
    return retarr

unopenedHrefs = ['https://www.geniuskitchen.com/recipe/bourbon-chicken-45809']
openedHrefs = []
data = []
while len(unopenedHrefs) != 0 and len(data)<10000:
    href = unopenedHrefs.pop(0)
    openedHrefs.append(href)
    print(href)
    try:
        soup = bs(requests.get(href).text)
    except Exception as ex:
        print(ex)
        continue
    # get hrefs
    for i in soup.find_all("a"):
        if i.get('href') is not None and i.get("href") not in openedHrefs and "geniuskitchen.com" in i.get("href") and i.get("href") not in unopenedHrefs:
            unopenedHrefs.append(i.get("href"))
    title = soup.find("div", {"class": "recipe-title"})
    
    ingredients = soup.find("ul", {"class": "recipe-ingredients__list"})
    if title is not None and ingredients is not None:
        data.append(json.dumps({
            "title":title.text,
            "ingredients":str(ingredients),
            "link":href
            }))
        print(len(data))
with open("data.json","w") as mf:
    mf.write(json.dumps(data))