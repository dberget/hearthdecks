import React from 'react'
import HSCard from "./Card.js"
import ReactPaginate from 'react-paginate'
import { countDeck, countCard } from '../utils'
import { Grid } from 'semantic-ui-react'

export default class List extends React.Component {
   constructor(props){
    super(props)

    this.state = { entries: [], page_number: 0 }

    this.handlePageClick = this.handlePageClick.bind(this)
    this.handleCardClick = this.handleCardClick.bind(this)
    this.scrubFilter = this.scrubFilter.bind(this)
    this.encodeQueryData = this.encodeQueryData.bind(this)
  } 

  componentWillReceiveProps(nextProps) {
    const diffFilters = nextProps.filters !== this.props.filters; // if filters haven't changed, don't re-render.
    
    if (diffFilters) {
      this.cards(nextProps, this.state.page_number)
    }
  }


  handlePageClick(page) {
    let next = page.selected + 1
    this.cards(this.props, next)
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



  handleCardClick(card) {
    let deck = this.props.deck
    let count = countCard(card, deck)
    let deckSize = countDeck(deck) 

    var maxCount = card.rarity == "Legendary" ? 1 : 2;

    if (deckSize == 30) {
      throw("Max Deck Size reached")
    } else if (count == maxCount) {
      throw("Max card # reached")
    } else if (count == 0) {
      card.count = 1
      deck.push(card)
    } else if (count == 1 && maxCount != 1) {
      var index = deck.map(x => x.name).indexOf(card.name)
      deck[index].count = 2;
    } else {
      throw("error")
    };

    this.props.updateDeck(deck)
  }

  render() {
    return (
      <div className="list-body">
        <Grid>
          {this.state.entries.map(card => 
          <HSCard onClick={(e) => this.handleCardClick.bind(this, e)} key={card.id} data={card} /> 
          )}
        </Grid>
        <nav className="bottom">
         <ReactPaginate activeClassName={"active"} 
                         breakClassName={"break-me"}
                         breakLabel={<a href="">...</a>}
                         containerClassName={"pagination"}
                         disabledClassName={"invisible"}
                         initialPage={this.state.page_number}
                         marginPagesDisplayed={2}
                         nextClassName={"page-item"}
                         nextLabel={">>"}
                         onPageChange={this.handlePageClick}
                         pageClassName={"page-item"}
                         pageCount={this.state.total_pages}
                         pageLinkClassName={"page-link"}
                         pageRangeDisplayed={5}
                         previousClassName={"page-item"}
                         previousLabel={"<<"}
                         subContainerClassName={"pages pagination"} />
        </nav>
      </div>
    );
  }
}
