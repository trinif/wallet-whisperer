// To connect with your mongoDB database
import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'

// api url
mongoose.connect('mongodb+srv://neha:mongodb321!@walletwhisperer.gykjp.mongodb.net/', {
    dbName: 'items',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Schema for users of app
const TransactionSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    merchant: {
        type: String,
        default: "merchant"
    },
    medium: {
        type: String,
        default: "balance"
    },
    purchase_date: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
    },
    status: {
        type: String,
        default: "executed"
    },
    description: {
        type: String,
        required: true
    },
    satisfaction: {
        type: Number,
        default: 3
    }
});
const Transaction = mongoose.model('transactions', TransactionSchema);
Transaction.createIndexes();

// For backend and express
const app = express();
console.log("App listening at port 8080");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {

    resp.send("App is working");
    // You can check backend is working or not by 
    // entering http://loacalhost:5000
    
    // If you see App is working means
    // backend working properly
});

app.put("/updateTransaction/:id", async (req, res) => {
    try {
      const { satisfaction } = req.body;
      const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, { satisfaction }, { new: true });
      res.json(updatedTransaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

app.listen(8080);