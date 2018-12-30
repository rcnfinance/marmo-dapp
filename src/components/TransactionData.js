/**
 * Show the built transaction info.
 */

import React from 'react';
import { FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';


function TransactionData({ state }) {

  const sendInfo = state.sendStatus || state.sendError;

  return (
    <div>
      <hr />

      <h3>Transaction data</h3>

      <FormGroup controlId="rawTx">

        <Col componentClass={ControlLabel} sm={2}>
          Raw transaction
        </Col>

        <Col sm={10}>
          <FormControl componentClass="textarea" value={state.rawTx} disabled />
        </Col>

      </FormGroup>

      {sendInfo &&
        <FormGroup controlId="rawTx">

          <Col componentClass={ControlLabel} sm={2}>
            Send status
          </Col>

          <Col sm={10}>
            {state.sendStatus && <div><i className="fa fa-spin fa-spinner" /> Sending</div>}
            {state.sendError && <div className="text-danger">Transaction error: {state.sendError}</div>}
          </Col>

        </FormGroup>
      }
    </div>
  )
}

export default TransactionData;