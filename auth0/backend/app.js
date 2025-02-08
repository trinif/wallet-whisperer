import express, { Router } from 'express';
import router from './router.js';
import dotenv from 'dotenv';
import cors from 'cors'
import directionsRouter from './application/controllers/DirectionsController.js';
import customersRouter from './application/controllers/CustomerController.js';


dotenv.config();

const server = express(); 

server.use(cors({
    origin: 'http://localhost:3002',  // Allow frontend to make requests
  }));

server.use(express.json());
server.use(router);
server.use('/api/directions', directionsRouter);
server.use('/customers', customersRouter);


const PORT = process.env.PORT || 3000;

// Use CORS middleware

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});