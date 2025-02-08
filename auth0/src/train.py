import pandas as pd
from pymongo import MongoClient
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import accuracy_score, confusion_matrix

# Set up MongoDB connection
client = MongoClient('mongodb+srv://neha:mongodb321!@walletwhisperer.gykjp.mongodb.net/') # Add mongodb url
print("connected to mongo")
databaseName = ''
collectionName = ''
db = client[databaseName] 
collection = db[collectionName] 

# DataFrame from MongoDB
data = collection.find()
df = pd.DataFrame(data)
columns = df.columns.tolist()

# Merchant and Purpose are categorical variables, Satisfaction is 1-5 scale
X = df[['price', 'merchant', 'purpose']]
print(df.head())
y = df['satisfaction']  # Target variable

# Encode categorical variables (merchant and purpose)
X['merchant'] = LabelEncoder().fit_transform(X['merchant'])
X['purpose'] = LabelEncoder().fit_transform(X['purpose'])

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0)

# Standardize price
scaler = StandardScaler()
X_train[['price']] = scaler.fit_transform(X_train[['price']])
X_test[['price']] = scaler.transform(X_test[['price']])

# Train with logistic regression
model = LogisticRegression()
model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = model.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)

print(f"Accuracy: {accuracy * 100:.2f}%")