const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const { join } = require("path");
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
const port = process.env.SERVER_PORT || 3000;

// MongoDB URI (replace <db_password> with your actual password)
const uri = "mongodb+srv://meissimo:mongo@wallet-whisperer.kmexi.mongodb.net/?retryWrites=true&w=majority&appName=wallet-whisperer";

// Create a MongoClient instance
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Middleware setup
app.use(morgan("dev"));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: '*' }));  // This allows all origins
app.use(express.json());  // For parsing application/json

// MongoDB connection check (Ping)
async function run() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected to MongoDB!");

    // Define a ping route to test the connection
    app.get('/api/ping', async (req, res) => {
      try {
        await client.db("admin").command({ ping: 1 });
        res.status(200).json({ message: "Pinged your deployment. You successfully connected to MongoDB!" });
      } catch (error) {
        res.status(500).json({ message: "Failed to connect to MongoDB", error: error.message });
      }
    });

    // You can add more API routes here to interact with your MongoDB data

  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
}

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));
