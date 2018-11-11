import React from 'react';
//import { Menu, Modal, Icon } from 'semantic-ui-react';
import {  Button, ControlLabel, FormControl  } from 'react-bootstrap';



class AddProposal extends React.Component {
    constructor () {
        super();
    this.state = {
        name: '',
        description: ''
    }}


    onInputChange = (property) => (event) => {
        const value = event.target.value;
        this.setState({ [property]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.name);
        console.log(this.state.description);
    };

    render () {
      return (
        <div id="add-proposal">
          <form>
            <ControlLabel>{"Submit A Proposal"}</ControlLabel>
            <FormControl
            id="formControlsText"
            value = {this.state.name}
            type="text"
            placeholder="Enter a Proposal" onChange = {this.onInputChange('name')}/>

            <ControlLabel className="form-description">{"Description"}</ControlLabel>
            <FormControl
            id="formControlsText"
            value = {this.state.description}
            type="text"
            placeholder="Enter a description" onChange = {this.onInputChange('description')}/>
            <Button bsStyle="primary" onClick = {this.handleSubmit}>Submit</Button>
          </form>
        </div>
      );
    }
}
export default AddProposal
