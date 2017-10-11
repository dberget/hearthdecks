import React from 'react'
import {encode} from 'deckstrings'
import { Button, Modal, Icon } from 'semantic-ui-react'
import { countDeck } from '../utils'

export default class ExportDeck extends React.Component {
    constructor(props){
        super(props)
        

        this.state = {deckstring: "", disabled: true}
        this.handleClick = this.handleClick.bind(this)
        this.getClassdbfId = this.getClassdbfId.bind(this)
    }

    componentWillReceiveProps() {
       var deckCount = countDeck(this.props.deck)

       if (deckCount == 30) {
         this.setState({disabled: false});
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

      let str = {
          cards: deck.map((e) => [parseInt(e.dbfId), e.count]),
          heroes: heroId,
          format: 1
      };
      let deckstring = encode(str);

      this.setState({deckstring: deckstring});
    }

    

    render() { 
        return(
            <div>
              <Modal basic trigger={<Button disabled={this.state.disabled} onClick={this.handleClick} ><Icon name="cloud download" /> Export </Button>}>
               <Modal.Content content={this.state.deckstring}>
               </Modal.Content>
              </Modal>
            </div>
        ) 
    }
}