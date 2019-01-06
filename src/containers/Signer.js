import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button, Col, ControlLabel } from 'react-bootstrap';

import AccountInfo from "../components/AccountInfo";
import Stringify from 'react-stringify'
import { getAddressFromPrivateKey, buildIntentTx } from "../txbuilder";


/**
 * Transaction builder user interface.
 */
class Signer extends Component {

   // Define the state of the signing component
   state = {
    signer: "",
    dependencies: "",
    minGasLimit: "",
    maxGasPrice: "",
    expiration: "",
    salt: "",
    tokenContractAddress: "",
    value: "",
    functionSignature: "",
    functionParameters: "",
    privateKey: "",
    intent: ""
  };
  /* FOR TEST
  state = {
    signer: "",
    dependencies: "0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e,0x6b67aac6eda8798297b1591da36a215bfbe1fed666c4676faf5a214d54e9e928",
    minGasLimit: "999999",
    maxGasPrice: "300000",
    expiration: "15",
    salt: "1",
    tokenContractAddress: "0x2f45b6fb2f28a73f110400386da31044b2e953d4",
    value: "0",
    functionSignature: "balanceOf(string)",
    functionParameters: "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB",
    privateKey: "0x512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a",
    intent: ""
  };
  */

  // Refresh signer data when the app is loaded
  componentDidMount() {
    this.updateAddressData();
  }

  setAddressData = (signer) => {
    this.setState({
      signer
    })
  }

  // Handle Send transaction button
  sendTransaction = () => {

  }

  // Handle Build transaction button
  buildTransaction = () => {
    this.intent = buildIntentTx(this.state);
    this.updateIntentData(this.intent);
  }

  setIntentData = (value) => {
    let intent = JSON.stringify(value);
    this.setState({
      intent
    })
  }

  updateIntentData = (intent) => {
    this.setIntentData(intent);
  }

  // Handle text changes in input fields
  onChange = (event) => {

    let name = event.target.id;
    let value = event.target.value;

    // Update state
    // state[name] = value;
    this.setState({
      [name]: value
    });
    console.log("Updated", name, value);

    // Store to survive refresh
    // window.localStorage.setItem(name, value);
  }

  updateAddressData = (privateKey) => {

    if (privateKey === undefined) {
      return;
    }

    let signer = getAddressFromPrivateKey(privateKey);
    console.log("Address for private key", privateKey, "is", this.state.signer);

    if(!signer) {
      this.setAddressData("0x");
      return;
    } 
    this.setAddressData(signer);
  }

  // Handle private kery edit
  onPrivateKeyChange = (event) => {
    this.onChange(event);
    this.updateAddressData(event.target.value);
  }

  render() {

    return (
      <Form horizontal>

        <h1>Build an intent transaction</h1>

        <AccountInfo signer={this.state.signer} />

        <FormGroup controlId="dependencies">

          <Col componentClass={ControlLabel} sm={2}>
            Dependencies
          </Col>

          <Col sm={10}>
            <FormControl type="text" value={this.state.dependencies} onChange={this.onChange} />
            <p className="text-muted">Comma separated list</p>
          </Col>

        </FormGroup>

        <FormGroup controlId="privateKey">

          <Col componentClass={ControlLabel} sm={2}>
            Private key
          </Col>

          <Col sm={10}>
            <FormControl id="privateKey" type="text" value={this.state.privateKey} onChange={this.onPrivateKeyChange} />

            <p className="text-muted">
              Derived from a passphrase using sha3() function.
            </p>
          </Col>

        </FormGroup>

        <FormGroup controlId="minGasLimit">

          <Col componentClass={ControlLabel} sm={2}>
            Min gas limit (Optional) 
          </Col>

          <Col sm={10}>
            <FormControl type="text" value={this.state.minGasLimit} onChange={this.onChange} />
          </Col>

        </FormGroup>

        <FormGroup controlId="maxGasPrice">

          <Col componentClass={ControlLabel} sm={2}>
            Max gas price (Optional) 
          </Col>

          <Col sm={10}>
            <FormControl type="text" value={this.state.maxGasPrice} onChange={this.onChange} />
          </Col>

        </FormGroup>

        <FormGroup controlId="expiration">

          <Col componentClass={ControlLabel} sm={2}>
            Expiration (days)
          </Col>

          <Col sm={10}>
            <FormControl type="text" value={this.state.expiration} onChange={this.onChange} />
          </Col>

        </FormGroup>

        <FormGroup controlId="salt">

          <Col componentClass={ControlLabel} sm={2}>
            Salt
          </Col>

          <Col sm={10}>
            <FormControl type="text" value={this.state.salt} onChange={this.onChange} />
          </Col>

        </FormGroup>

        <FormGroup controlId="tokenContractAddress">

          <Col componentClass={ControlLabel} sm={2}>
          Token Contract Address
          </Col>

          <Col sm={10}>
            <FormControl type="text" value={this.state.tokenContractAddress} onChange={this.onChange} />
          </Col>

        </FormGroup>

        <FormGroup controlId="value">

          <Col componentClass={ControlLabel} sm={2}>
            Value
          </Col>

          <Col sm={10}>
            <FormControl type="text" value={this.state.value} onChange={this.onChange} />
          </Col>

        </FormGroup>

        <FormGroup controlId="functionSignature">

          <Col componentClass={ControlLabel} sm={2}>
            Function signature
          </Col>

          <Col sm={10}>
            <FormControl type="text" value={this.state.functionSignature} onChange={this.onChange} />
          </Col>

        </FormGroup>

        <FormGroup controlId="functionParameters">

          <Col componentClass={ControlLabel} sm={2}>
            Function parameters
          </Col>

          <Col sm={10}>
            <FormControl type="text" value={this.state.functionParameters} onChange={this.onChange} />
            <p className="text-muted">Comma separated list</p>
          </Col>

        </FormGroup>

        <Button bsStyle="primary" onClick={this.buildTransaction}>Build Intent</Button>

        <div>
        <hr />

        <h3>Transaction data</h3>

        <FormGroup controlId="rawTx">

          <Col componentClass={ControlLabel} sm={2}>
            Raw transaction
          </Col>
          <Stringify value={this.intent} space=" " />

        </FormGroup>

        <Button bsStyle="primary" onClick={this.sendTransaction}>Send Intent</Button>
        
      </div>

      </Form>
    );
  }
}

export default Signer;
