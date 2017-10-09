import React from 'react'
import { Dropdown, Button, Search, Menu } from 'semantic-ui-react'
import ExpansionDropdown from './ExpansionDropdown'
import { classes } from '../constants'

 

export default class Filters extends React.Component {
  constructor(props) {
    super(props)

    this.resetDeck = this.resetDeck.bind(this)
    this.filterNeutral = this.filterNeutral.bind(this)
    this.handleFilterClass= this.handleFilterClass.bind(this)
    this.toggleExpansion = this.toggleExpansion.bind(this)
    this.selectResult = this.selectResult.bind(this)
  }

  resetDeck() {
   var newDeck = []
   this.props.resetDeck(newDeck)
  }

  handleFilterClass() {
    this.props.updateFilterClass(this.props.class)
  }
  
  filterNeutral() {
    this.props.updateFilterClass("Neutral")
  }

  selectClass(e, data) {
    var newClass = data.value
    if (this.props.class != newClass) { this.resetDeck(); } 

    this.props.updateClass(newClass);
    this.props.updateFilterClass(newClass);
  }

  selectResult(e) {
    e.preventDefault();
    this.props.searchTerm(e.target.value)
  }

  toggleExpansion(e, data) {
    this.props.updateExpansion(data.value)
  }

  render() {
    return (
      <div className="main-nav">
        <Menu secondary>
          <Dropdown selection placeholder="select class" options={classes} onChange={this.selectClass.bind(this)} />
          <Button primary onClick={this.handleFilterClass}> {this.props.class} </Button>
          <Button primary onClick={this.filterNeutral}> Neutral </Button>
          <Button onClick={this.resetDeck}> Reset </Button>
          <ExpansionDropdown onChange={this.toggleExpansion.bind(this)} />
          <Search showNoResults={false} onSearchChange={this.selectResult} />
        </Menu>
      </div>
    );
  }
}
