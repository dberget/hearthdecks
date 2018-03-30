import React, { Component } from "react"
import { countDeck, countCard, flashNotice, sortDeck } from "../utils"

const DeckContext = React.createContext([])
export const DeckConsumer = DeckContext.Consumer

class DeckProvider extends Component {
  constructor(props) {
    super(props)
    this.state = { deck: [] }

    this.removeCard = this.removeCard.bind(this)
    this.addCard = this.addCard.bind(this)
    this.handleStorage = this.handleStorage.bind(this)
    this.updateDeck = this.updateDeck.bind(this)
  }

  removeCard(card) {
    const { deck } = this.state
    const index = deck.map(x => x.name).indexOf(card.name)

    if (card.count === 2) {
      deck[index].count -= 1
    } else {
      deck.splice(index, 1)
    }

    this.updateDeck(deck)
  }

  componentDidMount() {
    const className = `/${this.props.class}`
    const cachedDeck = localStorage.getItem(className)

    if (cachedDeck) {
      this.updateDeck(JSON.parse(cachedDeck))
    }
  }

  handleStorage(save) {
    const saveDeck = this.state.deck
    const className = this.state.class

    if (save) {
      localStorage.setItem(`/${className}`, JSON.stringify(saveDeck))
    }
  }

  addCard(card) {
    const { deck } = this.state
    const maxDeckSize = 30
    const count = countCard(card, deck)
    const deckSize = countDeck(deck)
    const maxCardCount = card.rarity === "Legendary" ? 1 : 2 // removed reno mode temporarily -- needs fix
    let index = []

    if (deckSize === maxDeckSize) {
      flashNotice("Your Deck has Reached 30 Cards")
      return
    } else if (count === maxCardCount) {
      return
    } else if (count === 0) {
      card.count = 1
      deck.push(card)
    } else if (count === 1 && maxCardCount !== 1) {
      index = deck.map(x => x.name).indexOf(card.name)
      deck[index].count = 2
    } else {
      return
    }

    this.updateDeck(deck)
  }

  updateDeck(deck) {
    deck.sort(sortDeck)

    this.setState(prevState => ({ deck: deck }))
    this.handleStorage(true)
  }

  render() {
    return (
      <DeckContext.Provider
        value={{
          deck: this.state.deck,
          addCard: () => this.addCard,
          removeCard: () => this.removeCard
        }}
      >
        {this.props.children}
      </DeckContext.Provider>
    )
  }
}

export default DeckProvider
