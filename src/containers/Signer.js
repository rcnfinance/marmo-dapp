import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button, Col, ControlLabel } from 'react-bootstrap';

import AccountInfo from "../components/AccountInfo";
import Stringify from 'react-stringify'
import { getAddressFromPrivateKey, buildIntentTx, signIntentTx } from "../txbuilder";
import { RelayClient } from "marmojs"


/**
 * Transaction builder user interface.
 */
class Signer extends Component {

   // Define the state of the signing component
  
   /* FOR TEST
   state = {
    signer: "",
    dependencies: "",
    maxGasLimit: "",
    maxGasPrice: "",
    expiration: "",
    salt: "",
    to: "",
    value: "",
    functionSignature: "",
    functionParameters: "",
    privateKey: "",
    signedIntent: undefined,
    intent: undefined,
    url: ""
  };*/
  
  state = {
    signer: "0x9d7713f5048c270d7c1dBe65F44644F4eA47f774",
    dependencies: "",
    maxGasLimit: "1",
    maxGasPrice: "9999999",
    expiration: "1578423013",
    salt: "0x0000000000000000000000000000000000000000000000000000000000000000",
    to: "0x2f45b6fb2f28a73f110400386da31044b2e953d4",
    value: "0",
    functionSignature: "transfer(address,uint)",
    functionParameters: "0x9d7713f5048c270d7c1dBe65F44644F4eA47f774, 0",
    privateKey: "0x512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a",
    signedIntent: undefined,
    intent: undefined,
    url: "http://ec2-3-16-29-215.us-east-2.compute.amazonaws.com/relay"
  };


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
    console.log(this.state.url);
    let client = new RelayClient(this.state.url);
    client.post(this.state.signedIntent);
  }

  // Handle Build transaction button
  buildTransaction = () => {
    let intent = buildIntentTx(this.state);
    let signedIntent = signIntentTx(intent, this.state.privateKey);
    console.log(signedIntent);
    this.setIntentData(intent, signedIntent);
  }

  setIntentData = (intent, signedIntent) => {
    this.setState({
      signedIntent,
      intent
    })
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

  }

  updateAddressData = (privateKey) => {

    if (privateKey === undefined || privateKey.length !== 66 /* PRIVATEKEY_SIZE */) {
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

        <FormGroup controlId="maxGasLimit">

          <Col componentClass={ControlLabel} sm={2}>
            Min gas limit (Optional) 
          </Col>

          <Col sm={10}>
            <FormControl type="text" value={this.state.maxGasLimit} onChange={this.onChange} />
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

        <FormGroup controlId="to">

          <Col componentClass={ControlLabel} sm={2}>
          To
          </Col>

          <Col sm={10}>
            <FormControl type="text" value={this.state.to} onChange={this.onChange} />
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
          <Stringify value={this.state.intent} space=" " />

        </FormGroup>
        
        <hr />

        <FormGroup controlId="url">

          <Col componentClass={ControlLabel} sm={2}>
            URL relayer
          </Col>

          <Col sm={10}>
            <FormControl type="text" value={this.state.url} onChange={this.onChange} />
          </Col>

          </FormGroup>

        <Button bsStyle="primary" onClick={this.sendTransaction}>Send Intent</Button>
        
      </div>

      </Form>
    );
  }
}

export default Signer;
