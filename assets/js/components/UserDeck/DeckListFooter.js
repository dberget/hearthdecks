import React from 'react'
import ImportButton from './ImportButton'
import ImportDeck from './ImportDeck'
import ExportDeck from './ExportDeck'


const DeckListFooter = (props) => {
    return(
    <div className="deck--footer">
    <ExportDeck class={props.class} deck={props.deck} /> 
    <ImportDeck handleMaxCard={props.handleMaxCard} uploadDeck={props.handleDeckUpload}  />
    </div>
    )
}

export default DeckListFooter