import React from 'react'
import { Icon } from 'semantic-ui-react'

const Count = ({count, star}) => {
    var cardCount = star == "Legendary" ? <Icon name='star' /> : count;

    return(
    <span className="count"> { cardCount } </span>
  )
}

export default Count