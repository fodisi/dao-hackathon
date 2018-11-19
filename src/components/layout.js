import React, { Component } from 'react';
import Header from './Header';
import SideNav from './SideNav'
import ProposalContainer from './ProposalContainer'
import AddProposal from './addProposal'

class Layout extends Component {
	render() {
		return (
			<div id="layout">
				<Header />
				<SideNav />
				<ProposalContainer />
				<AddProposal />
			</div>
		)
	}
};

export default Layout;
