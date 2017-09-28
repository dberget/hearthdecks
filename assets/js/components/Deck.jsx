import React from 'react'
import DeckItem from './DeckItem'

export default class Deck extends React.Component {
    constructor(props){
     super(props)

    this.handleClick = this.handleClick.bind(this) 
    }

    handleClick(card) {
      let deck = this.props.deck
      var index = deck.map(x => x.name).indexOf(card.name)

      if (card.count == 2) {
        deck[index].count -= 1;
      } else {
        deck.splice(index, 1)
      }

      this.props.updateDeck(deck)
    }

    render() {
      const { deck } = this.props

      const deckSize = () => {
        if (deck.length == 0) {
          return 0;
        } else {
         var deckCount = deck.map(x => x.count).reduce(function (sum, value) {
            return sum + value;
          }, 0)
        }
        return deckCount;
      }

     return (
       <div>
       <div className="ui segment deck-list">
         {deck.map(card =>
          <DeckItem count={card.count} onClick={(e) => this.handleClick.bind(this, e)} key={card.id} name={card.name} />
         )}
       </div>
         <div> {deckSize()} </div>
       </div>
     );
    }
}