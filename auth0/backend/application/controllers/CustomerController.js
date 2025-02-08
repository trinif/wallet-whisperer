//import express from 'express';
import axios from 'axios';

//const router = express.Router();

const getCustomers = async (req, res) => {
      const API_URL = 'http://api.nessieisreal.com/customers';
      const API_KEY = '1791db7671050f930946a58ec2de3ed2';
      
      try {
        const response = await axios.get(`${API_URL}?key=${API_KEY}`);
        console.log('Data:', response.data);  // Logging to backend terminal
        res.json(response.data);              // Sending data to the frontend
      } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ message: 'Error fetching customers', error: error.message });
      }
  };

export default getCustomers;