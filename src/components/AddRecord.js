import config from '../config';
import Web3 from 'web3';
import IPFS from 'ipfs-mini';
import { encrypt } from './crypto-utils';
import Linnia from '@linniaprotocol/linnia-js';
import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import  moment  from 'moment';

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
    descript: '',
    location:'',
    deposit: 0,
    start_time:'',
    duration:0,
    owner_pk:'',
    details:'',
    members:[{
      'Address': '0x640306C5558074cd1340Af67C6B69671262E7D05',
      'PublicKey':'0x3cf47306fc3ef417a1a7562beff912c92cadfa06a2d894ea1d1804910c792e3d190999fdf863a49d985486b5e5530fb2297d351834712d624d1a270f8dd62401'
    }],
    errorMessage: '',
    loading: false,
    msg: '',
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const metadata = this.state.eventName;
    const data = {
      'Name': this.state.eventName,
      'Descript': this.state.descript,
      'Deposit' : this.state.deposit,
      'Start Time' : this.state.start_time,
      'Duration' : this.state.duration,
      'Location' : this.state.location,
      'Details'  : this.state.details
    };
    const ownerPublicKey = this.state.owner_pk;
    let encrypted, ipfsRecord;
    console.log(this.state.start_time);
    const unix_start_time = moment(this.state.start_time).unix();
    console.log(unix_start_time);
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

    //add permissions
    this.state.members.map(async (member) => {
          try {
          encrypted = await encrypt(member.PublicKey, JSON.stringify(data));
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
        try {
          const { permissions } = await linnia.getContractInstances();
          await permissions.grantAccess(dataHash, member.Address, dataUri, { from: owner, gasPrice, gas });

          this.setState({ msg: <Message positive header="Success!" content={"Invites Created Successfully!"} /> });
        } catch (err) {
          this.setState({ errorMessage: err.message, loading: false });
          return;
        }

    });

    this.setState({ loading: false });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label htmlFor='event'>{"Event Name"}</label>
          <input id='eventName' type='text' onChange={event => this.setState({ eventName: event.target.value })} value={this.state.event} />
        </Form.Field>
        <Form.TextArea value={this.state.descript} label="Event Brief" onChange={descript => this.setState({ descript: descript.target.value })} />
        <Form.Field>
          <label htmlFor='deposit'>{"Fee"}</label>
          <input id='deposit' type='number' onChange={event => this.setState({ deposit: event.target.value })} value={this.state.deposit} />
        </Form.Field>
        <Form.Field>
          <label htmlFor='starttime'>{"Event Time"}</label>
          <input id='starttime' type='datetime-local' onChange={event => this.setState({ start_time: event.target.value })} value={this.state.start_time} />
        </Form.Field>
        <Form.Field>
          <label htmlFor='event'>{"Event Duration"}</label>
          <input id='duration' type='number' onChange={event => this.setState({ duration: event.target.value })} value={this.state.duration} />
        </Form.Field>
        <Form.Field>
          <label htmlFor='location'>{"Location"}</label>
          <input id='location' type='text' onChange={event => this.setState({ location: event.target.value })} value={this.state.location} />
        </Form.Field>
        <Form.TextArea value={this.state.details} label="Event Details" onChange={details => this.setState({ details: details.target.value })} />
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