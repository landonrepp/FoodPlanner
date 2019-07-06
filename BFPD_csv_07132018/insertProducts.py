from pandas.io import sql
from sqlalchemy import create_engine
import pandas as pd
# db = MySQLdb.connect(host="34.73.42.170",    # your host, usually localhost
#                      user="landonrepp",         # your username
#                      passwd="Ilike0909",  # your password
#                      db="Nutrition")        # name of the data base

engine = create_engine('mysql://landonrepp:Ilike0909@34.73.42.170/Nutrition?charset=utf8mb4')

csv = pd.read_csv("Products.csv")


print(csv.head())


with engine.connect() as conn, conn.begin():
    csv.to_sql('tblProducts', conn, if_exists='replace')