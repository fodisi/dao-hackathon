import React, { Component } from 'react';
// import { Grid, Card, Icon, Modal, Button } from 'semantic-ui-react';
import Layout from './components/layout';
// import SecretEventOrg from './ethereum/SecretEventOrg';
import Web3 from './utils/web3';
import DAOInstance from './ethereum/DAOinstance';
// import Signup from './components/Signup';
import { Grid, Row, Col, ControlLabel, Form, FormGroup, FormControl, Button } from 'react-bootstrap';


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
      console.log(accounts)
      this.setState({
        curAccount: accounts[0]
      })
      DAOInstance.methods
        .isRegistered(accounts[0])
        .call({ from: accounts[0] })
        .then(res => {
          console.log(res)
          if (res) {
            this.setState({
              isRegistered: true
            })
          } else {
            console.log('no user')
          }
        })
        .catch(error => {
          console.log(error)

        })
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
        console.log(res)
        this.setState({isRegistered: true})
      })
      .catch(error => {
        console.log(error)

      })
    console.log(name)
  }

  componentDidMount() {
    this.storeWeb3Account()
  }

  render() {
    const { name } = this.state;

    const loginForm = (
      <Form inline>
        <FormGroup >
          {" "}
          <br />
          <h1 className="text-center">Welcome Dapp</h1>

          <ControlLabel>
            Name
                    </ControlLabel><br />
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

      </Form>);

    return (
      <div>
        {!this.state.isRegistered ? (loginForm): (<Layout/>)}
      </div>
    );
  }
}

export default App;
