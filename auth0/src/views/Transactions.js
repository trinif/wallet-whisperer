import React, { useState } from "react";
import { Button, Alert } from "reactstrap";
import Highlight from "../components/Highlight";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { getConfig } from "../config";
import Loading from "../components/Loading";

export const TransactionsComponent = () => {

  return (
    <>
      <div className="mb-5">
        
        <h1>Rate Transactions</h1>
        <p className="lead">
          View past purchases
        </p>

        <p>
          Rahhhhhh
        </p>

      </div>
    </>
  );
};

export default withAuthenticationRequired(TransactionsComponent, {
  onRedirecting: () => <Loading />,
});
