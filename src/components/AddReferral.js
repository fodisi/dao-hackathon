import config from '../config';
import Web3 from 'web3';
import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { referMember } from '../actions/ReferralAction'

const web3 = new Web3(window.web3.currentProvider);

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
        let memberReferred;

        this.setState({ errorMessage: '', loading: true });

        try {
            memberReferred = await referMember(eth_wallet, linnia_user);
            this.setState({ msg: <Message positive header="Success!" content={"Friend referred successfully!"} /> })
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
                    <label htmlFor='linnia_pk'>Linnia Public Key</label>
                    <input id='linnia_pk' type='text' onChange={event => this.setState({ linnia_pk: event.target.value })} value={this.state.linnia_pk} />
                </Form.Field>
                <Form.Field>
                    <label htmlFor='eth_pk'>Ethereum Wallet Public Key</label>
                    <input id='eth_pk' type='text' value={this.state.eth_pk} onChange={event => this.setState({ eth_pk: event.target.value })} placeholder='Public Key' />
                </Form.Field>

                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button basic primary type='submit' loading={this.state.loading} disabled={this.state.loading}>Refer friend</Button>
                {this.state.msg}
            </Form>
        );
    }
}
