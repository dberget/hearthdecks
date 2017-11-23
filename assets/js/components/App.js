import React from 'react'
import MainNav from "./HeaderNav/MainNav"
import List from "./CardList/List"
import Deck from "./UserDeck/Deck" 
import { Grid } from 'semantic-ui-react'
import { sortDeck } from '../utils'
import ManaBar from "./CardList/ManaBar.js"
import { DeckSuccess } from './Messages/DeckSuccess'

export default class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      class: "",
      filters: {},
      deck: []
    }

    this.handleDeckChange = this.handleDeckChange.bind(this)
    this.handleClassChange = this.handleClassChange.bind(this)
    this.handleExpansionChange = this.handleExpansionChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleFilterClass = this.handleFilterClass.bind(this)
    this.handleCostChange = this.handleCostChange.bind(this)
    this.handleDeckUpload = this.handleDeckUpload.bind(this)
  }

   componentDidMount() {
     const cachedDeck = localStorage.getItem("deck");
     const cachedClass = localStorage.getItem("class");

     if (cachedDeck && cachedClass) {
       this.setState({
         deck: JSON.parse(cachedDeck),
         class: JSON.parse(cachedClass),
         filters: Object.assign({}, this.state.filters, {
          class: JSON.parse(cachedClass)
        }),
       })
     }
   }

 handleDeckChange(deck) {
  deck.sort(sortDeck);
  localStorage.setItem("deck", JSON.stringify(deck));

  this.setState(prevState => ({
    deck: deck
  }));

}

handleDeckUpload(deck, playerClass) {
  this.handleDeckChange(deck);
  this.handleClassChange(playerClass);
  this.handleFilterClass(playerClass);
}

  handleSearch(term) {
    this.setState({
      filters: Object.assign({}, this.state.filters, {
        search: term,
        cost: ""
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
    localStorage.setItem("class", JSON.stringify(playerClass));
    this.setState(prevState => ({
      class: playerClass
    })
   );
  }

  render () {
    return (
      <div className="container">
        <MainNav searchTerm={this.handleSearch} 
                 updateFilterClass={this.handleFilterClass}
                 updateExpansion={this.handleExpansionChange} 
                 class={this.state.class} 
                 resetDeck={this.handleDeckChange} 
                 updateClass={this.handleClassChange}
                 deck={this.state.deck} 
                 />
         <List filters={this.state.filters} 
               deck={this.state.deck} 
               updateDeck={this.handleDeckChange} 
               searchTerm={this.handleSearch} 
               updateFilterClass={this.handleFilterClass}
               updateExpansion={this.handleExpansionChange} 
               class={this.state.class}
               activeMana={this.state.filters.cost}
               handleCostChange={this.handleCostChange}
               active={this.state.filters.cost}
               handleCostClick={this.handleCostChange}
               />
         <Deck class={this.state.class} 
               deck={this.state.deck} 
               updateDeck = {this.handleDeckChange}
               handleDeckUpload={this.handleDeckUpload} 
               />
      </div>
    );
  }
}