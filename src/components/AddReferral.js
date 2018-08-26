import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { referMember } from '../actions/ReferralAction'

export class AddReferral extends Component {
    state = {
        eth_pk: '',
        errorMessage: '',
        loading: false,
        msg: '',
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const eth_wallet = this.state.eth_pk;

        this.setState({ errorMessage: '', loading: true });
        let result;

        try {
            result = await referMember(eth_wallet);
            if (result) {
                this.setState({ msg: <Message positive header="Success!" content={"Friend referred successfully!"} /> });
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
