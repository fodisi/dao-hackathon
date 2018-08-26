import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { acceptReferral } from '../actions/ReferralAction';
import { getDefaultEthereumAccount } from '../actions/EthereumAccountAction';

export class AcceptReferral extends Component {
    state = {
        linnia_pk: '',
        errorMessage: '',
        loading: false,
        msg: '',
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        let currentEthAddress;

        this.setState({ errorMessage: '', loading: true });
        try {
            const memberAddress = await acceptReferral(this.state.linnia_pk);
            if (memberAddress) {
                this.setState({ msg: <Message positive header="Success!" content={"Referral accepted. '" + memberAddress + "' is now a member!"} /> })
            }
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
                    <label htmlFor='linnia_pk'>Linnia User Public Key</label>
                    <input id='linnia_pk' type='text' onChange={event => this.setState({ linnia_pk: event.target.value })} value={this.state.linnia_pk} />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button basic primary type='submit' loading={this.state.loading} disabled={this.state.loading}>Accept Referral</Button>
                {this.state.msg}
            </Form>
        );
    }
}
