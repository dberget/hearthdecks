import React from 'react'
import HSCard from "./HSCard.js"
import { countDeck, countCard, sortDeck } from '../../utils'
import ListSearch from "./ListSearch"
import { Grid, Button, Message, Icon } from 'semantic-ui-react'

export default class List extends React.Component {
   constructor(props){
    super(props)

    this.state = { entries: [] }

    this.handlePageClick = this.handlePageClick.bind(this)
    this.scrubFilter = this.scrubFilter.bind(this)
    this.encodeQueryData = this.encodeQueryData.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    if (this.props.deck.length) {
      this.cards(this.props, 1)
    }
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
      return
    } else if (count == maxCount) {
      return
    } else if (count == 0) {
      card.count = 1
      deck.push(card)
    } else if (count == 1 && maxCount != 1) {
      var index = deck.map(x => x.name).indexOf(card.name)
      deck[index].count = 2;
    } else {
      return
    };

    deck.sort(sortDeck);
    
    this.props.updateDeck(deck)
  }

  render() {
    return (
      <div className="list-container">
       <ListSearch {...this.props} />
        <div className="list-body">
          <Button className="prev-button" onClick={() => this.handlePageClick("prev")}> <Icon name="arrow left" /></Button>
          <div className="card-entries">
            {this.state.entries.map(card => <HSCard onSelect={this.handleClick} key={card.id} data={card} /> 
            )}
          </div>
          <Button className="next-button" onClick={() => this.handlePageClick("next")}><Icon name="arrow right" /></Button>
        </div>
      </div>
    );
  }
}
