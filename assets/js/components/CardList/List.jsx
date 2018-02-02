import React from "react"
import { Button, Icon } from "semantic-ui-react"
import Ad from "../Messages/Advert"

import TopNav from "./TopNav"
import BottomNav from "./BottomNav"
import HSCard from "./HSCard"
import { countDeck, countCard, flashNotice } from "../../utils"
import { encodeQueryData, scrubFilters } from "../Helpers/ApiHelpers"

export default class List extends React.Component {
  constructor(props) {
    super(props)

    this.state = { entries: [] }

    this.handlePageClick = this.handlePageClick.bind(this)
    this.handleCardClick = this.handleCardClick.bind(this)
  }

  componentDidMount() {
    if (this.props.class) {
      this.cards(this.props, 1)
    } else {
      this.props.updateClass(this.props.params.class)
    }
  }

  componentWillReceiveProps(nextProps) {
    const diffFilters = nextProps.filters !== this.props.filters

    if (diffFilters) {
      this.cards(nextProps, 1)
    }
  }

  handlePageClick(pageAction) {
    let currentPage = this.state.page_number

    if (currentPage === this.state.total_pages && pageAction === "next") {
      return
    } else if (currentPage === 1 && pageAction === "prev") {
      return
    } else if (pageAction == "prev") {
      currentPage -= 1
    } else if (pageAction == "next") {
      currentPage += 1
    } else {
      return
    }

    this.cards(this.props, currentPage)
  }

  cards(props, page) {
    const filters = scrubFilters(props.filters)
    const request = encodeQueryData(filters)

    fetch(`/new/cards?page=${page}&${request}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        this.setState(prevState => json)
      })
  }

  handleCardClick(card) {
    const { deck, updateDeck } = this.props
    const maxDeckSize = 30
    const count = countCard(card, deck)
    const deckSize = countDeck(deck)
    const maxCardCount = card.rarity === "Legendary" ? 1 : this.props.cardLimit
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

    updateDeck(deck)
  }

  render() {
    return (
      <div className="list-container">
        <TopNav {...this.props} />
        <div className="list-body">
          <Button
            disabled={this.state.page_number == 1}
            className="prev-button"
            onClick={() => this.handlePageClick("prev")}
          >
            <Icon name="arrow left" />
          </Button>
          <div className="card-entries">
            {this.state.entries.map(card => (
              <HSCard
                rowSize={4}
                onSelect={this.handleCardClick}
                key={card.id}
                data={card}
              />
            ))}
          </div>
          <Button
            disabled={this.state.page_number == this.state.total_pages}
            className="next-button"
            onClick={() => this.handlePageClick("next")}
          >
            <Icon name="arrow right" />
          </Button>
        </div>
        <BottomNav
          cardLimit={this.props.cardLimit}
          toggleExpansion={this.props.updateExpansion}
          active={this.props.active}
          handleCostClick={this.props.handleCostClick}
          handleCardLimit={this.props.handleCardLimit}
        />
      </div>
    )
  }
}
