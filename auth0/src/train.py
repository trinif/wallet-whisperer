import pandas as pd
from pymongo import MongoClient
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import accuracy_score, confusion_matrix
import joblib

# Set up MongoDB connection
client = MongoClient('mongodb+srv://neha:mongodb321!@walletwhisperer.gykjp.mongodb.net/') # Add mongodb url
print("connected to mongo")
databaseName = 'items'
collectionName = 'transactions'
db = client[databaseName] 
collection = db[collectionName] 

# DataFrame from MongoDB
data = collection.find()
df = pd.DataFrame(data)
columns = df.columns.tolist()

# Merchant and Purpose are categorical variables, Satisfaction is 1-5 scale
print(df.loc[:,['description', 'amount', 'satisfaction']])

X = df[['amount', 'merchant_id', 'description']]
y = df['satisfaction']  # Target variable

# Encode categorical variables (merchant and purpose)
X['merchant_id'] = LabelEncoder().fit_transform(X['merchant_id'])
X['description'] = LabelEncoder().fit_transform(X['description'])

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0)

# Standardize price
scaler = StandardScaler()
X_train[['amount']] = scaler.fit_transform(X_train[['amount']])
X_test[['amount']] = scaler.transform(X_test[['amount']])

# Train with logistic regression
model = LogisticRegression()
model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = model.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
cm = confusion_matrix(y_test, y_pred)

print(cm)
print(f"Accuracy: {accuracy * 100:.2f}%")

# Save model
joblib.dump(model, "models/prediction_model.joblib")