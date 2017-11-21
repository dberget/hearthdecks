import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { expansions } from "../../constants"

const ExpansionDropdown = (props) => (
  <Dropdown item scrolling placeholder='All Standard' onChange={props.onChange} options={expansions} />
)

export default ExpansionDropdown