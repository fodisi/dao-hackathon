import React, { Component } from 'react';
import ProposalItem from './ProposalItem'

class ProposalItemContainer extends Component {
  render() {
    return (
      <div id="proposal-item-container">
        <ProposalItem name="Beyonce" />
        <ProposalItem name="Jay-Z"/>
        <ProposalItem name="Bon Jovi"/>
        <ProposalItem name="Maroon 5"/>
      </div>
    )
  }
}

export default ProposalItemContainer;
