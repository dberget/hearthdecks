import React from 'react';
import Count from "./UserDeck/CardCount"

export default class DeckItem extends React.Component {

  render() {
   return (
      <div className="deck-card" onClick={this.props.onClick(this.props)}>
        <span className="mana"> {this.props.mana} </span> 
        <span className="card-name"> {this.props.name} </span> 
        <Count count={this.props.count} star={this.props.rarity} />
      </div>
  );
 }
}
