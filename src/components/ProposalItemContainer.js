import React, { Component } from 'react';
import ProposalItem from './ProposalItem'

class ProposalItemContainer extends Component {
  render() {
    return (
      <div id="proposal-item-container">
        <ProposalItem />
        <ProposalItem />
        <ProposalItem />
        <ProposalItem />
        <ProposalItem />
      </div>
    )
  }
}

export default ProposalItemContainer;
