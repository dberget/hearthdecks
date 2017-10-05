import React from 'react'
import { Button, Search, Menu } from 'semantic-ui-react'
import ExpansionDropdown from './ExpansionDropdown'

export default class Filters extends React.Component {
  constructor(props) {
    super(props)

    this.resetDeck = this.resetDeck.bind(this)
    this.toggleMage = this.toggleMage.bind(this)
    this.toggleWarrior = this.toggleWarrior.bind(this)
    this.toggleNeutral = this.toggleNeutral.bind(this)
    this.toggleExpansion = this.toggleExpansion.bind(this)
    this.selectResult = this.selectResult.bind(this)
  }

  resetDeck() {
   var deck = []
   this.props.resetDeck(deck)
  }

  toggleMage() {
    this.toggleClass("Mage")
  }

  toggleWarrior() {
    this.toggleClass("Warrior")
  }

  toggleNeutral() {
    this.toggleClass("Neutral")
  }

  toggleClass(newClass) {
    if (this.props.class != newClass) { this.resetDeck(); } 

    this.props.updateClass(newClass);
  }

  selectResult(e) {
    this.props.searchTerm(e.target.value)
    e.preventDefault();
  }

  toggleExpansion(e, data) {
    this.props.updateExpansion(data.value)
  }

  render() {
    return (
      <div className="main-nav">
        <Menu secondary>
         <Button primary onClick={this.toggleMage}> Mage </Button>
         <Button primary onClick={this.toggleWarrior}> Warrior </Button>
         <Button primary onClick={this.toggleNeutral}> Neutral </Button>
         <Button onClick={this.resetDeck.bind(this)}> Reset </Button>
         <ExpansionDropdown onChange={this.toggleExpansion.bind(this)} />
         <Search showNoResults={true} onSearchChange={this.selectResult} />
        </Menu>
      </div>
    );
  }
}
