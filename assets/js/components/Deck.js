import React from 'react'
import DeckItem from './DeckItem'
import { Header, Segment, Input } from 'semantic-ui-react'
import ExportDeck from './Export'
import { countDeck } from '../utils'

export default class Deck extends React.Component {
    constructor(props){
     super(props)

     this.state = {name: ""}
     this.handleTitleChange = this.handleTitleChange.bind(this);
     this.handleClick = this.handleClick.bind(this);
    }

    handleClick(card) {
      let { deck } = this.props
      var index = deck.map(x => x.name).indexOf(card.name)

      if (card.count == 2) {
        deck[index].count -= 1;
      } else {
        deck.splice(index, 1);
      }
      this.props.updateDeck(deck)
    }

    handleTitleChange(e) {
      this.setState({
        name: e.target.value
      })
    }

    render() {
      const { deck } = this.props

     return (
       <div>
        <Header attached='top'>
         <Input onChange={this.handleTitleChange} value={this.state.name} fluid placeholder='Deck Name' />
        </Header>
         <div> { countDeck(deck) } </div>
        <Segment attached='bottom' className="deck-list">
         {deck.map(card =>
          <DeckItem count={card.count} onClick={(e) => this.handleClick.bind(this, e)} key={card.id} name={card.name} />
         )}
        </Segment>
        <ExportDeck class={this.props.class} deck={deck} />
       </div>
     );
    }
}