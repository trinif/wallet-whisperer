import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Hero from "../components/Hero";
import Content from "../components/Content";

export const Home = () => {
  const { user } = useAuth0();

  const updateStatus = () => {
  fetch(`http://localhost:3002/updateLookupTable`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userid: user, accountid: "67a7830c9683f20dd518bbd8"}),
  }).then(res => console.log(res));
};

  updateStatus();
  return (<Fragment>
    <Hero />
    <hr />
    <Content />
  </Fragment>
);}

export default Home;
