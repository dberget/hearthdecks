import React from 'react'
import { Button } from 'semantic-ui-react'

  const ManaBar = (props) => {
      return(
        <Button.Group>
          <Button active={props.active === "0"} onClick={props.handleClick} value="0" icon> 0 </Button> 
          <Button active={props.active === "1"} onClick={props.handleClick} value="1" icon> 1 </Button> 
          <Button active={props.active === "2"} onClick={props.handleClick} value="2" icon> 2 </Button> 
          <Button active={props.active === "3"} onClick={props.handleClick} value="3" icon> 3 </Button> 
          <Button active={props.active === "4"} onClick={props.handleClick} value="4" icon> 4 </Button> 
          <Button active={props.active === "5"} onClick={props.handleClick} value="5" icon> 5 </Button> 
          <Button active={props.active === "6"} onClick={props.handleClick} value="6" icon> 6 </Button> 
          <Button active={props.active === "7+"} onClick={props.handleClick} value="7+" icon> 7+ </Button> 
        </Button.Group >
      )
    }

export default ManaBar