import config from '../config';
import Web3 from 'web3';
import IPFS from 'ipfs-mini';
import { encrypt } from './crypto-utils';
import Linnia from '@linniaprotocol/linnia-js';
import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';


const hubAddress = config.LINNIA_HUB_ADDRESS;
const protocol = config.LINNIA_IPFS_PROTOCOL;
const port = config.LINNIA_IPFS_PORT;
const host = config.LINNIA_IPFS_HOST;
const gasPrice = 20;
const gas = 500000;

const web3 = new Web3(window.web3.currentProvider);
const ipfs = new IPFS({ host: host, port: port, protocol: protocol });
const linnia = new Linnia(web3, ipfs, { hubAddress });

export class AddRecord extends Component {
  state = {
    eventName: '',
    description: '',
    eventAddress: '',
    owner_pk: '',
    errorMessage: '',
    loading: false,
    msg: '',
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const metadata = this.state.eventName;
    const data = {
      'Name': this.state.eventName,
      'Description': this.state.description,
      'AddressLocation': this.state.eventAddress,
    };
    const ownerPublicKey = this.state.owner_pk;
    let encrypted, ipfsRecord;

    this.setState({ errorMessage: '', loading: true });

    try {
      encrypted = await encrypt(ownerPublicKey, JSON.stringify(data));
    } catch (err) {
      this.setState({ errorMessage: err.message, loading: false });
      return;
    }

    try {
      ipfsRecord = await new Promise((resolve, reject) => {
        ipfs.add(encrypted, (err, ipfsRed) => {
          err ? reject(err) : resolve(ipfsRed)
        })
      })
    } catch (err) {
      this.setState({ errorMessage: err.message, loading: false });
      return;
    }

    const dataUri = ipfsRecord;
    const [owner] = await web3.eth.getAccounts();
    const dataHash = await linnia.web3.utils.sha3(dataUri);
    console.log(dataHash);

    try {
      const { records } = await linnia.getContractInstances();
      await records.addRecord(dataHash, metadata, dataUri, { from: owner, gasPrice, gas });

      this.setState({ msg: <Message positive header="Success!" content={"Event Created Successfully!"} /> });
    } catch (err) {
      this.setState({ errorMessage: err.message, loading: false });
      return;
    }

    this.setState({ loading: false });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label htmlFor='event'>{"Event Name"}</label>
          <input id='eventName' type='text' onChange={event => this.setState({ eventName: event.target.value })} value={this.state.event} />
        </Form.Field>
        <Form.TextArea value={this.state.description} label="Event Description" onChange={event => this.setState({ description: event.target.value })} />
        <Form.Field>
          <label htmlFor='eventAddress'>{"Event Address"}</label>
          <input id='eventAddress' type='text' onChange={event => this.setState({ eventAddress: event.target.value })} value={this.state.eventAddress} />
        </Form.Field>
        <Form.Field>
          <label htmlFor='public_key'>Your Public Key</label>
          <input id='public_key' type='text' value={this.state.owner_pk} onChange={event => this.setState({ owner_pk: event.target.value })} placeholder='Public Key' />
        </Form.Field>

        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button basic primary type='submit' loading={this.state.loading} disabled={this.state.loading}>Create Event</Button>
        {this.state.msg}
      </Form>
    );
  }
}
