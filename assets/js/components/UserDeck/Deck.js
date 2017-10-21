import React from 'react'
import DeckItem from './DeckItem'
import { Header, Segment, Input } from 'semantic-ui-react'
import ExportDeck from '../Export'
import { countDeck } from '../../utils'

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
      const { deck } = this.props

     return (
       <div className="deck-container">
        <Segment className="deck-list">
         {deck.map(card =>
          <DeckItem count={card.count} rarity={card.rarity} onClick={(e) => this.handleCardRemove.bind(this, e)} mana={card.cost} key={card.id} name={card.name} />
         )}
         <span> { countDeck(deck) } / 30 </span>
        </Segment>
       </div>
     );
    }
}