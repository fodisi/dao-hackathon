import React, { Component } from 'react';
import { Form, Button, Message, Card } from 'semantic-ui-react';
import Linnia from '@linniaprotocol/linnia-js';
import Web3 from 'web3';
import IPFS from 'ipfs-mini';
import config from '../config';
import SecretEventOrg from '../ethereum/SecretEventOrg';
import { decrypt } from './crypto-utils';

const hubAddress = config.LINNIA_HUB_ADDRESS;
const protocol = config.LINNIA_IPFS_PROTOCOL;
const port = config.LINNIA_IPFS_PORT;
const host = config.LINNIA_IPFS_HOST;

const web3 = new Web3(window.web3.currentProvider);
const ipfs = new IPFS({ host: host, port: port, protocol: protocol });
const linnia = new Linnia(web3, ipfs, { hubAddress });


export default class FullDeail extends Component {
	state = {
		errorMessage: '',
		loading: false,
		msg: '',
		linnia_pk:'',
		detail:'',
		location:'',
		decrypted:'',
		eventHash:'',
	}

	async componentDidMount(){
		var eventHash = await SecretEventOrg.methods.currentEventHash().call();
		this.setState({eventHash});
	    let {location, detail} = await SecretEventOrg.methods.getSecretEventInfo(eventHash).call();
	    this.setState({location, detail});
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		const userAddr = await web3.eth.getAccounts();
		console.log(userAddr[0]);
		let p = await linnia.getPermission(this.state.eventHash,userAddr[0]);
		console.log("p", p);

		if(p && p.canAccess){
			const privateKey = this.state.linnia_pk;
			const ipfsLink = p.dataUri;
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
						console.log('ipfsDownload.got decrypted data', decrypted);
						
						this.setState({decrypted});
					} catch (e) {
						console.log('ipfsDownload.decryption failed', e);
						//return (alert('Error decrypting data. Probably wrong private key'));
					}
				}
			})
		}

	}

	render() {
		return (
			<div>
				<Card>
					<Card.Content>
						<Card.Header>Secret Details</Card.Header>
	          			<Card.Meta>Location: {this.state.location}</Card.Meta>
	          			<Card.Description>Detail: {this.state.detail}</Card.Description>
	          		</Card.Content>
				</Card>
				<Form onSubmit={this.handleSubmit} error={!!this.state.errorMessage}>
					<Form.Field>
						<label htmlFor='linnia_pk'>Linnia Private Key</label>
						<input type='text' onChange={event => this.setState({ linnia_pk: event.target.value })} value={this.state.linnia_pk} />
					</Form.Field>
					<Message error header="Oops!" content={this.state.errorMessage} />
					<Button basic primary type='submit' loading={this.state.loading} disabled={this.state.loading}>Decrypt</Button>
					{this.state.msg}
				</Form>
				{ this.state.decrypted && <div>hi{this.state.decrypted}</div> }
			</div>
		);
	}
}
