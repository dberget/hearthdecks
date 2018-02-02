import React from "react"
import { decode } from "deckstrings"
import { withRouter, Redirect } from "react-router-dom"

import { processDeck, addCount } from "../Helpers/DeckHelpers"
import { platform } from "os"

class ImportHelper extends React.Component {
  constructor(props) {
    super(props)

    this.state = { playerClass: "" }

    this.getCards = this.getCards.bind(this)
  }

  componentDidMount() {
    const cards = this.props.params.cards
    const counts = this.props.params.count
    const playerClass = this.props.params.class

    this.setState({ playerClass: playerClass })
    this.getCards(cards, counts, playerClass)
  }

  getCards(dbfids, counts, playerClass) {
    fetch(`/shared?cards=${dbfids}&counts=${counts}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json()
      })
      .then(deck => {
        this.props.uploadDeck(deck.entries, playerClass)
      })
      .then(() => {
        this.props.history.push(playerClass)
      })
  }

  render() {
    return <Redirect to={this.state.playerClass} />
  }
}

export default withRouter(ImportHelper)
