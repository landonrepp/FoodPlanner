from bs4 import BeautifulSoup as bs
import requests
import json

with open("tables.txt","r") as mf:
    tables = mf.read()

tables = tables.split(",")

for i in tables:
    i = bs(i,features="lxml").find_all("tr")
    for j in i:
        j = j.find_all("td")
        if j[0].text!="":
            cur.execute()


