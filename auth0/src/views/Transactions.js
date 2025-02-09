import React, { useEffect, useState } from "react";
import { Button, Alert } from "reactstrap";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { getConfig } from "../config";
import Loading from "../components/Loading";
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Slider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const TransactionsComponent = () => {

  // const api_url = 
  const [customers, setCustomers] = useState([]); // State to hold customer data

  const [transactions, setTransactions] = useState([]);
<<<<<<< Updated upstream
  const [loading, setLoading] = useState(true);

  const [rowState, setRowStates] = useState({});
=======
  const [satisfaction, setSatisfaction] = useState([1, 5]);
  
  const loadCustomers = () => {
    axios.get("http://localhost:3001/customers")
      .then((response) => {
        console.log(response.data) // Save response data to state
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching info:", error);
        setLoading(false);
      });
  };

  const columns = [
      /* { field: 'title', headerName: 'Title', width: 300, renderCell: (params) => (
          <Link onClick={() => setSelectedSongId(params.row.song_id)}>{params.value}</Link>
      ) }, */
      { field: 'title', headerName: 'Description' },
      { field: 'purchase_date', headerName: 'Date' },
      { field: 'satisfaction', headerName: 'Satisfaction' }
  ]
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
>>>>>>> Stashed changes

  const getTransactions = () => {
    fetch(`http://api.nessieisreal.com/accounts/67a7bb309683f20dd518bcae/purchases?key=1791db7671050f930946a58ec2de3ed2`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(resJson => {
        const transWithId = resJson.map((t) => ({ id: t.id, ...t }));
        setTransactions(transWithId);
        setLoading(false);
      })
      .then(setLoading(false))
  }

  useEffect(() => {
    console.log("Loading customers...");
    getTransactions();
    //loadCustomers(); // Load customers when the component mounts
  }, []);

  const handleRating = (rowId, value) => {
    setRowStates((prev) => ({
      ...prev,
      [rowId]: {
        ...prev[rowId],
        satisfaction: value,
      },
    }));
    console.log(`Transaction ID: ${rowId}, Rating: ${value}`);
  };

  if (loading) {
    return <p>Loading transactions...</p>;
  }

  return (
    <Container>
      <div className="mb-5">
        <h1>Rate Transactions</h1>
        {transactions.length === 0 ? (
<<<<<<< Updated upstream
        <p>No customers found.</p>
      ) : (
        <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Date</strong></TableCell>
            <TableCell><strong>Description</strong></TableCell>
            <TableCell><strong>Price</strong></TableCell>
            <TableCell><strong>Satisfaction</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((t) => (
            <TableRow key={t._id}>
              <TableCell>{t.purchase_date}</TableCell>
              <TableCell>{t.description}</TableCell>
              <TableCell>{t.amount}</TableCell>
              <TableCell>
                <Slider
                  value={rowState.satisfaction}
                  min={1}
                  max={5}
                  step={1}
                  onChange={(e) => handleRating(t._id, e.target.value)}
                  valueLabelDisplay='auto'
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      )}
=======
          <p>No transactions found.</p>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                  <TableCell><strong>Price</strong></TableCell>
                  <TableCell><strong>Satisfaction</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{t.purchase_date}</TableCell>
                    <TableCell>{t.description}</TableCell>
                    <TableCell>${t.amount}</TableCell>
                    <TableCell>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star}
                          filled={star <= (ratings[t.id] || 0)}
                          onClick={() => handleRating(t.id, star)}
                        />
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
>>>>>>> Stashed changes
      </div>
    </Container>
  );
};

<<<<<<< Updated upstream
=======
const Star = ({ filled, onClick }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 cursor-pointer ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    fill={filled ? 'currentColor' : 'none'}
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.188c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.536 9.384c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 00.95-.69l1.286-3.957z"
    />
  </svg>
);

>>>>>>> Stashed changes
export default withAuthenticationRequired(TransactionsComponent, {
  onRedirecting: () => <Loading />,
});
