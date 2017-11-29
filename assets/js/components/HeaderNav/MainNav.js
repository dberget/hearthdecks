import React from 'react'
import { Dropdown, Button, Search, Menu, Icon, Radio } from 'semantic-ui-react'
import ExpansionDropdown from '../CardList/ExpansionDropdown'
import { classes } from '../../constants'

export default class MainNav extends React.Component {
  constructor(props) {
    super(props)

    this.state = {checked: false}

    this.resetClass = this.resetClass.bind(this)
  }


  resetClass() {
    var newClass = ""

    this.props.updateClass(newClass);
    this.props.updateFilterClass(newClass);
  }

  
  render() {

    return (
      <div className="main-nav">
        <Menu secondary>
          <Button className="resetButton" onClick={this.resetClass}><Icon name='undo'/> New Class</Button>
        </Menu>
      </div>
    );
  }
}
