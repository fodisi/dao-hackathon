import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { declineReferral } from '../actions/ReferralAction';
import { getDefaultEthereumAccount } from '../actions/EthereumAccountAction';

export class DeclineReferral extends Component {
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
            await declineReferral(currentEthAddress);
            this.setState({ msg: <Message positive header="Success!" content={"Referral declined for user '" + currentEthAddress + "'."} /> })
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
                <Button basic primary type='submit' loading={this.state.loading} disabled={this.state.loading}>Decline Referral</Button>
                {this.state.msg}
            </Form>
        );
    }
}
