import React from "react"
import { Route, Link, withRouter } from "react-router-dom"
import List from "./CardList/List"
import Deck from "./UserDeck/Deck"
import { sortDeck } from "../utils"
import ClassList from "./ClassSelect/ClassList"
import ImportHelper from "./Helpers/ImportHelper"

class App extends React.Component {
  constructor(props) {
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
    this.handleStorage = this.handleStorage.bind(this)
  }

  componentDidMount() {
    const className = this.props.location.pathname
    const cachedDeck = localStorage.getItem(className)

    if (cachedDeck) {
      const savedDeck = JSON.parse(cachedDeck)

      this.setState({ deck: savedDeck })
    }
  }

  handleStorage(save) {
    const saveDeck = this.state.deck
    const className = this.state.class

    if (save) {
      localStorage.setItem(`/${className}`, JSON.stringify(saveDeck))
    }
  }

  handleDeckChange(deck) {
    deck.sort(sortDeck)

    this.setState({ deck: deck })
    this.handleStorage(true)
  }

  handleCardLimit(renoMode) {
    const maxCount = renoMode ? 1 : 2

    this.setState({ cardLimit: maxCount })
  }

  handleDeckUpload(deck, playerClass) {
    this.handleClassChange(playerClass)
    this.handleFilterClass(playerClass)
    this.handleDeckChange(deck)
  }

  handleSearch(term) {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        cost: "",
        search: term
      }
    }))
  }

  handleCostChange(e, mana) {
    if (this.state.filters.cost !== mana.value) {
      this.setState(prevState => ({
        filters: {
          ...prevState.filters,
          cost: mana.value
        }
      }))
    } else {
      this.setState(prevState => ({
        filters: {
          ...prevState.filters,
          cost: ""
        }
      }))
    }
  }

  handleFilterClass(filterClass) {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        class: filterClass
      }
    }))
  }

  handleExpansionChange(exp) {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        expansion: exp
      }
    }))
  }

  handleClassChange(playerClass) {
    this.setState(prevState => ({
      class: playerClass,
      maxCardCount: 2,
      filters: {
        ...prevState.filters,
        class: playerClass
      }
    }))
  }

  render() {
    return (
      <div>
        <Link to="/">
          <h2> HEARTHSTONE </h2>
        </Link>
        <Route
          exact
          path="/"
          render={() => (
            <ClassList
              updateClass={this.handleClassChange}
              uploadDeck={this.handleDeckUpload}
              updateFilterClass={this.handleFilterClass}
              resetDeck={this.handleDeckChange}
              saveDeck={this.handleStorage}
            />
          )}
        />
        <Route
          path="/:class"
          exact
          render={({ match }) => (
            <div className="container">
              <List
                filters={this.state.filters}
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
                cardLimit={this.state.cardLimit}
              />
              <Deck
                class={this.state.class}
                deck={this.state.deck}
                params={match.params}
                updateDeck={this.handleDeckChange}
              />
            </div>
          )}
        />
        <Route
          exact
          path="/:class/:cards/:count"
          render={({ match }) => (
            <ImportHelper
              params={match.params}
              uploadDeck={this.handleDeckChange}
            />
          )}
        />
      </div>
    )
  }
}

export default withRouter(App)
