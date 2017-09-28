import React from 'react'
import HSCard from './Card'
import ReactPaginate from 'react-paginate'
import { Grid } from 'semantic-ui-react'

export default class List extends React.Component {
   constructor(props){
    super(props)

    this.state = { entries: [] }
    this.cards(props, this.state.page)

    this.handlePageClick = this.handlePageClick.bind(this)
    this.handleCardClick = this.handleCardClick.bind(this)
    this.cardCount = this.cardCount.bind(this)
  } 

  componentWillReceiveProps(nextProps) {
    this.cards(nextProps)
  }

  handlePageClick(page) {
    let next = page.selected + 1
    this.cards(this.props, next)
  }

  cards(props, page) {
    fetch(`/deck?class=${props.class}&page=${page}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => { 
      this.setState(prevState => json)
    })
  }
  
  cardCount(card, deck) {
    var count = 0
  for(var i = 0; i < deck.length; ++i){
      if(deck[i].name == card.name)
          count++;
  }
  return count;
}

  handleCardClick(card) {
    let deck = this.props.deck
    let count = this.cardCount(card, deck)

    if (card.rarity == "Legendary") {
      var maxCount = 1
    }  else {
      var maxCount = 2
    }

    if (count == 0) {
      card.count = 1
      deck.push(card)
      this.props.updateDeck(deck)
    } else if (count == 1 && maxCount != 1) {
      var index = deck.map(x => x.name).indexOf(card.name)
      deck[index].count = 2;
      this.props.updateDeck(deck)
    }  else {
      throw("max # reached")
    }
  }

  render() {
    return (
      <div className="list-body">
        <Grid>
          {this.state.entries.map(card => 
          <HSCard count={card.count} onClick={(e) => this.handleCardClick.bind(this, e)} key={card.id} data={card} /> 
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
