import React from 'react'
import {encode, decode} from 'deckstrings'
import { Button, Modal, Icon, Label } from 'semantic-ui-react'
import { countDeck } from '../utils'

export default class ExportDeck extends React.Component {
    constructor(props){
        super(props)
        

        this.state = {deckstring: "", ready: false}
        this.handleClick = this.handleClick.bind(this)
        this.getClassdbfId = this.getClassdbfId.bind(this)
    }

    componentWillReceiveProps() {
       var deckCount = countDeck(this.props.deck)

       if (deckCount == 30) {
         this.setState({ready: true});
       } else {
           this.setState({ready: false})
       }
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
      let deck = this.props.deck
      let heroId = this.getClassdbfId(this.props.class)
      let deckstring = ""

      let str = {
          cards: deck.map((e) => [parseInt(e.dbfId), e.count]),
          heroes: heroId,
          format: 1
      };

      if (this.state.ready == true) {
        deckstring = encode(str);
      } 

      this.setState({deckstring: deckstring});
    }

    

    render() { 
        return(
        <Label onClick={this.handleClick} color="green" as="a" corner="right" icon="copy" /> 
        ) 
    }
}