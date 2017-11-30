import React from 'react'
import MainNav from "./HeaderNav/MainNav"
import List from "./CardList/List"
import Deck from "./UserDeck/Deck" 
import { sortDeck } from '../utils'
import ManaBar from "./CardList/ManaBar.js"
import ClassList from './ClassSelect/ClassList'
import { DeckSuccess } from './Messages/DeckSuccess'
import { Route, Link } from 'react-router-dom'



export default class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      class: "",
      filters: {},
      deck: [],
      cardLimit: 2
    }

    this.handleDeckChange = this.handleDeckChange.bind(this)
    this.handleClassChange = this.handleClassChange.bind(this)
    this.handleExpansionChange = this.handleExpansionChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleFilterClass = this.handleFilterClass.bind(this)
    this.handleCostChange = this.handleCostChange.bind(this)
    this.handleDeckUpload = this.handleDeckUpload.bind(this)
    this.handleCardLimit = this.handleCardLimit.bind(this)
  }

  //  componentDidMount() {
  //    const cachedDeck = localStorage.getItem("deck");
  //    const cachedClass = localStorage.getItem("class");

  //    if (cachedDeck && cachedClass) {
  //      this.setState({
  //        deck: JSON.parse(cachedDeck),
  //        class: JSON.parse(cachedClass),
  //        filters: Object.assign({}, this.state.filters, {
  //         class: JSON.parse(cachedClass)
  //       }),
  //      })
  //    }
  //  }

 handleDeckChange(deck) {
  deck.sort(sortDeck);
  // localStorage.setItem("deck", JSON.stringify(deck));

  this.setState(prevState => ({
    deck: deck
  }));

}

  handleCardLimit(renoMode) {
    console.log(renoMode)
    var maxCount = renoMode ? 1 : 2;
  
    this.setState(prevState => ({
      cardLimit: maxCount
    }));
  }

  handleDeckUpload(deck, playerClass) {
    this.handleClassChange(playerClass);
    this.handleFilterClass(playerClass);
    this.handleDeckChange(deck);
  }

  handleSearch(term) {
    this.setState({
      filters: Object.assign({}, this.state.filters, {
        cost: "",
        search: term
      }),
    }); 
  }

  handleCostChange(e, mana) {
    if (this.state.filters.cost != mana.value) {
      this.setState({
        filters: Object.assign({}, this.state.filters, {
          cost: mana.value
        }),
      });
    } else {
      this.setState({
        filters: Object.assign({}, this.state.filters, {
          cost: ""
        }),
      });
    }
  }

  handleFilterClass(filterClass) {
    this.setState({
      filters: Object.assign({}, this.state.filters, {
        class: filterClass 
      }),
    }); 
  }

  handleExpansionChange(exp) {
    this.setState({
      filters: Object.assign({}, this.state.filters, {
        expansion: exp,
      }),
    });
  }

  handleClassChange(playerClass) {
    // localStorage.setItem("class", JSON.stringify(playerClass));

    this.setState(prevState => ({
      class: playerClass,
      maxCardCount: 2,
      filters: Object.assign({}, this.state.filters, {
        class: playerClass,
      }),
    })
   );
  }

  render () {
    return (
      <div>
        <Link to="/" ><h1> HEARTHDECKS </h1> </Link>
      <Route exact path="/" render={() => (
      <div className="container">
       <ClassList updateClass={this.handleClassChange} 
                  updateFilterClass={this.handleFilterClass} 
                  resetDeck={this.handleDeckChange} 
                  />
      </div>
      )}/>
      <Route exact path="/:class" render={({match}) => (
      <div className="container">
      <List filters={this.state.filters} 
            resetDeck={this.handleDeckChange} 
            deck={this.state.deck} 
            params={match.params}
            updateDeck={this.handleDeckChange} 
            updateClass={this.handleClassChange}
            searchTerm={this.handleSearch} 
            updateFilterClass={this.handleFilterClass}
            updateExpansion={this.handleExpansionChange} 
            class={this.state.class}
            activeMana={this.state.filters.cost}
            handleCostChange={this.handleCostChange}
            active={this.state.filters.cost}
            handleCostClick={this.handleCostChange}
            handleCardLimit={this.handleCardLimit}
            resetDeck={this.handleDeckChange} 
            maxCardCount={this.state.cardLimit}
               />
         <Deck class={this.state.class} 
               deck={this.state.deck} 
               updateDeck = {this.handleDeckChange}
               handleDeckUpload={this.handleDeckUpload} 
               />
               </div>
        )}/>
      </div>
    );
  }
}
