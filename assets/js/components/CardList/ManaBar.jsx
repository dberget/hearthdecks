import React from "react"
import { Button } from "semantic-ui-react"

const ManaBar = props => {
  return (
    <div>
      <Button
        basic
        active={props.active === "<1"}
        onClick={props.handleClick}
        value="<1"
      >
        0
      </Button>
      <Button
        basic
        active={props.active === "1"}
        onClick={props.handleClick}
        value="1"
      >
        1
      </Button>
      <Button
        basic
        active={props.active === "2"}
        onClick={props.handleClick}
        value="2"
      >
        2
      </Button>
      <Button
        basic
        active={props.active === "3"}
        onClick={props.handleClick}
        value="3"
      >
        3
      </Button>
      <Button
        basic
        active={props.active === "4"}
        onClick={props.handleClick}
        value="4"
      >
        4
      </Button>
      <Button
        basic
        active={props.active === "5"}
        onClick={props.handleClick}
        value="5"
      >
        5
      </Button>
      <Button
        basic
        active={props.active === "6"}
        onClick={props.handleClick}
        value="6"
      >
        6
      </Button>
      <Button
        basic
        active={props.active === "7+"}
        onClick={props.handleClick}
        value="7+"
      >
        7+
      </Button>
    </div>
  )
}

export default ManaBar
