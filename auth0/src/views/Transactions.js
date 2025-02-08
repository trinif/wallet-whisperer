import React, { useEffect, useState } from "react";
import { Button, Alert } from "reactstrap";
import Highlight from "../components/Highlight";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { getConfig } from "../config";
import Loading from "../components/Loading";
import axios from 'axios';

export const TransactionsComponent = () => {

  const [customers, setCustomers] = useState([]); // State to hold customer data
  const [loading, setLoading] = useState(true); 
  
  
  const loadCustomers = () => {
    axios.get("http://localhost:3000/customers")
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

  useEffect(() => {
    console.log("Loading customers...");
    loadCustomers(); // Load customers when the component mounts
  }, []);

  if (loading) {
    return <p>Loading customers...</p>;
  }

  return (
    <>
      <div className="mb-5">
        
        <h1>Rate Transactions</h1>
        {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <ul>
          {customers.map((customer, index) => (
            <li key={index}>
              {customer.name} - {customer.email}
            </li>
          ))}
        </ul>
      )}
      </div>
    </>
  );
};

export default withAuthenticationRequired(TransactionsComponent, {
  onRedirecting: () => <Loading />,
});
