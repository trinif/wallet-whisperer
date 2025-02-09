import React from "react";
import { Container, Row, Col } from "reactstrap";

import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

export const ProfileComponent = () => {
  const { user } = useAuth0();
  /* const updateStatus = () => {
    fetch("/updateLookupTable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pending: "🟡 Pending", approved: "✅ Approved", new_status: "🌟 New Status" }),
    }).then((res) => res.json()).then(console.log);
  };
  updateStatus(); */

  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
        </Col>
      </Row>
      <Row>
        <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
      </Row>
    </Container>
  );
};

export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Loading />,
});
