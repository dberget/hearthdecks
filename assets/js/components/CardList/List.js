import React from 'react'
import { Grid, Button, Message, Icon } from 'semantic-ui-react'

import TopNav from "./TopNav"
import BottomNav from './BottomNav'
import HSCard from "./HSCard.js"
import { countDeck, countCard, sortDeck, flash_notice } from '../../utils'
import { encodeQueryData, scrubFilters } from '../Helpers/ApiHelpers'

export default class List extends React.Component {
   constructor(props){
    super(props)

    this.state = { entries: [] }

    this.handlePageClick = this.handlePageClick.bind(this)
    this.handleCardClick = this.handleCardClick.bind(this)
    // this.validateClass = this.validateClass.bind(this)

    // this.validateClass(this.props.params.class, this.props.class)
  }

  // validateClass(paramsClass, propsClass) {
  //   if (paramsClass && !propsClass) {
  //     this.props.updateClass(paramsClass)
  //   }
  // }

  
   componentDidMount() {
    if (this.props.class) {
      this.cards(this.props, 1)
    } else {
      this.props.updateClass(this.props.params.class)
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

    fetch(`/new/cards?page=${page}&${request}`, {
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
    let deck = this.props.deck
    let maxDeckSize = 30
    let count = countCard(card, deck)
    let deckSize = countDeck(deck) 
    let maxCardCount = card.rarity == "Legendary" ? 1 : this.props.maxCardCount;

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
       <TopNav {...this.props} />
        <div className="list-body">
          <Button className="prev-button" onClick={() => this.handlePageClick("prev")}> <Icon name="arrow left" /></Button>
          <div className="card-entries">
            {this.state.entries.map(card => <HSCard rowSize={4} onSelect={this.handleCardClick} key={card.id} data={card} /> 
            )}
          </div>
          <Button className="next-button" onClick={() => this.handlePageClick("next")}><Icon name="arrow right" /></Button>
        </div>
        <BottomNav toggleExpansion={this.props.updateExpansion} active={this.props.active} handleCostClick={this.props.handleCostClick} handleCardLimit={this.props.handleCardLimit} />
      </div>
    );
  }
}
