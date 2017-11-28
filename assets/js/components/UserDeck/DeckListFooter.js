import React from 'react'
import ImportButton from './ImportButton'
import ImportDeck from './ImportDeck'
import ExportDeck from './ExportDeck'


const DeckListFooter = (props) => {
    return(
    <div className="deck--footer">
    <ExportDeck deckTitle={props.deckTitle} class={props.class} deck={props.deck} /> 
    <ImportDeck uploadDeck={props.handleDeckUpload}  />
    </div>
    )
}

export default DeckListFooter