import React, { Component } from 'react';
import web3 from '../utils/web3'
import DAOinstance from '../ethereum/DAOinstance.js'
class InitiativeItem extends Component {
   state = {
       initiatives : []
   };
    async componentDidMount () {
       //const initiatives = await DAOinstance.methods().getInitiatives().call();
       const initiatives = [{name:"Rooftop Music Party", description: "Party Tonight"}]
       this.setState({initiatives});
   }

render() {
   const initiatives = this.state.initiatives.map(item => {
       return (
           <div>
               <h2>{item.name}</h2>
               <div id="initiative-item-nav">
                 <span>View</span>
                 <span className="divider">   |   </span>
                 <span>Predict</span>
                 <span className="divider">   |   </span>
                 <span>Attest</span>
               </div>
               <p>{item.description}</p>
           </div>
       )
   })
    return (
     <div id="initiative-item">
         {initiatives}
      </div>
   )
 }
}

export default InitiativeItem;
