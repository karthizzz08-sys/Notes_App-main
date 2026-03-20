import mysql.connector

db = mysql.connector.connect(
    host= "localhost",
    database= "notes",
    password="12345",
    user="root"
)