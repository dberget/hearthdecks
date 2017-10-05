import React from 'react'
import {encode} from 'deckstrings'
import { Button, Modal } from 'semantic-ui-react'

export default class ExportDeck extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {deckstring: ""}
        this.handleClick = this.handleClick.bind(this)
        this.getClassdbfId = this.getClassdbfId.bind(this)
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
      var deck = this.props.deck
      var hero = this.getClassdbfId(this.props.class)
      var str = {
          cards: deck.map((e) => [parseInt(e.dbfId), e.count]),
          heroes: hero,
          format: 1
      };
      const deckstring = encode(str);

      this.setState({deckstring: deckstring});
    }

    

    render() { 
        return(
            <div>
              <Modal basic trigger={<Button onClick={this.handleClick} > Export </Button>}>
               <Modal.Content content={this.state.deckstring}>
               </Modal.Content>
              </Modal>
            </div>
        ) 
    }
}