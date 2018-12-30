import React, { Component } from 'react';
import Signer from './containers/Signer';
import { Navbar, Grid, Row, Col } from 'react-bootstrap';
import "./App.css";
import "./bootstrap/css/bootstrap.css";
import logo from './images/logo.png';

class App extends Component {
  render() {
    return (

      <Grid>
        <Row>
          <Col md={12}>

              <header>
                <Navbar>
                  <Navbar.Header>
                    <Navbar.Brand>
                      <a href="https://marmo.network"><img className="logo" src={logo} /></a> Marmo Transaction 
                    </Navbar.Brand>
                  </Navbar.Header>
                </Navbar>
              </header>

           </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Signer />
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <footer>
              <hr />
              <p className="text-center text-muted">
                <a href="https://marmo.network">Copyright 2018 Marmo.</a>
              </p>
            </footer>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
