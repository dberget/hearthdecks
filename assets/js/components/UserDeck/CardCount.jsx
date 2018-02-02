import React from "react"
import { Icon } from "semantic-ui-react"

const Count = ({ count, rarity }) => {
  const cardCount = rarity === "Legendary" ? <Icon name="star" /> : count

  return <span className="count"> {cardCount} </span>
}

export default Count
