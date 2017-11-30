import React from 'react'
import { classes } from "../../constants"
import { Dropdown } from 'semantic-ui-react'
import HSCard from '../CardList/HSCard'
import { Link } from 'react-router-dom'

export default class ClassList extends React.Component {
    constructor(props) {
        super(props)

        this.handleClassClick = this.handleClassClick.bind(this)
    }


    handleClassClick(playerClass) {
        this.props.updateFilterClass(playerClass.value)
        this.props.updateClass(playerClass.value)
        this.props.saveDeck(true)
        this.props.resetDeck([])
    }


    render() {
    return(
        <div className="class-container">
          <h2> Select a class </h2>
          <div className="class-list-body">
            <div className="card-entries">
                {classes.map(hero => <Link key={hero.value} to={hero.value}> <HSCard rowSize={3} onSelect={this.handleClassClick} key={hero.id} data={hero} /> </Link>
              )}
            </div>
          </div>
        </div>
    )
  }
}