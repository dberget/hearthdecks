import React from 'react'
import {encode, decode} from 'deckstrings'
import { Button, Modal, Icon, Label, Message } from 'semantic-ui-react'
import { countDeck, flash_notice } from '../../utils'
import Clipboard from 'react-clipboard.js';

export default class ExportDeck extends React.Component {
    constructor(props){
        super(props)
        

        this.handleClick = this.handleClick.bind(this)
        this.getClassdbfId = this.getClassdbfId.bind(this)
        this.onSuccess = this.onSuccess.bind(this)
    }

    getClassdbfId(playerClass) {
        switch (playerClass) {
            case "Warrior":
                return [7]
            case "Priest":
                return [813]
            case "Warlock":
                return [893]
            case "Mage":
                return [274]
            case "Hunter":
                return [31]
            case "Shaman":
                return [1066]
            case "Paladin":
                return [671]
            case "Rogue":
                return [930]
        }
    }

    handleClick() {
      let count = countDeck(this.props.deck)

      if (count == 30) {
        let deck = this.props.deck
        let heroId = this.getClassdbfId(this.props.class)
        let deckstring = ""
        let str = {
            cards: deck.map((e) => [parseInt(e.dbfId), e.count]),
            heroes: heroId,
            format: 1
        };
       deckstring = encode(str);

       return deckstring;

      } else {
          flash_notice(`Erm, You need 30 Cards to export. Add ${30 - count} more.`)
      }
    }

    buttonContent() {
        let count = countDeck(this.props.deck)
        var text = count == 30 ? "Export" : count + "/30";

        return text;
    }

    onSuccess() {
        flash_notice("Deck Copied Successfully!")
    }

    render() { 
        return(
             <Clipboard className="button export" component="button" option-text={this.handleClick} onSuccess={this.onSuccess}> {this.buttonContent.bind(this)()} </Clipboard>
        ) 
    }
}