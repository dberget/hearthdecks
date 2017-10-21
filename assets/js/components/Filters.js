import React from 'react'
import { Dropdown, Button, Search, Menu, Icon } from 'semantic-ui-react'
import ExpansionDropdown from './ExpansionDropdown'
import ExportDeck from "./Export"
import { classes } from '../constants'

 

export default class Filters extends React.Component {
  constructor(props) {
    super(props)

    this.resetDeck = this.resetDeck.bind(this)
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
        <Menu secondary >
          <Dropdown selection placeholder="select class" options={classes} onChange={this.selectClass.bind(this)} />
          <Menu.Menu position="right">
            <Button className="resetButton" onClick={this.resetDeck}><Icon name='undo'/> Reset Deck</Button>
            <ExportDeck class={this.props.class} deck={this.props.deck} /> 
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
