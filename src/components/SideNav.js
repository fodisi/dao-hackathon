import React, { Component } from 'react';

class SideNav extends Component {
  render() {
    return (
      <div id="side-nav">
        <span className="active">Music</span>
        <span>Food</span>
        <span>Charity</span>
      </div>
    )
  }
}

export default SideNav;
