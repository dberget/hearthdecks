import React from 'react'
import { Menu } from 'semantic-ui-react'
import Clipboard from 'react-clipboard.js'
import { Button, Icon } from 'semantic-ui-react'
import { encode } from 'deckstrings'
import { countDeck, flashNotice } from '../../utils'

export default class ExportDeck extends React.Component {
    constructor(props) {
        super(props)


        this.handleClick = this.handleClick.bind(this)
        this.getClassdbfId = this.getClassdbfId.bind(this)
        this.onSuccess = this.onSuccess.bind(this)
        this.generateDeckString = this.generateDeckString.bind(this)
    }

    onSuccess() {
        flashNotice('Deck Copied Successfully!')
    }

    getClassdbfId(playerClass) {
        switch (playerClass) {
            case 'Warrior':
                return [7]
            case 'Priest':
                return [813]
            case 'Warlock':
                return [893]
            case 'Mage':
                return [637]
            case 'Hunter':
                return [31]
            case 'Shaman':
                return [1066]
            case 'Paladin':
                return [671]
            case 'Rogue':
                return [930]
            case 'Druid':
                return [274]
        }
    }

    handleClick() {
        return this.generateDeckString()
    }

    generateDeckString() {
        const count = countDeck(this.props.deck)

        if (count === 30) {
            const deck = this.props.deck
            let deckstring = ''

            const str = {
                cards: deck.map(e => [parseInt(e.dbfId), e.count]),
                heroes: this.getClassdbfId(this.props.class),
                format: 1,
            }
            deckstring = encode(str)

            return deckstring
        } else {
            flashNotice(`You need 30 Cards to export. Add ${30 - count} more.`)
        }
    }

    render() {
        return (
            <Clipboard
                component="a"
                className="item"
                disabled={countDeck(this.props.deck) !== 30}
                option-text={this.handleClick}
                onSuccess={this.onSuccess}
            >
                <Icon name="share" />
                Export
            </Clipboard>
        )
    }
}