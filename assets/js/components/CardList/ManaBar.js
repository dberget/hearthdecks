import React from 'react'
import { Button, Menu } from 'semantic-ui-react'

  const ManaBar = (props) => {
      return(
        <div className="mana-bar">
          <Button.Group>
            <Button active={props.active === "<1"} onClick={props.handleClick} value="<1"> 0 </Button> 
            <Button active={props.active === "1"} onClick={props.handleClick} value="1" > 1 </Button> 
            <Button active={props.active === "2"} onClick={props.handleClick} value="2" > 2 </Button> 
            <Button active={props.active === "3"} onClick={props.handleClick} value="3" > 3 </Button> 
            <Button active={props.active === "4"} onClick={props.handleClick} value="4" > 4 </Button> 
            <Button active={props.active === "5"} onClick={props.handleClick} value="5" > 5 </Button> 
            <Button active={props.active === "6"} onClick={props.handleClick} value="6" > 6 </Button> 
            <Button active={props.active === "7+"} onClick={props.handleClick} value="7+" > 7+ </Button> 
          </Button.Group >
         </div>
      )
    }

export default ManaBar