import React from 'react'
import { Input, Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class TopNav extends React.Component {
  constructor(props) {
    super(props)

    this.filterNeutral = this.filterNeutral.bind(this)
    this.handleFilterClass = this.handleFilterClass.bind(this)
    this.selectResult = this.selectResult.bind(this)
    this.handleManaChange = this.handleManaChange.bind(this)
    this.resetDeck = this.resetDeck.bind(this)
    this.resetClass = this.resetClass.bind(this)
  }

  handleFilterClass() {
    this.props.updateFilterClass(this.props.class)
  }

  filterNeutral() {
    this.props.updateFilterClass('Neutral')
  }

  selectResult(e) {
    e.preventDefault()

    const searchTerm = e.target.value.trim()
    this.props.searchTerm(searchTerm)
  }

  handleManaChange(e, data) {
    this.props.handleCostChange(data.value)
  }

  resetClass() {
    this.props.updateClass('')
    this.props.updateFilterClass('')
  }

  resetDeck() {
    this.props.updateDeck([])
  }

  render() {
    return (
      <Menu className="top-nav" borderless>
        <Menu.Item
          active={this.props.class === this.props.filters.class}
          onClick={this.handleFilterClass}
        >
          {this.props.class}
        </Menu.Item>
        <Menu.Item
          active={'Neutral' === this.props.filters.class}
          onClick={this.filterNeutral}
        >
          Neutral
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Input transparent icon={{ name: 'search' }} onChange={this.selectResult} placeholder="Search..." />
          </Menu.Item>
          <Menu.Item onClick={this.resetDeck}>
            <Icon name="trash outline" />
            Reset Deck
          </Menu.Item>
          <Menu.Item as={Link} to="/" >
            <Icon name="undo" />
            New Class
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}
