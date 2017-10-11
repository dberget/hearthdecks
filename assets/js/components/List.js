import React from 'react'
import HSCard from "./HSCard.js"
import ReactPaginate from 'react-paginate'
import { countDeck, countCard, sortDeck } from '../utils'
import { Grid, Button, Message } from 'semantic-ui-react'

export default class List extends React.Component {
   constructor(props){
    super(props)

    this.state = { entries: [], page_number: 1 }

    this.handlePageClick = this.handlePageClick.bind(this)
    this.scrubFilter = this.scrubFilter.bind(this)
    this.encodeQueryData = this.encodeQueryData.bind(this)
    this.handleClick = this.handleClick.bind(this)
  } 

  componentWillReceiveProps(nextProps) {
    const diffFilters = nextProps.filters !== this.props.filters; // if filters haven't changed, don't re-render.
    
    if (diffFilters) {
      this.cards(nextProps, 1)
    }
  }

  scrubFilter(state) {
    let newObj = [Object.keys(state).forEach((key) => 
      (state[key] == false) && delete state[key]), state][1]

      return newObj;
  }

  encodeQueryData(data) {
    var newData = this.scrubFilter(data) 
    let ret = [];
    for (let d in newData)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(newData[d]));
    return ret.join('&');
 }

 handlePageClick(page) {
   let nextPage = this.state.page_number

   if (this.state.page_number == this.state.total_pages && page =="next") {
     nextPage
   } else if (page == "prev") {
     nextPage -=1;
   } else if (page == "next") {
     nextPage += 1;
   } else {
     nextPage 
   }

   this.cards(this.props, nextPage)
 }

  cards(props, page) {
    var request = this.encodeQueryData(props.filters)

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

  handleClick(card) {

    let deck = this.props.deck
    let count = countCard(card, deck)
    let deckSize = countDeck(deck) 
    let maxCount = card.rarity == "Legendary" ? 1 : 2;

    if (deckSize == 30) { //TODO: pull into own function
    } else if (count == maxCount) {
    } else if (count == 0) {
      card.count = 1
      deck.push(card)
    } else if (count == 1 && maxCount != 1) {
      var index = deck.map(x => x.name).indexOf(card.name)
      deck[index].count = 2;
    } else {
      return false
    };

    deck.sort(sortDeck);
    
    this.props.updateDeck(deck)
  }

  render() {
    return (
        <div className="list-body">
          <Button className="prev-button" onClick={() => this.handlePageClick("prev")}> PREV PAGE </Button>
          <div className="card-entries">
            {this.state.entries.map(card => <HSCard  onSelect={this.handleClick} key={card.id} data={card} /> 
            )}
          </div>
          <Button className="next-button" onClick={() => this.handlePageClick("next")}> NEXT PAGE </Button>
      </div>
    );
  }
}
