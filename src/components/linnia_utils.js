import config from '../config';
import Web3 from 'web3';
import IPFS from 'ipfs-mini';
import Linnia from '@linniaprotocol/linnia-js';
import React, { Component } from 'react'

const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', async dispatch => {
      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof window.web3 !== 'undefined') {
        // Use Mist/MetaMask's provider.
        resolve(new Web3(window.web3.currentProvider));
      } else {
        reject(NO_METAMASK);
      }
    });
  });
};

let web3;

web3 = await getWeb3();
  
const ipfs = new IPFS({ host: host, port: port, protocol: protocol });

const linnia = new Linnia(web3, ipfs, { hubAddress });


createRecord(_metadata, _data, ownerPublicKey) {
try {
    encrypted = await encrypt(new Buffer(viewerPublicKey, 'hex'), _data)
  } catch (e) {
    console.error(e)
	return
  }

  try {
    ipfsRecord = await new Promise((resolve, reject) => {
      ipfs.add(encrypted, (err, ipfsRed) => {
        err ? reject(err) : resolve(ipfsRed)
      })
    })
  } catch (e) {
    console.error(e)
	return
  }

  const dataUri = viewerFile[0].hash
  const [owner] = await store.getState().auth.web3.eth.getAccounts()
  const datahash = await web3.util.soliditySha3(metadata, dataUri) 

  try {
    const { records } = await linnia.getContractInstances()
    await records.addRecord(dataHash, _metadata, dataUri, {
      from: owner,
      gasPrice,
      gas,
    })
  } catch (e) {
    console.error(e)
    return
  }
}


class AddRecord extends Component {

	constructor (props) {
    	super(props)
    	this.state = {
      		event: '',
      		description: '',
      		owner_pk:'',
    	}
	}

   handleSubmit = (event) => {
    event.preventDefault()
    const metadata = event.target.elements.event.value
    const data = event.target.elements.description.value
    const pk = event.target.elements.owner_pk.value
    createRecord(metadata, data, pk)
  }

  render () {
    return (
      <form className='pure-form pure-form-stacked' onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor='event'>Event Name</label>
          <input id='event' type='text' value={this.state.event} onChange={this.onInputChange('event')} placeholder='Event Name' />

          <br />

          <label htmlFor='description'>Event Description</label>
          <input id='description' type='text' value={this.state.description} onChange={this.onInputChange('description')} placeholder='Event Details' />

          

          <br />
          <label htmlFor='public_key'>Your Public Key</label>
          <input id='public_key' type='text' value={this.state.pk} onChange={this.onInputChange('public_key')} placeholder='Public Key' />

          

          <br />

          <button type='submit' className='pure-button pure-button-primary'>Create Event</button>
        </fieldset>
      </form>
      )
  }
}

export default AddRecord
