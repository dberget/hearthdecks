import React from 'react'
import { Button } from 'semantic-ui-react'

export default class Filters extends React.Component {
  constructor(props) {
    super(props)

    this.toggleMage = this.toggleMage.bind(this)
    this.toggleWarrior = this.toggleWarrior.bind(this)
  }

  toggleMage() {
    this.toggleClass("Mage")
  }
  toggleWarrior() {
    this.toggleClass("Warrior")
  }

  toggleClass(newClass) {
    this.props.updateClass(newClass);
  }

  render() {
    return (
      <div>
        <h3>Selected Class:</h3>
        <div>
         <Button primary onClick={this.toggleMage}> Mage </Button>
         <Button primary onClick={this.toggleWarrior}> Warrior </Button>
        </div>
      </div>
    );
  }
}
