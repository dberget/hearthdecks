import React from 'react'
import { Segment, Divider } from 'semantic-ui-react'

import { countDeck, sum } from '../../../utils'

export default class DeckStats extends React.Component {
    constructor(props) {
        super(props)

        this.state = { mana: {}, dust: 0, aveMana: 0, spells: 0, minions: 0 }

        this.cardsAtManaCost = this.cardsAtManaCost.bind(this)
        this.calcMana = this.calcMana.bind(this)
        this.calcDust = this.calcDust.bind(this)
        this.calcTypes = this.calcTypes.bind(this)
    }


    componentWillReceiveProps(nextProps) {
        this.calcDust()
        this.calcMana()
        this.calcTypes()
    }

    cardsAtManaCost(cost) {
        const deck = this.props.deck
        const list = []
        let total = 0

        if (cost < 7) {
            for (let i = 0; i < deck.length; ++i) {
                if (cost === deck[i].cost) {
                    list.push(deck[i].count)
                }
            }
        } else {
            for (let i = 0; i < deck.length; ++i) {
                if (deck[i].cost > 6) {
                    list.push(deck[i].count)
                }
            }
        }

        if (list.length) {
            total = list.reduce((sum), 0)
        }

        return total
    }


    calcTypes() {
        const deck = this.props.deck

        let spells = deck
            .filter((card) => {
                return card.type === 'Spell';
            }).map((card) => {
                return card.count
            }).reduce((sum), 0)

        let minions = deck
            .filter((card) => {
                return card.type === 'Minion';
            }).map((card) => {
                return card.count
            }).reduce((sum), 0)


        this.setState({ spells: spells, minions: minions })
    }

    calcDust() {
        const deck = this.props.deck
        let total = 0
        const list = []

        for (let i = 0; i < deck.length; ++i) {
            if (deck[i].rarity == "Common") {
                list.push(40 * deck[i].count)
            } else if (deck[i].rarity == "Rare") {
                list.push(100 * deck[i].count)
            } else if (deck[i].rarity == "Epic") {
                list.push(400 * deck[i].count)
            } else if (deck[i].rarity == "Legendary") {
                list.push(1600 * deck[i].count)
            } else {
                list.push(0)
            }
        }


        if (list.length) {
            total = list.reduce(sum)
        }

        this.setState({ dust: total })

    }

    calcMana() {
        const deck = this.props.deck
        const totalCount = countDeck(deck)
        const list = []
        let total = 0

        if (deck.length) {
            for (let i = 0; i < deck.length; ++i) {
                list.push(deck[i].cost * deck[i].count)
            }

            total = list.reduce((sum), 0) / totalCount
            this.setState({ aveMana: total.toFixed(2) })
        }
    }

    render() {

        return (
            <Segment basic hidden={this.props.hidden}>
                <Divider horizontal> Stats </Divider>
                <div className="stats-container">
                    <div className="stat">
                        <span className="stat-header"> Dust: </span>
                        <span> {this.state.dust} </span>
                    </div>
                    <div className="stat">
                        <span className="stat-header"> Ave. Mana Cost: </span>
                        <span> {this.state.aveMana} </span>
                    </div>
                    <div className="stat">
                        <span className="stat-header"> Spells: </span>
                        <span> {this.state.spells} </span>
                    </div>
                    <div className="stat">
                        <span className="stat-header"> Minions: </span>
                        <span> {this.state.minions} </span>
                    </div>
                </div>
                <div className="barcontainer">
                    <div className="barcontainerheader">
                        Mana Curve
                    </div>
                    <div className="bar" style={{ height: `${this.cardsAtManaCost(0) * 5}%` }}>
                        <div className="barAmount">
                            {this.cardsAtManaCost(0) > 2 && this.cardsAtManaCost(0)}
                        </div>
                        <div className="barlabel">
                            0
                    </div>
                    </div>
                    <div className="bar" style={{ height: `${this.cardsAtManaCost(1) * 5}%` }}>
                        <div className="barAmount">
                            {this.cardsAtManaCost(1) > 2 && this.cardsAtManaCost(1)}
                        </div>
                        <div className="barlabel">
                            1
                    </div>
                    </div>
                    <div className="bar" style={{ height: `${this.cardsAtManaCost(2) * 5}%` }}>
                        <div className="barAmount">
                            {this.cardsAtManaCost(2) > 2 && this.cardsAtManaCost(2)}
                        </div>
                        <div className="barlabel">
                            2
                    </div>
                    </div>
                    <div className="bar" style={{ height: `${this.cardsAtManaCost(3) * 5}%` }}>
                        <div className="barAmount">
                            {this.cardsAtManaCost(3) > 2 && this.cardsAtManaCost(3)}
                        </div>
                        <div className="barlabel">
                            3
                    </div>
                    </div>
                    <div className="bar" style={{ height: `${this.cardsAtManaCost(4) * 5}%` }}>
                        <div className="barAmount">
                            {this.cardsAtManaCost(4) > 2 && this.cardsAtManaCost(4)}
                        </div>
                        <div className="barlabel">
                            4
                    </div>
                    </div>
                    <div className="bar" style={{ height: `${this.cardsAtManaCost(5) * 5}%` }}>
                        <div className="barAmount">
                            {this.cardsAtManaCost(5) > 2 && this.cardsAtManaCost(5)}
                        </div>
                        <div className="barlabel">
                            5
                    </div>
                    </div>
                    <div className="bar" style={{ height: `${this.cardsAtManaCost(6) * 5}%` }}>
                        <div className="barAmount">
                            {this.cardsAtManaCost(6) > 2 && this.cardsAtManaCost(6)}
                        </div>
                        <div className="barlabel">
                            6
                    </div>
                    </div>
                    <div className="bar" style={{ height: `${this.cardsAtManaCost(7) * 5}%` }}>
                        <div className="barAmount">
                            {this.cardsAtManaCost(7) > 2 && this.cardsAtManaCost(7)}
                        </div>
                        <div className="barlabel">
                            7+
                    </div>
                    </div>
                </div>
                <Divider fitted horizontal> Deck </Divider>
            </Segment>
        )
    }
}
