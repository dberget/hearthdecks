import React from 'react'
import { Dropdown, Button, Search, Menu, Icon, Radio } from 'semantic-ui-react'
import ExpansionDropdown from './ExpansionDropdown'
import ManaBar from './ManaBar'
import { classes } from '../../constants'

export default class ListSearch extends React.Component {
  constructor(props) {
    super(props)

    this.state = { checked: false }

    this.filterNeutral = this.filterNeutral.bind(this)
    this.handleFilterClass= this.handleFilterClass.bind(this)
    this.toggleExpansion = this.toggleExpansion.bind(this)
    this.selectResult = this.selectResult.bind(this)
    this.handleManaChange = this.handleManaChange.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.resetDeck = this.resetDeck.bind(this)
  }

  handleFilterClass() {
    this.props.updateFilterClass(this.props.class)
  }
  
  filterNeutral() {
    this.props.updateFilterClass("Neutral")
  }

  selectResult(e) {
    e.preventDefault();
    this.setState({activeName: ""})
    let searchTerm = e.target.value.trim()

    this.props.searchTerm(searchTerm)
  }

  handleManaChange(e, data) {
    this.props.handleCostChange(data.value)
  }

  toggleExpansion(e, data) {
    this.props.updateExpansion(data.value)
  }

  resetDeck() {
    var newDeck = []
    this.props.updateDeck(newDeck)
   }

  handleToggle(e, {value}) { 
    this.props.handleMaxCard(!this.state.checked)
    this.setState({checked: !this.state.checked})
  }


  render() {
      const { checked } = this.state

    return (
        <Menu className="list-search" borderless >
          <Menu.Item active={this.props.class === this.props.filters.class} onClick={this.handleFilterClass}> {this.props.class} </Menu.Item>
          <Menu.Item active={"Neutral" === this.props.filters.class} onClick={this.filterNeutral}> Neutral </Menu.Item>
          <Menu.Item> 
            <Radio className="reno-mode" onChange={this.handleToggle} checked={this.state.checked === true} label='Reno Mode?' toggle />
          </Menu.Item>
          <Menu.Menu position="right">
          <Menu.Item> 
            <ExpansionDropdown onChange={this.toggleExpansion.bind(this)} />
          </Menu.Item>
          <Menu.Item> 
            <Search showNoResults={false} onSearchChange={this.selectResult} placeholder="Search..." />
          </Menu.Item>
          <Menu.Item> 
            <Button basic className="resetButton" onClick={this.resetDeck}><Icon name='undo'/> Reset </Button>
          </Menu.Item>
          </Menu.Menu>
        </Menu>
    );
  }
}
