import React from 'react'
import { Segment, Input } from 'semantic-ui-react'

import DeckItem from './DeckItem'
import DeckListFooter from './DeckListFooter'

export default class Deck extends React.Component {
    constructor(props){
     super(props)

     this.state = {deckTitle: ""}

     this.deckTitleChange = this.deckTitleChange.bind(this)
    }

    componentDidMount() {
      let className = "/" + this.props.class
      let cachedDeck = localStorage.getItem(className)

      if (cachedDeck) {
        this.props.updateDeck(JSON.parse(cachedDeck))
      }
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


    deckTitleChange(e) {
      this.setState({deckTitle: e.target.value})
    }


    render() {
     const { deck, handleDeckUpload } = this.props 

     return (
       <div className="deck-container">
        <Segment>
         <input onChange={this.deckTitleChange} value={this.props.class || this.props.params.class}  />
          <div className="deck-list">
           {deck.map(card =>
            <DeckItem count={card.count} rarity={card.rarity} onClick={(e) => this.handleCardRemove.bind(this, e)} mana={card.cost} key={card.id} name={card.name} />
           )}
          </div>
          <DeckListFooter deckTitle={this.state.deckTitle} handleMaxCard={this.props.handleMaxCard} class={this.props.class} handleDeckUpload={handleDeckUpload} deck={deck}  />  
        </Segment>
       </div>
     );
    }
}