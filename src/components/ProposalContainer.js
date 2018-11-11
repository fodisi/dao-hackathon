import React, { Component } from 'react';
import InitiativeItem from './InitiativeItem'
import ProposalItemContainer from './ProposalItemContainer'

class ProposalContainer extends Component {
  render() {
    return (
      <div id="proposal-container">
        <InitiativeItem />
        <ProposalItemContainer />
      </div>
    )
  }
}

export default ProposalContainer;
