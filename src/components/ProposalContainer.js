import React, { Component } from 'react';
import ProposalDescription from './ProposalDescription'
import ProposalItemContainer from './ProposalItemContainer'

class ProposalContainer extends Component {
  render() {
    return (
      <div id="proposal-container">
        <ProposalDescription />
        <ProposalItemContainer />
      </div>
    )
  }
}

export default ProposalContainer;
