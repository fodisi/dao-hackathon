import React, { Component } from 'react';
import {Grid, Card, Icon, Modal, Button, Container} from 'semantic-ui-react';
import Layout from './components/layout';
import { AcceptDeclineContainer } from './components/AcceptDeclineContainer';

class App extends Component{

  renderUsers(){
    const items = this.state.users.map(user => {
      return {
        header: "Address: ",
        description: "Balance: ",
        fluid: true,
        style: { overflowWrap: 'break-word' },
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <Container>
          <Grid stackable reversed="mobile">
            <Grid.Column width={12}>          
              Hi
            </Grid.Column>
            <Grid.Column width={4}>
              <Grid.Row>
                <Modal size='small'
                  trigger={
                    <Button icon labelPosition='left' className="primary" floated="right">
                      <Icon name='add' />
                      Pending Referral
                    </Button>
                  }>
                  <Modal.Header>Accept/Decline Referral</Modal.Header>
                  <Modal.Content>
                    <AcceptDeclineContainer />
                  </Modal.Content>
                </Modal>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Container>
      </Layout>
    );
  }
}

export default App;
