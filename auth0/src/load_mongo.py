import requests
from pymongo import MongoClient

accountId = "67a7acc69683f20dd518bc2e"
requestURL = "http://api.nessieisreal.com/accounts/" + accountId + "/purchases?key=005ce1086097c7b1c72b2c0a185847da"

# Get Capital One data (JSON) and populate MongoDB
data = requests.get(requestURL).json()

# Set up MongoDB connection
client = MongoClient('mongodb+srv://neha:mongodb321!@walletwhisperer.gykjp.mongodb.net/') # Add mongodb url
print("connected to mongo")

databaseName = 'items'
collectionName = 'transactions'

db = client.get_database(databaseName)
collection = db[collectionName]
collection.insert_many(data)

client.close()