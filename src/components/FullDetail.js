import React, { Component } from 'react';
import { Form, Button, Message, Card } from 'semantic-ui-react';
import Linnia from '@linniaprotocol/linnia-js';
import Web3 from 'web3';
import IPFS from 'ipfs-mini';
import config from '../config';
import SecretEventOrg from '../ethereum/SecretEventOrg';

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
	}

	async componentDidMount(){
		var eventHash = await SecretEventOrg.methods.currentEventHash().call();
	    let {location, detail} = await SecretEventOrg.methods.getSecretEventInfo(eventHash).call();
	    this.setState({location, detail});
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		const userAddr = await web3.eth.getAccounts();
		console.log(userAddr[0]);
		let {canAccess, ipfsHash} = await linnia.getPermission("0x382299ce16150e3e1782a265d1c12f788fafc1947761eed4afd2bfa65618589a",userAddr[0]);
		console.log(canAccess, ipfsHash);
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
			</div>
		);
	}
}
