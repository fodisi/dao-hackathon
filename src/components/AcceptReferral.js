import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { acceptReferral } from '../actions/ReferralAction';
import { getDefaultEthereumAccount } from '../actions/EthereumAccountAction';

export class AcceptReferral extends Component {
    state = {
        errorMessage: '',
        loading: false,
        msg: '',
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        let currentEthAddress;

        this.setState({ errorMessage: '', loading: true });
        try {
            currentEthAddress = await getDefaultEthereumAccount();
            await acceptReferral(currentEthAddress);
            this.setState({ msg: <Message positive header="Success!" content={"Referral accepted. '" + currentEthAddress + "' is now a member!"} /> })
        } catch (err) {
            this.setState({ errorMessage: err.message });
            return
        }

        this.setState({ loading: false });
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} error={!!this.state.errorMessage}>
                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button basic primary type='submit' loading={this.state.loading} disabled={this.state.loading}>Accept Referral</Button>
                {this.state.msg}
            </Form>
        );
    }
}
