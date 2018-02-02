import React from "react"
import { Button, Menu, Icon } from "semantic-ui-react"

import ExportDeck from "../ExportDeck"
import ShareDeck from "../ShareDeck"
import { countDeck } from "../../../utils"

const DeckMenu = ({ deckTitle, deck, handleStatsClick, playerClass }) => {
  return (
    <Menu size="tiny" borderless>
      <Menu.Item onClick={handleStatsClick}>
        <Icon name="numbered list" />
        Stats
      </Menu.Item>
      <Menu.Item
        as={ExportDeck}
        deckTitle={deckTitle}
        class={playerClass}
        deck={deck}
      />
      <Menu.Item
        as={ShareDeck}
        deckTitle={deckTitle}
        class={playerClass}
        deck={deck}
      />
      <Menu.Item>{countDeck(deck)}/30</Menu.Item>
    </Menu>
  )
}

export default DeckMenu
