import React from "react"
import { Menu } from "semantic-ui-react"
import RenoToggle from "./RenoToggle"
import ManaBar from "./ManaBar"
import ExpansionDropdown from "./ExpansionDropdown"

const BottomNav = ({
  updateExpansion,
  active,
  handleCostClick,
  cardLimit,
  handleCardLimit
}) => {
  const changeExpansion = (e, data) => {
    updateExpansion(data.value)
  }

  return (
    <Menu size="small" className="bot-nav" borderless>
      <Menu.Item>
        <ExpansionDropdown onChange={changeExpansion} />
      </Menu.Item>
      <Menu.Item className="manabar">
        <ManaBar active={active} handleClick={handleCostClick} />
      </Menu.Item>
      <Menu.Item position="right">
        <RenoToggle cardLimit={cardLimit} handleCardLimit={handleCardLimit} />
      </Menu.Item>
    </Menu>
  )
}

export default BottomNav
