import React from 'react'
import {encode, decode} from 'deckstrings'
import { Form, Button, Input, Radio } from 'semantic-ui-react'
import Clipboard from 'react-clipboard.js';
import { withRouter } from 'react-router-dom'

import { countDeck, flash_notice } from '../../utils'
import ImportButton from './ImportButton'
import { processDeck, addCount } from '../Helpers/DeckHelpers';

class ImportDeck extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {deckstring: '', hidden: true, playerClass: "" }

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
            case 274:
                return "Druid"
        }

    }

     getCards(dbfids, cardCounts, playerClass) {
         fetch(`/upload/cards?dbfids=${dbfids}`, {
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
             .then(() => {
                this.props.history.push(playerClass)
             })
     };

    handleChange(e, { name, value }) { 
        this.setState(deckstring => ({
            deckstring: value
        }));
    }

    handleExpand() {
        this.setState({ hidden: !this.state.hidden })
    }

    handleUpload() {
        var deck = decode(this.state.deckstring)
        var userDeck = processDeck(deck)
        var playerClass = this.getClassbydbfId(deck.heroes)

        this.setState({deckstring: "", hidden: true, playerClass: playerClass})
        this.getCards(userDeck, deck.cards, playerClass)
    }

 

    render() { 
       const { deckstring, hidden } = this.state

        return(
            <span>
                    <ImportButton onClick={this.handleExpand.bind(this)} />
                    <Form hidden={hidden} onSubmit={this.handleUpload}>
                        <Input fluid onChange={this.handleChange} value={deckstring} placeholder='Paste Deckstring' />
                        <Button type="submit" size='tiny' basic > Upload </Button>
                    </Form>
            </span>
        ) 
    }
}

export default withRouter(ImportDeck);