import React, { useEffect, useState } from "react";
import { Button, Alert } from "reactstrap";
import Highlight from "../components/Highlight";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { getConfig } from "../config";
import Loading from "../components/Loading";
import axios from 'axios';
<<<<<<< Updated upstream
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Slider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
=======
import { Slider, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
>>>>>>> Stashed changes

export const TransactionsComponent = () => {

  // const api_url = 
  const [customers, setCustomers] = useState([]); // State to hold customer data
  const [loading, setLoading] = useState(true); 

  const [transactions, setTransactions] = useState([]);
<<<<<<< Updated upstream

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
  const [loading, setLoading] = useState(true);
>>>>>>> Stashed changes

  const [rowState, setRowStates] = useState({});

  const getTransactions = () => {
    fetch(`http://api.nessieisreal.com/accounts/67a7bb309683f20dd518bcae/purchases?key=1791db7671050f930946a58ec2de3ed2`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(res => res.json())
      .then(resJson => {
        const transWithId = resJson.map((t) => ({ id: t.id, ...t }));
        setTransactions(transWithId);
      })
      .then(setLoading(false))
  }

  useEffect(() => {
    console.log("Loading customers...");
    getTransactions();
    //loadCustomers(); // Load customers when the component mounts
  }, []);

<<<<<<< Updated upstream
=======
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

>>>>>>> Stashed changes
  if (loading) {
    return <p>Loading customers...</p>;
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
                  <TableRow key={t._id}>
                    <TableCell>{t.purchase_date}</TableCell>
                    <TableCell>{t.description}</TableCell>
                    <TableCell>${t.amount}</TableCell>
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
>>>>>>> Stashed changes
      </div>
    </Container>
  );
};

export default withAuthenticationRequired(TransactionsComponent, {
  onRedirecting: () => <Loading />,
});
