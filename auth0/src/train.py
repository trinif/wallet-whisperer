import pandas as pd
from pymongo import MongoClient
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import accuracy_score, confusion_matrix

# Set up MongoDB connection
client = MongoClient('mongodb://localhost:27017/') # Add mongodb url
db = client['database-name'] 
collection = db['collection-name'] 

# DataFrame from MongoDB
data = collection.find()
df = pd.DataFrame(data)
columns = df.columns.tolist()

# Merchant and Purpose are categorical variables, Satisfaction is 1-5 scale
X = df[['Price', 'Merchant', 'Purpose']]
y = df['Satisfaction']  # Target variable

# Encode categorical variables (merchant and purpose)
X['Merchant'] = LabelEncoder().fit_transform(X['Merchant'])
X['Purpose'] = LabelEncoder().fit_transform(X['Purpose'])

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0)

# Standardize price
scaler = StandardScaler()
X_train[['Price']] = scaler.fit_transform(X_train[['Price']])
X_test[['Price']] = scaler.transform(X_test[['Price']])

# Train with logistic regression
model = LogisticRegression()
model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = model.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)

print(f"Accuracy: {accuracy * 100:.2f}%")