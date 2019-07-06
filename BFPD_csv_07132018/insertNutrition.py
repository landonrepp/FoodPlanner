from pandas.io import sql
from sqlalchemy import create_engine
import pandas as pd
# db = MySQLdb.connect(host="34.73.42.170",    # your host, usually localhost
#                      user="landonrepp",         # your username
#                      passwd="Ilike0909",  # your password
#                      db="Nutrition")        # name of the data base

engine = create_engine('mysql://landonrepp:Ilike0909@34.73.42.170/Nutrition')

csv = pd.read_csv("Nutrients.csv")

conversionFactor ={
    'g':	1,
    'mg':	2,
    'IU':	3,
    'kcal':	4,
    'mg_ATE':	5,
    'mcg' : 6
}

idConversion = lambda x: conversionFactor[x]
csv["measurementID"] = csv["measurementID"].apply(idConversion)

print(csv.head())


with engine.connect() as conn, conn.begin():
    csv.to_sql('tblNutrients', conn, if_exists='replace')