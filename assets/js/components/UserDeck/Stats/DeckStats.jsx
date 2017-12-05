import React from 'react'
import { Segment, Divider } from 'semantic-ui-react'

import { countDeck } from '../../../utils'

export default class DeckStats extends React.Component {
    constructor(props) {
        super(props)

        this.cardsAtManaCost = this.cardsAtManaCost.bind(this)
        this.calcMana = this.calcMana.bind(this)
        this.calcDust = this.calcDust.bind(this)
    }

    cardsAtManaCost(cost) {
        const deck = this.props.data
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

        const reducer = (acc, cv) => acc + cv
        if (list.length) {
            total = list.reduce(reducer)
        }

        return total * 5
    }

    calcDust() {
        const deck = this.props.data
        let total = 0
        const list = []
        // const dustValues = { common: 40, Rare: 100, Epic: 400, Legendary: 1600 }

        for (let i = 0; i < deck.length; ++i) {
            if (deck[i].rarity == "common") {
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


        const reducer = (acc, cv) => acc + cv
        if (list.length) {
            total = list.reduce(reducer)
        }
        return total

    }

    calcMana() {
        const deck = this.props.data
        const totalCount = countDeck(deck)
        const list = []
        let total = 0

        const reducer = (acc, cv) => acc + cv
        for (let i = 0; i < deck.length; ++i) {
            list.push(deck[i].cost * deck[i].count)
        }

        if (list.length) {
            total = list.reduce(reducer) / totalCount
        }

        return total.toFixed(2)
    }

    render() {

        return (
            <Segment basic hidden={this.props.hidden}>
                <Divider horizontal> Stats </Divider>
                <div className="stats-container">
                    <div className="stat">
                        <span className="stat-header"> Dust: </span>
                        <span> {this.calcDust()} </span>
                    </div>
                    <div className="stat">
                        <span className="stat-header"> Ave. Mana: </span>
                        <span> {this.calcMana()} </span>
                    </div>
                </div>
                <div className="barcontainer">
                    <div className="barcontainerheader">
                        Mana Curve
                    </div>
                    <div className="bar" style={{ height: `${this.cardsAtManaCost(0)}%` }}>
                        <div className="barlabel">
                            0
                    </div>
                    </div>
                    <div className="bar" style={{ height: `${this.cardsAtManaCost(1)}%` }}>
                        <div className="barlabel">
                            1
                    </div>
                    </div>
                    <div className="bar" style={{ height: `${this.cardsAtManaCost(2)}%` }}>
                        <div className="barlabel">
                            2
                    </div>
                    </div>
                    <div className="bar" style={{ height: `${this.cardsAtManaCost(3)}%` }}>
                        <div className="barlabel">
                            3
                    </div>
                    </div>
                    <div className="bar" style={{ height: `${this.cardsAtManaCost(4)}%` }}>
                        <div className="barlabel">
                            4
                    </div>
                    </div>
                    <div className="bar" style={{ height: `${this.cardsAtManaCost(5)}%` }}>
                        <div className="barlabel">
                            5
                    </div>
                    </div>
                    <div className="bar" style={{ height: `${this.cardsAtManaCost(6)}%` }}>
                        <div className="barlabel">
                            6
                    </div>
                    </div>
                    <div className="bar" style={{ height: `${this.cardsAtManaCost(7)}%` }}>
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
