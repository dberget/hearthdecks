import React from 'react'
import { decode } from 'deckstrings'
import { withRouter, Redirect } from 'react-router-dom'

import { processDeck, addCount } from '../Helpers/DeckHelpers'
import { platform } from 'os';

class ImportHelper extends React.Component {
    constructor(props) {
        super(props)

        this.state = { playerClass: '' }

        this.getClassbydbfId = this.getClassbydbfId.bind(this)
        this.getCards = this.getCards.bind(this)
    }

    componentDidMount() {
        const deck = decode(this.props.params.deckstring)
        const userDeck = processDeck(deck)
        const playerClass = this.getClassbydbfId(deck.heroes)

        this.setState({ playerClass: playerClass })
        this.getCards(userDeck, deck.cards, playerClass)
    }

    getClassbydbfId(playerClass) {
        switch (playerClass[0]) {
            case 7:
                return 'Warrior'
            case 813:
                return 'Priest'
            case 893:
                return 'Warlock'
            case 637:
                return 'Mage'
            case 31:
                return 'Hunter'
            case 1066:
                return 'Shaman'
            case 671:
                return 'Paladin'
            case 930:
                return 'Rogue'
            case 274:
                return 'Druid'
        }

    }

    getCards(dbfids, cardCounts, playerClass) {
        fetch(`/upload/cards?dbfids=${dbfids}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                return res.json()
            })
            .then((json) => {
                return addCount(cardCounts, json.entries)
            })
            .then((deck) => {
                this.props.uploadDeck(deck, playerClass)
            })
            .then(() => {
                this.props.history.push(playerClass)
            })
    }

    render() {

        return (
            <Redirect to={this.state.playerClass} />
        )
    }
}

export default withRouter(ImportHelper)
