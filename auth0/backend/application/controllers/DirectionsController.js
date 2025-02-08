//import express from 'express';
import axios from 'axios';

//const router = express.Router();

const getDirections = async (req, res) => {
    try {
      const { start_addr, end_addr, travel_mode } = req.query;
  
      if (!start_addr || !end_addr) {
        return res.status(400).json({ error: "Both start_addr and end_addr parameters are required." });
      }
  
      // Make the request to SerpAPI
      const response = await axios.get('https://serpapi.com/search', {
        params: {
          engine: 'google_maps_directions',
          start_addr,
          end_addr,
          travel_mode,
          api_key: process.env.SERPAPI_API_KEY,  // Make sure you have a valid API key
        },
      });
  
      // Return the response data to the client
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching directions:', error.message);
      res.status(500).json({ error: 'Error fetching directions from SerpAPI' });
    }
  };

//router.get('/', getDirections);

export default getDirections;