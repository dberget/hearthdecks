import React from 'react'
import { Dropdown, Button, Search, Menu } from 'semantic-ui-react'
import ExpansionDropdown from './ExpansionDropdown'


 const classes = [{
   value: "Mage",
   text: "Mage",
   key: "Mage"
 }, {
   value: "Warrior",
   text: "Warrior",
   key: "Warrior"
 }, {
   text: "Warlock",
   value: "Warlock",
   key: "Warlock"
 }, {
   text: "Paladin",
   value: "Paladin",
   key: "Paladin"
 }, {
   text: "Priest",
   value: "Priest",
   key: "Priest"
 }, {
   text: "Rogue",
   value: "Rogue",
   key: "Rogue"
 }, {
   text: "Druid",
   value: "Druid",
   key: "Druid"
 }, {
   value: "Hunter",
   text: "Hunter",
   key: "Hunter"
 }, {
   value: "Shaman",
   text: "Shaman",
   key: "Shaman"
 }]

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
   var deck = []
   this.props.resetDeck(deck)
  }

  handleFilterClass() {
    this.props.updateFilterClass(this.props.class)
  }
  
  filterNeutral() {
    this.props.updateFilterClass("Neutral")
  }

  toggleClass(e, data) {
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
          <Dropdown selection placeholder="select class" options={classes} onChange={this.toggleClass.bind(this)} />
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
