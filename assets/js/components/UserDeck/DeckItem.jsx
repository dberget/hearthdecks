import React from "react"
import Count from "./CardCount"

const DeckItem = ({ name, count, mana, rarity, handleClick }) => {
  return (
    <div className="deck-card" onClick={() => handleClick({ name, count })}>
      <span className="mana"> {mana} </span>
      <span className="card-name"> {name} </span>
      <Count count={count} rarity={rarity} />
    </div>
  )
}

export default DeckItem
