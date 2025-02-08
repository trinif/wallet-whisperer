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
