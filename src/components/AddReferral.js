import config from '../config';
import Web3 from 'web3';
import IPFS from 'ipfs-mini';
import { encrypt } from './crypto-utils';
import Linnia from '@linniaprotocol/linnia-js';
import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { checkIfReferred, referMember } from '../actions/ReferralAction'


const hubAddress = config.LINNIA_HUB_ADDRESS;
const protocol = config.LINNIA_IPFS_PROTOCOL;
const port = config.LINNIA_IPFS_PORT;
const host = config.LINNIA_IPFS_HOST;
const gasPrice = 20;
const gas = 500000;


const web3 = new Web3(window.web3.currentProvider);
const ipfs = new IPFS({ host: host, port: port, protocol: protocol });
const linnia = new Linnia(web3, ipfs, { hubAddress });

export class AddReferral extends Component {
    state = {
        linnia_pk: '',
        eth_pk: '',
        errorMessage: '',
        loading: false,
        msg: '',
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const linnia_user = this.state.linnia_pk;
        const eth_wallet = this.state.eth_pk;
        // const metadata = this.state.event;
        // const data = {
        //     'Name': this.state.event,
        //     'Description': this.state.description
        // };
        // const ownerPublicKey = this.state.owner_pk;
        // let encrypted, ipfsRecord;
        let memberReferred;

        this.setState({ errorMessage: '', loading: true });

        try {
            memberReferred = await referMember(eth_wallet, linnia_user);
        } catch (err) {
            this.setState({ errorMessage: err.message });
            return
        }

        // try {
        //     encrypted = await encrypt(ownerPublicKey, JSON.stringify(data));
        // } catch (err) {
        //     this.setState({ errorMessage: err.message });
        //     return
        // }

        // try {
        //     ipfsRecord = await new Promise((resolve, reject) => {
        //         ipfs.add(encrypted, (err, ipfsRed) => {
        //             err ? reject(err) : resolve(ipfsRed)
        //         })
        //     })
        // } catch (err) {
        //     this.setState({ errorMessage: err.message });
        //     return
        // }

        // const dataUri = ipfsRecord;
        // const [owner] = await web3.eth.getAccounts();
        // const dataHash = await linnia.web3.utils.sha3(dataUri);
        // console.log(dataHash);

        // try {
        //     const { records } = await linnia.getContractInstances();
        //     await records.addRecord(dataHash, metadata, dataUri, { from: owner, gasPrice, gas });

        //     this.setState({ msg: <Message positive header="Success!" content={"Event Created Successfully!"} /> });
        // } catch (err) {
        //     this.setState({ errorMessage: err.message });
        //     return
        // }

        this.setState({ loading: false });
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label htmlFor='linnia_pk'>Your Linnia Public Key</label>
                    <input id='linnia_pk' type='text' onChange={event => this.setState({ linnia_pk: event.target.value })} value={this.state.linnia_pk} />
                </Form.Field>
                <Form.Field>
                    <label htmlFor='eth_pk'>Your Ethereum Wallet Public Key</label>
                    <input id='eth_pk' type='text' value={this.state.eth_pk} onChange={event => this.setState({ eth_pk: event.target.value })} placeholder='Public Key' />
                </Form.Field>

                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button basic primary type='submit' loading={this.state.loading} disabled={this.state.loading}>Refer friend</Button>
                {this.state.msg}
            </Form>
        );
    }
}
