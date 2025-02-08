import requests
from pymongo import MongoClient

key = "1791db7671050f930946a58ec2de3ed2"
accountId = "67a7bb309683f20dd518bcae"
requestURL = "http://api.nessieisreal.com/accounts/" + accountId + "/purchases?key=" + key

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