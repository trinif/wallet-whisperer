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
  const [loading, setLoading] = useState(true);

  const [rowState, setRowStates] = useState({});

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
      </div>
    </Container>
  );
};

export default withAuthenticationRequired(TransactionsComponent, {
  onRedirecting: () => <Loading />,
});
