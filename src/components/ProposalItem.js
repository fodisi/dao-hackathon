import React, { Component } from 'react';
import { PageHeader, Button, Navbar, ButtonGroup, Table, Glyphicon } from 'react-bootstrap';

class ProposalItem extends Component {
    state = {counter:0};

    increaseCounter = (event) => {
        event.preventDefault();
        let counter = this.state.counter;
        counter++;
        this.setState({counter})
    };

  render() {
    return (
      <div id="proposal-item">
        <h4>{this.props.name}</h4>
        <Button bsStyle="success" onClick = {this.increaseCounter}>VOTE</Button>
        <h6>{this.state.counter}</h6>
      </div>
    )
  }
}

export default ProposalItem;
