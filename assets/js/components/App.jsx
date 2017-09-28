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
      deck: [] 
    }

    this.handleDeckChange = this.handleDeckChange.bind(this)
    this.handleClassChange = this.handleClassChange.bind(this)
  }

  handleDeckChange(deck) {
    this.setState(prevState => ({
      deck: deck
    }));
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
        <Filters class={this.state.class} resetDeck={this.handleDeckChange} updateClass={this.handleClassChange} />
        <Grid textAlign="center">
          <Grid.Column textAlign="center" width={10}>
            <List class={this.state.class} deck={this.state.deck} updateDeck={this.handleDeckChange} />
          </Grid.Column>
          <Grid.Column width={3}>
            <Deck updateDeck={this.handleDeckChange} deck={this.state.deck} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}