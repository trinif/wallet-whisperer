import React, { useEffect, useState } from "react";
import { Button, Alert } from "reactstrap";
import Highlight from "../components/Highlight";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { getConfig } from "../config";
import Loading from "../components/Loading";

export const TransactionsComponent = () => {
  const [mongoStatus, setMongoStatus] = useState("Connecting to MongoDB...");

  useEffect(() => {
    const pingMongo = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/ping");
        const data = await response.json();

        if (response.ok) {
          setMongoStatus(data.message);
        } else {
          setMongoStatus(`Error: ${data.message}`);
        }
      } catch (error) {
        setMongoStatus(`Error: ${error.message}`);
      }
    };

    pingMongo();
  }, []);

  return (
    <>
      <div className="mb-5">
        
        <h1>Rate Transactions</h1>
        <p className="lead">
          View past purchases
        </p>

        <p>
          {mongoStatus}
        </p>

      </div>
    </>
  );
};

export default withAuthenticationRequired(TransactionsComponent, {
  onRedirecting: () => <Loading />,
});
