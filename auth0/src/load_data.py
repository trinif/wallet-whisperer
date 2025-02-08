import requests
import json
import random
from datetime import datetime, timedelta
import time  # To add delay between requests if needed
from pymongo import MongoClient

# Function to generate a random date between two dates
def random_date(start_date, end_date):
    delta = end_date - start_date
    random_days = random.randint(0, delta.days)
    return (start_date + timedelta(days=random_days)).strftime('%Y-%m-%d')

# List of items commonly purchased by university students with price ranges
student_items = {
    "Textbook": (50, 200),
    "Notebook": (2, 10),
    "Laptop": (600, 1500),
    "Coffee": (2, 5),
    "Meal Plan": (1000, 3000),
    "Backpack": (30, 100),
    "Headphones": (20, 200),
    "Desk Lamp": (15, 50),
    "Gym Membership": (30, 100),
    "Printer Paper": (5, 20),
    "Water Bottle": (10, 40),
    "Dorm Decor": (20, 150),
    "USB Drive": (10, 50),
    "Bike": (100, 500),
    "Graphing Calculator": (80, 150),
    "Hoodie": (20, 60),
    "Sneakers": (50, 150),
    "Student Software Subscription": (50, 150),
    "Concert Ticket": (20, 100),
    "Movie Ticket": (8, 20),
    "Groceries": (20, 100),
    "Stationery": (5, 20),
    "Microwave": (50, 150),
    "Mini Fridge": (100, 300),
    "Phone Charger": (10, 30),
    "Flashcards": (5, 15),
    "Campus Shuttle Pass": (10, 50),
    "Notebook Paper": (3, 15),
    "Tablet": (200, 800),
    "Laundry Supplies": (10, 40),
    "Shower Caddy": (5, 20),
    "Pillows": (10, 50),
    "Blankets": (20, 100),
    "Clothing": (30, 150),
    "Software License": (50, 200),
    "Bus Pass": (15, 50),
    "Festival Ticket": (30, 120),
    "Food Delivery": (10, 40),
    "Tote Bag": (10, 30),
    "Portable Hard Drive": (50, 150),
    "Gaming Console": (300, 500),
    "Phone Case": (10, 30),
    "Posters": (5, 25),
    "Board Games": (15, 60),
    "Student Union Fee": (50, 150),
    "Library Fines": (5, 30),
    "Exam Fees": (20, 100),
    "Course Registration Fee": (50, 200),
    "Campus Parking Pass": (100, 300),
    "Bicycle Lock": (20, 60),
    "Healthy Snacks": (5, 20),
    "Earbuds": (20, 100),
    "Laptop Stand": (20, 70),
    "Reusable Grocery Bags": (5, 20),
    "Public Transport Card": (10, 50),
    "Lab Fees": (50, 200),
    "Art Supplies": (10, 100),
    "Cooking Utensils": (15, 50),
    "Portable Speaker": (30, 150),
    "Planner": (10, 30),
    "Coffee Maker": (30, 100),
    "Cleaning Supplies": (10, 40),
    "Noise-Cancelling Headphones": (100, 300),
    "Water Filter": (20, 80),
    "Desk Chair": (50, 200),
    "External Monitor": (150, 400),
    "Fitness Tracker": (50, 200),
    "Writing Desk": (100, 300),
    "Bed Sheets": (20, 80),
    "Video Streaming Subscription": (8, 20),
    "Music Subscription": (5, 15),
    "Campus Gym Pass": (20, 60),
    "Public Speaking Course": (50, 200),
    "Yoga Mat": (15, 50),
    "Dance Class": (30, 100),
    "Foreign Language Course": (100, 400),
    "E-book": (5, 50),
    "Laptop Charger": (30, 100),
    "Data Storage Subscription": (10, 50),
    "Cafeteria Meals": (5, 15),
    "Parking Fines": (10, 100),
    "Lab Coat": (20, 60),
    "Safety Goggles": (10, 30),
    "Poster Printing": (5, 30),
    "Conference Fee": (50, 300),
    "Student Organization Dues": (10, 50),
    "Weekend Trip": (100, 400),
    "Dorm Room Fan": (20, 60),
    "Shared Textbook": (20, 80),
    "Writing Software": (20, 100),
    "Notebook Subscription": (5, 15),
    "Web Hosting": (20, 100),
    "Cloud Storage": (10, 50),
    "Phone Bill": (30, 100),
    "Energy Drinks": (5, 20),
    "Sunglasses": (10, 50),
    "Haircut": (15, 50),
    "Microwave Meals": (5, 15),
    "Laundry Card": (10, 30),
    "Drawing Tablet": (50, 250),
    "Concert Merchandise": (20, 100),
}

# Create an account to populate with information
apiKey = "1791db7671050f930946a58ec2de3ed2"
requestURL = "http://api.nessieisreal.com/merchants?key=" + apiKey

# Create merchant
merchant = {
  "name": "Target",
  "category": "General",
  "address": {
    "street_number": "200",
    "street_name": "Market Street",
    "city": "Philadelphia",
    "state": "PA",
    "zip": "19104"
  },
  "geocode": {
    "lat": 0,
    "lng": 0
  }
}

response = requests.post( 
	requestURL, 
	data=json.dumps(merchant),
	headers={'content-type':'application/json'},
)
print(response.json())
merchantId = response.json()['objectCreated']['_id']

# Create customer and account
customer = {
  "first_name": "Nessie",
  "last_name": "Loch",
  "address": {
    "street_number": "101",
    "street_name": "Market Street",
    "city": "Philadelphia",
    "state": "PA",
    "zip": "19104"
  }
}

requestURL = "http://api.nessieisreal.com/customers?key=" + apiKey

response = requests.post( 
	requestURL, 
	data=json.dumps(customer),
	headers={'content-type':'application/json'},
)

requestURL = "http://api.nessieisreal.com/merchants?key=" + apiKey

     
customerId = response.json()['objectCreated']['_id']
print("customer id: " + str(customerId))

account = {
  "type": "Credit Card",
  "nickname": "Spending",
  "rewards": 0,
  "balance": 500,
}

requestURL = "http://api.nessieisreal.com/customers/" + customerId + "/accounts?key=" + apiKey
print("acct request url: " + requestURL)
response = requests.post( 
	requestURL, 
	data=json.dumps(account),
	headers={'content-type':'application/json'},
)

print(response.json())

accountId = response.json()['objectCreated']['_id']

url = "http://api.nessieisreal.com/accounts/" + accountId + "/purchases?key=" + apiKey


# Generate and log 100 purchases
for i, (item, price_range) in enumerate(random.sample(student_items.items(), 100), 1):
    amount = round(random.uniform(*price_range), 2)
    purchase_date = random_date(datetime(2024, 1, 1), datetime(2025, 2, 7))

    payload = json.dumps({
        "merchant_id": merchantId,
        "medium": "balance",
        "purchase_date": purchase_date,
        "amount": amount,
        "status": "completed",
        "description": item
    })

    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    response = requests.post(url, headers=headers, data=payload)

    # Handling the response
    if response.status_code == 201:
        print(f"{i}. Purchase logged successfully: {item} for ${amount} on {purchase_date}")
    else:
        print(f"{i}. Error {response.status_code}: {response.text}")

    # Add delay to avoid hitting API rate limits
    time.sleep(0.5)

