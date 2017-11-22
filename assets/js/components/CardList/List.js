import React from 'react'
import HSCard from "./HSCard.js"
import ManaBar from './ManaBar'
import { countDeck, countCard, sortDeck, flash_notice } from '../../utils'
import ListSearch from "./ListSearch"
import { Grid, Button, Message, Icon } from 'semantic-ui-react'
import { encodeQueryData, scrubFilters } from '../Helpers/ApiHelpers'

export default class List extends React.Component {
   constructor(props){
    super(props)

    this.state = { entries: [] }

    this.handlePageClick = this.handlePageClick.bind(this)
    this.handleCardClick = this.handleCardClick.bind(this)
  }

  componentDidMount() {
    if (this.props.deck.length) {
      this.cards(this.props, 1)
    }
  }

  componentWillReceiveProps(nextProps) {
    const diffFilters = nextProps.filters !== this.props.filters; 
    
    if (diffFilters) {
      this.cards(nextProps, 1)
    }
  }

 handlePageClick(pageAction) {
   let currentPage = this.state.page_number

   if (currentPage == this.state.total_pages && pageAction == "next") {
     return;
   } else if (currentPage == 1 && pageAction == "prev") {
     return;
   } else if (pageAction == "prev") {
     currentPage -= 1;
   } else if (pageAction == "next") {
     currentPage += 1;
   } else {
     return;
   }

   this.cards(this.props, currentPage)
 }

  cards(props, page) {
    var filters = scrubFilters(props.filters)
    var request = encodeQueryData(filters)

    fetch(`/cards?page=${page}&${request}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => { 
      this.setState(prevState => json)
    })
  }

  handleCardClick(card) {
    let maxDeckSize = 30
    let deck = this.props.deck
    let count = countCard(card, deck)
    let deckSize = countDeck(deck) 
    let maxCardCount = card.rarity == "Legendary" ? 1 : 2;

    if (deckSize == maxDeckSize) { 
      flash_notice("Your Deck has Reached 30 Cards") 
      return
    } else if (count == maxCardCount) {
      return
    } else if (count == 0) {
      card.count = 1
      deck.push(card)
    } else if (count == 1 && maxCardCount != 1) {
      var index = deck.map(x => x.name).indexOf(card.name)
      deck[index].count = 2;
    } else {
      return
    };
    
    this.props.updateDeck(deck)
  }

  render() {
    return (
      <div className="list-container">
       <ListSearch {...this.props} />
        <div className="list-body">
          <Button className="prev-button" onClick={() => this.handlePageClick("prev")}> <Icon name="arrow left" /></Button>
          <div className="card-entries">
            {this.state.entries.map(card => <HSCard onSelect={this.handleCardClick} key={card.id} data={card} /> 
            )}
          </div>
          <Button className="next-button" onClick={() => this.handlePageClick("next")}><Icon name="arrow right" /></Button>
        </div>
         <ManaBar active={this.props.active} handleClick={this.props.handleCostClick} />
      </div>
    );
  }
}
