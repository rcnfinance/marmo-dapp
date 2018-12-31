import React from 'react';
import { FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';

const AccountInfo = ({ signer }) => {

    return (
      <div>
        <hr />

        <h3>Signer information</h3>

        <FormGroup controlId="signer">

          <Col componentClass={ControlLabel} sm={2}>
            Private key address
          </Col>

          <Col sm={10}>
            <FormControl type="text" value={ signer } disabled />

            <p className="text-muted">
              Address from the private key. &nbsp;
            </p>
          </Col>

        </FormGroup>

        <hr />
      </div>
    )
}

export default AccountInfo;