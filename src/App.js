import React, { Component } from 'react';
import {Grid, Card, Icon, Modal, Button, Container} from 'semantic-ui-react';
import Layout from './components/layout';
import { AcceptDeclineContainer } from './components/AcceptDeclineContainer';
import config from './config';
import request from 'request';
import SecretEventOrg from './ethereum/SecretEventOrg';
import Web3 from 'web3';

class App extends Component{
  state = {
    eventName:'', describe: '', capacity:0, deposit:0, start_time:0, duration:0,
  }

  async componentDidMount(){

    var eventHash = await SecretEventOrg.methods.currentEventHash().call();
    let {eventName, describe, capacity, deposit, start_time, duration} = await SecretEventOrg.methods.getEventInfo(eventHash).call();
    this.setState({eventName, describe, capacity, deposit, start_time, duration});
  }

  renderEvent(){
    /*
    let parsedBody;
    let req = config.LINNIA_SEARCH_URI + "/records";
    req = req + '?owner=0x8b8ba03ed61ad1cb0e9befd0d02ecb444834887d';

    request(req, (error, response, body) => {
      if (error) {
        console.error(error.stack);
      }

      parsedBody = JSON.parse(body);
      console.log(parsedBody);
    });
    */
    return (
        <Card>
          <Card.Header>Name: {this.state.eventName}</Card.Header>
          <Card.Meta>Capacity: {this.state.capacity}</Card.Meta>
          <Card.Description>Min Deposit: {Web3.utils.fromWei(this.state.deposit.toString(),'ether')} ether</Card.Description>
        </Card>
    );
  }

  render() {
    return (
      <Layout>
          <h1>Inner Circle</h1>
          <Grid stackable reversed="mobile">
            <Grid.Column width={12}>
              {this.renderEvent()}
            </Grid.Column>
            <Grid.Column width={4}>
              <Grid.Row>
                <Modal size='small'
                  trigger={
                    <Button icon labelPosition='left' className="primary" floated="right">
                      <Icon name='add' />
                      Pending Referral
                    </Button>
                  }>
                  <Modal.Header>Accept/Decline Referral</Modal.Header>
                  <Modal.Content>
                    <AcceptDeclineContainer />
                  </Modal.Content>
                </Modal>
              </Grid.Row>
            </Grid.Column>
          </Grid>
      </Layout>
    );
  }
}

export default App;
