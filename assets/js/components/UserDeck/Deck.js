import React from 'react'
import { Segment } from 'semantic-ui-react'

import DeckItem from './DeckItem'
import DeckListFooter from './DeckListFooter'

export default class Deck extends React.Component {
    constructor(props){
     super(props)

    }

    handleCardRemove(card) {
      let { deck } = this.props
      var index = deck.map(x => x.name).indexOf(card.name)

      if (card.count == 2) {
        deck[index].count -= 1;
      } else {
        deck.splice(index, 1);
      }

      this.props.updateDeck(deck)
    }


    render() {
     const { deck, handleDeckUpload } = this.props 

     return (
       <div className="deck-container">
        <Segment>
         <div className="deck-name"> {this.props.class} Deck </div> 
          <div className="deck-list">
           {deck.map(card =>
            <DeckItem count={card.count} rarity={card.rarity} onClick={(e) => this.handleCardRemove.bind(this, e)} mana={card.cost} key={card.id} name={card.name} />
           )}
          </div>
          <DeckListFooter handleMaxCard={this.props.handleMaxCard} class={this.props.class} handleDeckUpload={handleDeckUpload} deck={deck}  />  
        </Segment>
       </div>
     );
    }
}