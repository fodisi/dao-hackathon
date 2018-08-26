import React, { Component } from 'react';
import {Grid} from 'semantic-ui-react';
import Layout from './components/layout';

class App extends Component {
  render() {
    return (
      <Layout>
        <Grid stackable reversed="mobile">
          <Grid.Column width={12}>          
            Hi
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

export default App;
