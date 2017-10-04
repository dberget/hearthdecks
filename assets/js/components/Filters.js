import React from 'react'
import { Button } from 'semantic-ui-react'
import ExpansionDropdown from './Dropdown'

export default class Filters extends React.Component {
  constructor(props) {
    super(props)

    this.toggleMage = this.toggleMage.bind(this)
    this.toggleWarrior = this.toggleWarrior.bind(this)
    this.resetDeck = this.resetDeck.bind(this)
    this.toggleExpansion = this.toggleExpansion.bind(this)
    this.toggleNeutral = this.toggleNeutral.bind(this)
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
    this.props.updateClass("Neutral")
  }

  toggleClass(newClass) {
    this.props.class !=  
    this.resetDeck();
    this.props.updateClass(newClass);
  }

  toggleExpansion(e, data) {
    this.props.updateExpansion(data.value)
  }

  render() {
    return (
      <div>
        <h3>Selected Class:</h3>
        <div>
         <Button primary onClick={this.toggleMage}> Mage </Button>
         <Button primary onClick={this.toggleWarrior}> Warrior </Button>
         <Button primary onClick={this.toggleNeutral}> Neutral </Button>
         <Button onClick={this.resetDeck.bind(this)}> Reset </Button>
         <ExpansionDropdown onChange={this.toggleExpansion.bind(this)} />
        </div>
      </div>
    );
  }
}
