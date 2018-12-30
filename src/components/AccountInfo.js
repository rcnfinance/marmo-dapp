import React from 'react';
import { FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';

const AccountInfo = ({ address }) => {

    return (
      <div>
        <hr />

        <h3>Account information</h3>

        <FormGroup controlId="address">

          <Col componentClass={ControlLabel} sm={2}>
            Private key address
          </Col>

          <Col sm={10}>
            <FormControl type="text" value={ address } disabled />

            <p className="text-muted">
              Address from the private key. &nbsp;
            </p>
          </Col>

        </FormGroup>

      </div>
    )
}

export default AccountInfo;