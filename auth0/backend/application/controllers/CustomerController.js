//import express from 'express';
import axios from 'axios';

//const router = express.Router();

const MONGO_URI = 'mongodb+srv://neha:mongodb321!@walletwhisperer.gykjp.mongodb.net/';
const DATABASE_NAME = 'items';
const COLLECTION_NAME = 'transactions';

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

  const getTransactions = async (req, res) => {
    try {
      const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      console.log("Connected to MongoDB");
  
      const db = client.db(DATABASE_NAME);
      const collection = db.collection(COLLECTION_NAME);
      
      // Fetch transaction data from MongoDB collection
      const transactions = await collection.find({}).toArray();
      
      res.json(transactions);  // Send the transaction data to the frontend
      client.close(); // Close the MongoDB connection
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ message: 'Error fetching transactions', error: error.message });
    }
  };

export {getTransactions, getCustomers};