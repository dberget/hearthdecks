import React from 'react'
import { classes } from "../../constants"
import { Header, Menu } from 'semantic-ui-react'
import HSCard from '../CardList/HSCard'
import ImportDeck from '../UserDeck/ImportDeck'
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
        <Menu secondary>
          <Menu.Header as="h2"> Select a Class <Menu.Header as="h3"> or Import a Deck </Menu.Header> </Menu.Header>
          <Menu.Menu position="right">
            <ImportDeck uploadDeck={this.props.uploadDeck}  />
          </Menu.Menu>
         </Menu>
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