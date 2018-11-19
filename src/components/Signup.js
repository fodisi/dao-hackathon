import React, { Component } from 'react';
import { ControlLabel, Form, FormGroup, FormControl, Button } from 'react-bootstrap';

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ""
        }
    }

    handleChange = (e) => {
        this.setState({ name: e.target.value });
    }

    handleRegister = (e) => {
        e.preventDefault();
        const { name } = this.state;
        DAOInstance.methods
            .createUser(name)
            .send({ from: accounts[0] })
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            })
        console.log(name);
    }

    render() {
        const { name } = this.state;
        const loginForm = (
            <Form inline>
                <FormGroup >
                    {" "}
                    <br />
                    <h1 className="text-center">Welcome Dapp</h1>
                    <ControlLabel>
                        Name
                    </ControlLabel>
                    <br />
                    <FormControl
                        type="text"
                        value={name}
                        name="name"
                        placeholder="Enter name"
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <br />
                <br />
                <Button bsStyle="primary" onClick={this.handleRegister}>
                    register
                </Button>
            </Form>);
        return (
            <div className='register-form'>
                {loginForm}
            </div>
        )
    }
}

export default Signup;