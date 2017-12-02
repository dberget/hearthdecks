import React from 'react'
import { Segment, Input } from 'semantic-ui-react'

import DeckItem from './DeckItem'
import ExportDeck from './ExportDeck'

export default class Deck extends React.Component {
  constructor(props) {
    super(props)

    this.state = { deckTitle: `${this.props.params.class} Deck` }

    this.deckTitleChange = this.deckTitleChange.bind(this)
  }

  componentDidMount() {
    const className = `/${this.props.class}`
    const cachedDeck = localStorage.getItem(className)

    if (cachedDeck) {
      this.props.updateDeck(JSON.parse(cachedDeck))
    }
  }


  handleCardRemove(card) {
    const { deck } = this.props
    const index = deck.map(x => x.name).indexOf(card.name)

    if (card.count === 2) {
      deck[index].count -= 1
    } else {
      deck.splice(index, 1)
    }

    this.props.updateDeck(deck)
  }


  deckTitleChange(e) {
    this.setState({ deckTitle: e.target.value })
  }


  render() {
    const { deck } = this.props

    return (
      <div className="deck-container">
        <Segment>
          <input onChange={this.deckTitleChange} value={this.state.deckTitle} />
          <div className="deck-list">
            {deck.map(card =>
              (
                <DeckItem
                  count={card.count}
                  rarity={card.rarity}
                  onClick={e => this.handleCardRemove.bind(this, e)}
                  mana={card.cost}
                  key={card.id}
                  name={card.name}
                />
              ))}
          </div>
          <ExportDeck deckTitle={this.state.deckTitle} class={this.props.class} deck={deck} />
        </Segment>
      </div>
    )
  }
}
