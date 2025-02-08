import React, { useState } from "react";
import { Button, Alert } from "reactstrap";
import Highlight from "../components/Highlight";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { getConfig } from "../config";
import Loading from "../components/Loading";

const styles = {
  form: {
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    width: '100%',
    maxWidth: '400px',
    boxSizing: 'border-box',
    fontSize: '1rem',
    color: '#333',
    marginBottom: '5px',
    display: 'block',
  },

  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },

  button: {
    backgroundColor: '#2DE1FC',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '5px',
    width: '100%',
    transition: 'backgroundColor 0.3s ease',
  }
};

export const PredictorComponent = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Store form data as JSON
    const data = {
      amount: document.getElementById("amount").value,
      merchant_id: document.getElementById("merchant").value,
      description: document.getElementById("description").value
    };

    try {
      // Flask server for predictions is localhost:5000 by default
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(response.body);

      // Handle the response
      const result = await response.json();
      console.log(result)
      
    } catch (ex) {
      console.error('Error fetching prediction:', ex);
    }
  };

  return (
    <>
      <div className="mb-5">
        
        <h1>Regret Predictor</h1>
        <p className="lead">
          What are you thinking of purchasing?
        </p>

        <form id="itemForm" style={styles.form}>
          <label>Store:</label>
          <input type="text" id="merchant" style={styles.input} required />
          <br></br>

          <label>Price:</label>
          <input type="number" id="amount" style={styles.input} required />
          <br></br>

          <label>Item:</label>
          <input type="text" id="merchant" style={styles.input} required />
          <br></br>

          <button type="submit" style={styles.button}>Predict Satisfaction</button>
        </form>

      </div>
    </>
  );
};

export default withAuthenticationRequired(PredictorComponent, {
  onRedirecting: () => <Loading />,
});
