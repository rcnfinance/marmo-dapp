import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button, Col, ControlLabel } from 'react-bootstrap';

import AccountInfo from "../components/AccountInfo";
import TransactionData from "../components/TransactionData";
import { getAddressFromPrivateKey, buildIntentTx } from "../txbuilder";


/**
 * Transaction builder user interface.
 */
class Signer extends Component {

   // Define the state of the signing component
   state = {
    signer: "",
    dependencies: "",
    contractAddress: "",
    minGasLimit: "",
    maxGasPrice: "",
    expiration: "",
    salt: "",
    to: "",
    value: "",
    functionSignature: "",
    functionParameters: "",
    privateKey: "",
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
  sendTransaction = (state) => {

    let intent = buildIntentTx(state);
    console.log(intent);
    
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

        <FormGroup controlId="contractAddress">

          <Col componentClass={ControlLabel} sm={2}>
            Contract address (Marmo contract address) 
          </Col>

          <Col sm={10}>
            <FormControl type="text" value={this.state.contractAddress} onChange={this.onChange} />
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

        <Button bsStyle="primary" value={this.state} onClick={this.sendTransaction}>Send intent</Button>

        {this.state.rawTx && <TransactionData state={this.state} />}

      </Form>
    );
  }
}

export default Signer;
