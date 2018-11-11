import React, { Component } from 'react';
import {Container} from 'semantic-ui-react';
import Header from './Header';
import SideNav from './SideNav'
import ProposalContainer from './ProposalContainer'
import { PageHeader, Button, Navbar, ButtonGroup, Table, Glyphicon } from 'react-bootstrap';


class Layout extends Component {
	render() {
		return (
			<div id="layout">
				<Header />
				<SideNav />
				<ProposalContainer />
			</div>
		)
	}
};

export default Layout;
