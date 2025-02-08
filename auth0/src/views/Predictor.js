import React, { useState } from "react";
import { Button, Alert } from "reactstrap";
import Highlight from "../components/Highlight";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { getConfig } from "../config";
import Loading from "../components/Loading";

export const PredictorComponent = () => {

  return (
    <>
      <div className="mb-5">
        
        <h1>Regret Predictor</h1>
        <p className="lead">
          Type your purchase in
        </p>

        <p>
          Predict your L
        </p>

      </div>
    </>
  );
};

export default withAuthenticationRequired(PredictorComponent, {
  onRedirecting: () => <Loading />,
});
