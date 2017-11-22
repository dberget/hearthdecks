import React from 'react'
import { Dropdown, Button, Search, Menu, Icon } from 'semantic-ui-react'
import ExpansionDropdown from '../CardList/ExpansionDropdown'
import { classes } from '../../constants'

 

export default class MainNav extends React.Component {
  constructor(props) {
    super(props)

    this.resetDeck = this.resetDeck.bind(this)
  }

  resetDeck() {
   var newDeck = []
   this.props.resetDeck(newDeck)
  }

  resetDeck() {
    var newDeck = []
    this.props.resetDeck(newDeck)
   }

  selectClass(e, data) {
    var newClass = data.value
    if (this.props.class != newClass) { this.resetDeck(); } 

    this.props.updateClass(newClass);
    this.props.updateFilterClass(newClass);
  }

  render() {

    return (
      <div className="main-nav">
      <h1> HEARTHDECKS </h1>
        <Menu secondary >
          <Dropdown selection placeholder="select class" value={this.props.class} placeholder="Select Class" options={classes} onChange={this.selectClass.bind(this)} />
          <Button className="resetButton" onClick={this.resetDeck}><Icon name='undo'/> New Class </Button>
          <Button className="resetButton" onClick={this.resetDeck}><Icon name='undo'/> Reset Deck</Button>
        </Menu>
      </div>
    );
  }
}
