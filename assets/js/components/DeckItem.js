import React from 'react';

export default class DeckItem extends React.Component {

  render() {
   return (
      <div className="deck-card" onClick={this.props.onClick(this.props)}>
        <span className="mana"> {this.props.mana} </span> 
        <span className="card-name"> {this.props.name} </span> 
        <div className="count"> {this.props.count} </div> 
      </div>
  );
 }
}
