import React, { Component } from 'react';
// import { Grid, Card, Icon, Modal, Button } from 'semantic-ui-react';
import Layout from './components/layout';
// import SecretEventOrg from './ethereum/SecretEventOrg';
// import Web3 from './utils/web3';
// import DAOInstance from './ethereum/DAOinstance';
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
  // storeWeb3Account = () => {
  //   Web3.eth.getAccounts()
  //   .then((accounts) => {
  //     console.log(accounts)
  //     this.setState({
  //       curAccount: accounts[0]
  //     })
  //     DAOInstance.methods
  //       .isRegistered(accounts[0])
  //       .call({ from: accounts[0] })
  //       .then(res => {
  //         console.log(res)
  //         if (res) {
  //           this.setState({
  //             isRegistered: true
  //           })
  //         } else {
  //           console.log('no user')
  //         }
  //       })
  //       .catch(error => {
  //         console.log(error)
  //
  //       })
  //   })
  // };
  handleChange = (e) => {
    this.setState({ name: e.target.value });
  }

  // handleRegister = (e) => {
  //   e.preventDefault();
  //   const { name } = this.state;
  //   DAOInstance.methods
  //     .createUser(name)
  //     .send({ from: this.state.curAccount })
  //     .then(res => {
  //       console.log(res)
  //       this.setState({isRegistered: true})
  //     })
  //     .catch(error => {
  //       console.log(error)
  //
  //     })
  //   console.log(name)
  // }

  // componentDidMount() {
  //   this.storeWeb3Account()
  // }

  render() {
    const { name } = this.state;

    const loginForm = (
      <div id="login">
        <div id="welcome-prompt">
          <h1 className="welcome">Welcome</h1>
          <h1 className="tothe">To The</h1>
          <h1 className="bushwick">Bushwick</h1>
          <h1 className="generator">Generator</h1>
          <h1 className="digital">Digital</h1>
          <h1 className="commune">Commune</h1>
        </div>
        <Form inline id="login-form">
            {/* <ControlLabel>Name</ControlLabel><br /> */}
            <FormControl
              type="text"
              value={name}
              name="name"
              placeholder="Enter name"
              id="input-name"
              onChange={this.handleChange}
            />
          <Button bsStyle="primary" onClick={this.handleRegister} id="register">Register</Button>
        </Form>
      </div>);

    return (
      <div>
        {/* {!this.state.isRegistered ? (loginForm): (<Layout/>)} */}
        {/* <Layout /> */}
        {loginForm}
      </div>
    );
  }
}

export default App;
