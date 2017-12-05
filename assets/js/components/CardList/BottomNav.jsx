import React from 'react'
import { Menu } from 'semantic-ui-react'
import RenoToggle from './RenoToggle'
import ManaBar from './ManaBar'
import ExpansionDropdown from './ExpansionDropdown'

const BottomNav = (props) => {
    const toggleExpansion = (e, data) => {
        props.toggleExpansion(data.value)
    }

    return (
        <Menu size="small" className="bot-nav" borderless>
            <Menu.Item>
                <ExpansionDropdown onChange={toggleExpansion} />
            </Menu.Item>
            <Menu.Item className="manabar">
                <ManaBar active={props.active} handleClick={props.handleCostClick} />
            </Menu.Item>
            <Menu.Item position="right">
                <RenoToggle cardLimit={props.cardLimit} handleCardLimit={props.handleCardLimit} />
            </Menu.Item>
        </Menu>
    )
}

export default BottomNav
