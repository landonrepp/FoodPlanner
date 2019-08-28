import sqlite3
from sqlite3 import Error
meals = """ CREATE TABLE IF NOT EXISTS tblMeals (
        mealsID integer PRIMARY KEY AUTOINCREMENT,
        name text NOT NULL,
        calories integer,
        carbs integer,
        protien integer,
        fat integer
    ); """
ingredients = """ CREATE TABLE IF NOT EXISTS tblIngredients (
    ingredientsID integer PRIMARY KEY AUTOINCREMENT,
    name text NOT NULL,
    calories integer,
    carbs integer,
    protien integer,
    fat integer
); """
recipies = """ CREATE TABLE IF NOT EXISTS tblRecipies (
    recipiesID integer PRIMARY KEY AUTOINCREMENT,
    mealsID integer,
    ingredientsID integer
); """
class dbManager:
    def __init__(self,fileName):
        self.fileName = fileName
        self.conn = create_connection(fileName)
        self.cur = conn.cursor()

    def create_connection(self,db_file):
        """ create a database connection to a SQLite database """
        try:
            conn = sqlite3.connect(db_file)
            print(sqlite3.version)
        except Error as e:
            print(e)
        finally:
            return conn
            conn.close()
    def create_tables(self):
        self.cur.execute(ingredients)
        self.cur.execute(meals)
        self.cur.execute(recipies)
    