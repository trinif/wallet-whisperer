import React, { useEffect, useState } from "react";
import { Button, Alert } from "reactstrap";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { getConfig } from "../config";
import Loading from "../components/Loading";
import axios from 'axios';
<<<<<<< HEAD
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Slider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
=======
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
>>>>>>> 6a78c25c4e033cb640631f8afcf37e167e08646d

export const TransactionsComponent = () => {
  const [transactions, setTransactions] = useState([]);
<<<<<<< HEAD

  const [satisfaction, setSatisfaction] = useState([1, 5]);
  
  const loadCustomers = () => {
    axios.get("http://localhost:3001/customers")
      .then((response) => {
        setCustomers(response.data);
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
=======
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
>>>>>>> 6a78c25c4e033cb640631f8afcf37e167e08646d

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
      .catch(error => {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const handleRating = (transactionId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [transactionId]: rating,
    }));
    console.log(`Transaction ID: ${transactionId}, Rating: ${rating}`);
  };

  if (loading) {
    return <p>Loading transactions...</p>;
  }

  return (
    <Container>
      <div className="mb-5">
        <h1>Rate Transactions</h1>
        {transactions.length === 0 ? (
<<<<<<< HEAD
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
            <TableRow key={t.id}>
              <TableCell>{t.purchase_date}</TableCell>
              <TableCell>{t.description}</TableCell>
              <TableCell>{t.amount}</TableCell>
              <TableCell>
                <Slider
                  value={[]}
                  min={1}
                  max={5}
                  step={1}
                  onChange={(e, newValue) => setSatisfaction(newValue)}
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
                        <Star
                          key={star}
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
>>>>>>> 6a78c25c4e033cb640631f8afcf37e167e08646d
      </div>
    </Container>
  );
};

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
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.188c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.536 9.384c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 00.95-.69l1.286-3.957z"
    />
  </svg>
);

export default withAuthenticationRequired(TransactionsComponent, {
  onRedirecting: () => <Loading />,
});
