from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

# Retrieve stored model (from train.py)
app = Flask(__name__)
CORS(app, supports_credentials=False, origins='http://localhost:3000')

model = joblib.load('models/prediction_model.joblib')

# Define the prediction route
@app.route('/predict',
           methods=['GET', 'POST', 'OPTIONS'])
def predict():
    try:
        # Get the input features from the request
        data = request.get_json()  # Expecting JSON data
        features = np.array([data['features']])  # Convert input data into numpy array for prediction

        # Make prediction using the loaded model
        prediction = model.predict(features)
        # Send back the prediction as a JSON response
        response = jsonify({'prediction': prediction.tolist()})
        response.headers.add('Access-Control-Allow-Origin')
        response.headers.add('Access-Control-Allow-Headers', '*')
        response.headers.add('Access-Control-Allow-Methods', '*')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Max-Age', '300')
        return response, 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route("/api/example", methods=["GET"])
def example():
    return {"message": "CORS is enabled!"}


if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Run on port 5000