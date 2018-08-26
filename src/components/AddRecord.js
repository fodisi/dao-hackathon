import config from '../config';
import Web3 from 'web3';
import IPFS from 'ipfs-mini';
import { encrypt } from './crypto-utils';
import Linnia from '@linniaprotocol/linnia-js';
import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import  moment  from 'moment';
import EthCrypto from 'eth-crypto';

const hubAddress = config.LINNIA_HUB_ADDRESS;
const protocol = config.LINNIA_IPFS_PROTOCOL;
const port = config.LINNIA_IPFS_PORT;
const host = config.LINNIA_IPFS_HOST;
const gasPrice = 20;
const gas = 500000;

const web3 = new Web3(window.web3.currentProvider);
const ipfs = new IPFS({ host: host, port: port, protocol: protocol });
const linnia = new Linnia(web3, ipfs, { hubAddress });

export const decrypt = async (privKey, encrypted) => {

  /*
    This function does the opposite of the above function. It takes a private
    key, marshalls it into a form that the library supports, then uses it to decrypt
    the provided data. It parses the decrypted data and returns it as a POJO.
  */

  const hexPrivKeyString = privKey.toString('hex');
  const hexPrivKey = hexPrivKeyString.substr(0, 2) === '0x' ? hexPrivKeyString : `0x${hexPrivKeyString}`;

  const encryptedObject = EthCrypto.cipher.parse(encrypted);
  const decrypted = await EthCrypto.decryptWithPrivateKey(
    hexPrivKey,
    encryptedObject,
  );
  const decryptedPayload = JSON.parse(decrypted);
  return decryptedPayload.message;
};

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
    errorMessage: '',
    loading: false,
    msg: '',
  }

  ipfsDownload = async (event) => {
    event.preventDefault();
    console.log('ipfsDownload')

    const privateKey = '0x121b67e4e478e155425b9b55e7f21e3321e813b6a4feb15b5fcbc5e8a299e80b'
    const ipfsLink = 'QmSBtmouWHKLbXd1B69LH7cv6ksKwUGv3PQsiiapjkeWHq'

    // Use ipfs library to pull the encrypted data down from IPFS
    ipfs.cat(ipfsLink, async (err, ipfsRes) => {
      if (err) {
        console.log('ipfsDownload.error', err);
      } else {
        const encrypted = ipfsRes;

        console.log('ipfsDownload.got encrypted data', encrypted);
        // Try to decrypt with the provided key
        try {
          const decrypted = await decrypt(privateKey, encrypted);
          // cosnt decrypted = JSON.stringify(decrypted.toString());
          console.log('ipfsDownload.got decrypted data', decrypted);
          //dispatch(assignRecord(record));
        } catch (e) {
          console.log('ipfsDownload.decryption failed', e);
          //return (alert('Error decrypting data. Probably wrong private key'));
        }
      }
    });

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

    this.setState({ loading: false });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} error={!!this.state.errorMessage}>

      <Form.Field>
        <button onClick={this.ipfsDownload} />
      </Form.Field>

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
