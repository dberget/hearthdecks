import React from 'react'
import {encode, decode} from 'deckstrings'
import { Form, Button } from 'semantic-ui-react'
import { countDeck, flash_notice } from '../../utils'
import Clipboard from 'react-clipboard.js';
import { processDeck, addCount } from '../Helpers/DeckHelpers';

export default class ImportDeck extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {deckstring: '', deck: []}

        this.getClassbydbfId = this.getClassbydbfId.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
        this.getCards = this.getCards.bind(this)
    }

    getClassbydbfId(playerClass) {
        switch (playerClass[0]) {
            case 7:
                return "Warrior" 
            case 813:
                return "Priest" 
            case 893:
                return "Warlock" 
            case 274:
                return "Mage" 
            case 31:
                return "Hunter" 
            case 1066:
                return "Shaman" 
            case 671:
                return "Paladin"
            case 930:
                return "Rogue"
        }

    }

     getCards(dbfids, cardCounts, playerClass) {
         fetch(`/search/cards?dbfids=${dbfids}`, {
                 headers: {
                     'Content-Type': 'application/json'
                 }
             })
             .then((res) => {
                 return res.json();
             })
             .then(json => {
                return addCount(cardCounts, json.entries);
             })
             .then((deck) => {
                 this.props.uploadDeck(deck, playerClass)
             })
     };


      handleChange(e, { name, value }) { 
        this.setState(deckstring => ({
            deckstring: value
          }));
    }

    handleUpload() {
        var deck = decode(this.state.deckstring)
        var userDeck = processDeck(deck)
        var playerClass = this.getClassbydbfId(deck.heroes)

        this.setState({deckstring: ""})
        this.getCards(userDeck, deck.cards, playerClass)
    }


    render() { 
       const { deckstring } = this.state

        return(
            <Form onSubmit={this.handleUpload}> 
              <Form.Input onChange={this.handleChange} value={deckstring} placeholder='Paste Deckstring' />
               <Button type='submit'> Upload </Button>
            </Form>
        ) 
    }
}