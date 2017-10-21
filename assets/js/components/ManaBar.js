import React from 'react'
import { Button } from 'semantic-ui-react'

  const ManaBar = (props) => {
    console.log(props)
      return(
        <Button.Group>
          <Button onClick={props.handleClick} value="0" icon> 0 </Button> 
          <Button onClick={props.handleClick} value="1" icon> 1 </Button> 
          <Button onClick={props.handleClick} value="2" icon> 2 </Button> 
          <Button onClick={props.handleClick} value="3" icon> 3 </Button> 
          <Button onClick={props.handleClick} value="4" icon> 4 </Button> 
          <Button onClick={props.handleClick} value="5" icon> 5 </Button> 
          <Button onClick={props.handleClick} value="6" icon> 6 </Button> 
          <Button onClick={props.handleClick} value=">=7" icon> 7+ </Button> 
        </Button.Group >
      )
    }

export default ManaBar