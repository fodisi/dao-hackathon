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
    event: '',
    description: '',
    owner_pk: '',
    errorMessage: '',
    loading: false,
    msg: '',
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const metadata = this.state.event;
    const data = {
      'Name': this.state.event,
      'Description': this.state.description
    };
    const ownerPublicKey = this.state.owner_pk;
    let encrypted, ipfsRecord;

    this.setState({ errorMessage: '', loading: true });

    try {
      encrypted = await encrypt(ownerPublicKey, JSON.stringify(data));
    } catch (err) {
      this.setState({ errorMessage: err.message });
      return
    }

    try {
      ipfsRecord = await new Promise((resolve, reject) => {
        ipfs.add(encrypted, (err, ipfsRed) => {
          err ? reject(err) : resolve(ipfsRed)
        })
      })
    } catch (err) {
      this.setState({ errorMessage: err.message });
      return
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
      this.setState({ errorMessage: err.message });
      return
    }

    this.setState({ loading: false });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label htmlFor='event'>{"Event Name"}</label>
          <input id='event' type='text' onChange={event => this.setState({ event: event.target.value })} value={this.state.event} />
        </Form.Field>
        <Form.TextArea value={this.state.description} label="Event Description" onChange={description => this.setState({ description: description.target.value })} />
        <Form.Field>
          <label htmlFor='public_key'>Your Public Key</label>
          <input id='public_key' type='text' value={this.state.owner_pk} onChange={owner_pk => this.setState({ owner_pk: owner_pk.target.value })} placeholder='Public Key' />
        </Form.Field>

        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button basic primary type='submit' loading={this.state.loading} disabled={this.state.loading}>Create Event</Button>
        {this.state.msg}
      </Form>
    );
  }
}
