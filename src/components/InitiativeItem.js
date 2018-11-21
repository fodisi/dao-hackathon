import React, { Component } from 'react';

class InitiativeItem extends Component {
    state = {
        initiatives: []
    };
    async componentDidMount() {
        const initiatives = [{ name: "Rooftop Music Party", description: "Party Tonight" }]
        this.setState({ initiatives });
    }

    render() {
        const initiatives = this.state.initiatives.map((item, index) => {
            return (
                <div key={index}>
                    <h2>{item.name}</h2>
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
