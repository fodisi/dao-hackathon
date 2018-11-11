import React, { Component } from 'react';
// import { Grid, Card, Icon, Modal, Button } from 'semantic-ui-react';
import Layout from './components/layout';
// import SecretEventOrg from './ethereum/SecretEventOrg';
// import Web3 from './utils/web3';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      daoContract: '',
      curAccount: ''

    }
  }
  // storeWeb3Account = () => {
    // Web3.eth.getAccounts((accounts) => {
    //   console.log("my accounts", accounts);
    //   // this.setState({
    //   //   curAccount: accounts[0]
    //   // })
    // });
  //   Web3.eth.getAccounts()
  //   .then((accounts) => {
  //     console.log(accounts)
  //     this.setState({
  //       curAccount: accounts[0]
  //     })
  //   })
  // };
  //
  // componentDidMount() {
  //   this.storeWeb3Account()
  // }

  render() {


    return (
      <div>
        <Layout />
      </div>
    );
  }
}

export default App;
