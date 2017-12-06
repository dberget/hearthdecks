import React from 'react'
import { Icon } from 'semantic-ui-react'
import Clipboard from 'react-clipboard.js'
import { encode } from 'deckstrings'


import { countDeck, flashNotice } from '../../utils'

export default class ExportDeck extends React.Component {
    constructor(props) {
        super(props)


        this.getClassdbfId = this.getClassdbfId.bind(this)
        this.onSuccess = this.onSuccess.bind(this)
        this.generateDeckString = this.generateDeckString.bind(this)
        this.generateLink = this.generateLink.bind(this)
    }

    onSuccess() {
        flashNotice('Link Copied Successfully!')
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
            flashNotice(`You need 30 Cards to share. Add ${30 - count} more.`)
        }
    }

    generateLink() {
        const str = this.generateDeckString()
        if (str === undefined) {
            flashNotice(`Sorry, You need 30 Cards to share a deck.`)
        } else {
            return `www.hearthdecks.daveberget.com/deck/${str}`
        }
    }

    render() {
        return (
            <Clipboard
                component="a"
                className="item"
                onSuccess={this.onSuccess}
                option-text={this.generateLink}
            >
                <Icon name="linkify" />
                Share
            </Clipboard>
        )
    }
}