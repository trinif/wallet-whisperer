from flask import Flask, request, jsonify
import joblib
import numpy as np

# Retrieve stored model (from train.py)
app = Flask(__name__)
model = joblib.load('prediction_model.joblib')

# Define the prediction route
@app.route('/', methods=['POST'])
def predict():
    try:
        # Get the input features from the request
        data = request.get_json()  # Expecting JSON data
        features = np.array([data['features']])  # Convert input data into numpy array for prediction

        # Make prediction using the loaded model
        prediction = model.predict(features)

        # Send back the prediction as a JSON response
        return jsonify({'prediction': prediction.tolist()})

    except Exception as e:
        return jsonify({'error': str(e)}), 400