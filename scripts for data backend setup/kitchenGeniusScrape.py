from bs4 import BeautifulSoup as bs
import requests
import json

def distinct(arr):
    retarr = []
    for i in arr:
        if i not in retarr:
            retarr.append(i)
    return retarr

unopenedHrefs = ['https://www.food.com/ideas/most-tweaked-recipes-6655?c=739010',
'https://www.food.com/ideas/all-star-summer-recipes-6337?c=546269',
'https://www.food.com/ideas/75-top-rated-recipes-of-all-time-6719?c=630311',
'https://www.food.com/ideas/most-tweaked-recipes-6655?c=584015',
'https://www.food.com/ideas/most-tweaked-recipes-6655?c=584016',
'https://www.food.com/ideas/most-tweaked-recipes-6655?c=584019',
'https://www.food.com/ideas/most-tweaked-recipes-6655?c=584012',
'https://www.food.com/ideas/75-top-rated-recipes-of-all-time-6719?c=630319',
'https://www.food.com/ideas/most-photographed-recipes-6653?c=579336',
'https://www.food.com/ideas/most-photographed-recipes-6653?c=579337',
'https://www.food.com/ideas/most-photographed-recipes-6653?c=579333',
'https://www.food.com/ideas/most-photographed-recipes-6653?c=579351']
openedHrefs = []
data = []
while len(unopenedHrefs) != 0 and len(data)<100:
    href = unopenedHrefs.pop(0)
    openedHrefs.append(href)
    print(href)
    try:
        soup = bs(requests.get(href).text, "html.parser")
    except Exception as ex:
        print(ex)
        continue
    
    title = soup.find("div", {"class": "recipe-title"})
    ingredients = soup.find("ul", {"class": "recipe-ingredients__list"})
    img = soup.find("meta", {"name": "og:image"})
    
    if title is not None and ingredients is not None and img is not None:
        data.append(json.dumps({
            "title":title.text,
            "ingredients":str(ingredients),
            "link":href,
            "img":img["content"]
            }))
        print(len(data))
    else:
        # get hrefs
        for i in soup.find_all("a"):
            if i.get('href') is not None and i.get("href") not in openedHrefs and "food.com" in i.get("href") and i.get("href") not in unopenedHrefs:
                unopenedHrefs.append(i.get("href"))
with open("data.json","w") as mf:
    mf.write(json.dumps(data))