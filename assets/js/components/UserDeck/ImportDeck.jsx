import React from "react"
import { decode } from "deckstrings"
import { Form, Button, Input } from "semantic-ui-react"
import { withRouter } from "react-router-dom"

import { processDeck, addCount } from "../Helpers/DeckHelpers"

class ImportDeck extends React.Component {
  constructor(props) {
    super(props)

    this.state = { deckstring: "", hidden: true }

    this.getClassbydbfId = this.getClassbydbfId.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.getCards = this.getCards.bind(this)
    this.handleExpand = this.handleExpand.bind(this)
  }

  getClassbydbfId(playerClass) {
    switch (playerClass[0]) {
      case 7:
        return "Warrior"
      case 813:
        return "Priest"
      case 893:
        return "Warlock"
      case 637:
        return "Mage"
      case 31:
        return "Hunter"
      case 1066:
        return "Shaman"
      case 671:
        return "Paladin"
      case 930:
        return "Rogue"
      case 274:
        return "Druid"
    }
  }

  getCards(dbfids, cardCounts, playerClass) {
    fetch(`/upload/cards?cards=${dbfids}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json()
      })
      .then(json => {
        return addCount(cardCounts, json.entries)
      })
      .then(deck => {
        this.props.uploadDeck(deck, playerClass)
      })
      .then(() => {
        this.props.history.push(playerClass)
      })
  }

  handleChange(e, { name, value }) {
    this.setState({
      deckstring: value
    })
  }

  handleExpand() {
    this.setState({ hidden: !this.state.hidden })
  }

  handleUpload() {
    const deck = decode(this.state.deckstring)
    const userDeck = processDeck(deck)
    const playerClass = this.getClassbydbfId(deck.heroes)

    this.getCards(userDeck, deck.cards, playerClass)
  }

  render() {
    const { deckstring, hidden } = this.state

    return (
      <div>
        <Button className={`${hidden}`} basic onClick={this.handleExpand}>
          Import
        </Button>
        <Form hidden={hidden} onSubmit={this.handleUpload}>
          <Form.Group>
            <Input
              onChange={this.handleChange}
              value={deckstring}
              placeholder="Paste Deckstring"
            />
            <Button type="submit" basic>
              Import
            </Button>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

export default withRouter(ImportDeck)
