import React, { Component } from 'react';
import Layout from './components/layout';
import Web3 from './utils/web3';
import DAOInstance from './ethereum/DAOinstance';
import { ControlLabel, Form, FormGroup, FormControl, Button } from 'react-bootstrap';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      daoContract: '',
      curAccount: '',
      isRegistered: false,
      name: ""
    }
  }

  storeWeb3Account = () => {
    Web3.eth.getAccounts()
      .then((accounts) => {
        console.log(accounts);
        if (accounts.length > 0) {
          this.setState(
            { curAccount: accounts[0] },
            () => {
              DAOInstance.methods
                .isRegistered(accounts[0])
                .call({ from: accounts[0] })
                .then(res => {
                  console.log(res);
                  if (res) {
                    this.setState({ isRegistered: true })
                  } else {
                    console.log('no user');
                  }
                })
                .catch(error => {
                  console.log(error);
                })
            },
          );
        }
      })
  };

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  }

  handleRegister = (e) => {
    e.preventDefault();
    const { name } = this.state;
    DAOInstance.methods
      .createUser(name)
      .send({ from: this.state.curAccount })
      .then(res => {
        console.log(res);
        this.setState({ isRegistered: true })
      })
      .catch(error => {
        console.log(error);

      })
    console.log(name);
  }

  componentDidMount() {
    this.storeWeb3Account();
  }

  render() {
    const { name } = this.state;

    const loginForm = (
      <Form inline id="login">
        <FormGroup >
          {" "}
          <br />
          <h1 className="text-center">Gen Community</h1>
          <ControlLabel>
            Name
          </ControlLabel>
          <br />
          <p></p>
          <FormControl
            type="text"
            value={name}
            name="name"
            placeholder="Enter name"
            onChange={this.handleChange}
          />
        </FormGroup>
        <br />
        <br />
        <Button bsStyle="primary" onClick={this.handleRegister}>
          register
        </Button>
      </Form>
    );

    if (!this.state.curAccount) {
      return (
        <div>
          <h1> Please, sign in Metamask and refresh the page to continue.</h1>
        </div>
      );
    }

    return (
      <div>
        {!this.state.isRegistered ? (loginForm) : (<Layout />)}
      </div>
    );
  }
}

export default App;
