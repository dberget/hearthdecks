import React from 'react'
import { Dropdown, Button, Search, Menu } from 'semantic-ui-react'
import ExpansionDropdown from './ExpansionDropdown'
import ManaBar from './ManaBar'
import { classes } from '../../constants'

export default class ListSearch extends React.Component {
  constructor(props) {
    super(props)

    this.state = {activeName: "Class"}

    this.filterNeutral = this.filterNeutral.bind(this)
    this.handleFilterClass= this.handleFilterClass.bind(this)
    this.toggleExpansion = this.toggleExpansion.bind(this)
    this.selectResult = this.selectResult.bind(this)
    this.handleManaChange = this.handleManaChange.bind(this)
  }

  handleFilterClass() {
    this.props.updateFilterClass(this.props.class)
    this.setState({activeName: "Class"})
  }
  
  filterNeutral() {
    this.props.updateFilterClass("Neutral")
    this.setState({activeName: "Neutral"})
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

  render() {
      const { activeName } = this.state

    return (
        <Menu className="list-search" borderless >
          <Menu.Item active={activeName === "Class"} onClick={this.handleFilterClass}> {this.props.class || "Class"} </Menu.Item>
          <Menu.Item active={activeName === "Neutral"} onClick={this.filterNeutral}> Neutral </Menu.Item>
          <Menu.Menu position="right">
            <ExpansionDropdown onChange={this.toggleExpansion.bind(this)} />
            <Search showNoResults={false} onSearchChange={this.selectResult} placeholder="Search..." />
          </Menu.Menu>
        </Menu>
    );
  }
}
