import React from 'react'
import Header from "./Header"
import Filters from "./Filters"
import List from "./List"
import Deck from "./Deck"
import { Grid } from 'semantic-ui-react'

export default class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      class: "",
      filters: {expansion: "all"},
      deck: []
    }

    this.handleDeckChange = this.handleDeckChange.bind(this)
    this.handleClassChange = this.handleClassChange.bind(this)
    this.handleExpansionChange = this.handleExpansionChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleFilterClass = this.handleFilterClass.bind(this)
  }

  handleDeckChange(deck) {
    this.setState(prevState => ({
      deck: deck
    }));
  }

  handleSearch(term) {
    this.setState({
      filters: Object.assign({}, this.state.filters, {
        search: term,
      }),
    }); 
  }

  handleFilterClass(filterClass) {
    this.setState({
      filters: Object.assign({}, this.state.filters, {
        class: filterClass,
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
    this.setState(prevState => ({
      class: playerClass
    }));
  }


  render () {
    return (
      <div>
        <Header />
        <Filters searchTerm={this.handleSearch} 
                 updateFilterClass={this.handleFilterClass}
                 updateExpansion={this.handleExpansionChange} 
                 class={this.state.class} 
                 resetDeck={this.handleDeckChange} 
                 updateClass={this.handleClassChange} />
        <Grid textAlign="center">
          <Grid.Column textAlign="center" width={10}>
            <List filters={this.state.filters} deck={this.state.deck} updateDeck={this.handleDeckChange} />
          </Grid.Column>
          <Grid.Column width={3}>
            <Deck class={this.state.class} deck={this.state.deck} updateDeck={this.handleDeckChange} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}