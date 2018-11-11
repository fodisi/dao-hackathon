import React from 'react';
import {Container} from 'semantic-ui-react';
import Header from './Header';
import { PageHeader, Button, Navbar, ButtonGroup, Table, Glyphicon, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import AddProposal from './addProposal';

export default props => {
	return (
		<Container>
			<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
			<Header />
			{props.children}
            <div>
                <AddProposal></AddProposal>
            </div>

		</Container>
	);
};
