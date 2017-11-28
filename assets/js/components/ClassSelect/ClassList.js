import React from 'react'
import { classes } from "../../constants"
import { Dropdown } from 'semantic-ui-react'
import HSCard from '../CardList/HSCard'

export default class ClassList extends React.Component {
    constructor(props) {
        super(props)

        this.handleCardClick = this.handleCardClick.bind(this)
    }


    handleCardClick(playerClass) {
        this.props.updateFilterClass(playerClass.value)
        this.props.updateClass(playerClass.value)
        this.props.resetDeck([])
    }


    render() {
    return(
        <div className="class-container">
          <h2> Select a class </h2>
          <div className="class-list-body">
            <div className="card-entries">
                {classes.map(hero => <HSCard rowSize={3} onSelect={this.handleCardClick} key={hero.id} data={hero} /> 
              )}
            </div>
          </div>
        </div>
    )
  }
}