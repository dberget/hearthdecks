import React from 'react'
import { Button } from 'semantic-ui-react'

export default class Filters extends React.Component {
  constructor(props) {
    super(props)

    this.toggleMage = this.toggleMage.bind(this)
    this.toggleWarrior = this.toggleWarrior.bind(this)
    this.resetDeck = this.resetDeck.bind(this)
  }

  resetDeck() {
   var deck = []
   this.props.resetDeck(deck);
  }
  toggleMage() {
    this.toggleClass("Mage")
  }
  toggleWarrior() {
    this.toggleClass("Warrior")
  }

  toggleClass(newClass) {
    this.props.updateClass(newClass);
    this.resetDeck();
  }

  render() {
    return (
      <div>
        <h3>Selected Class:</h3>
        <div>
         <Button primary onClick={this.toggleMage}> Mage </Button>
         <Button primary onClick={this.toggleWarrior}> Warrior </Button>
         <Button onClick={this.resetDeck.bind(this)}> Reset </Button>
        </div>
      </div>
    );
  }
}
