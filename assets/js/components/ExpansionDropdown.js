import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { standard } from "../constants"




const ExpansionDropdown = (props) => (
  <Dropdown defaultValue={"all"} onChange={props.onChange} button selection options={standard} />
)

export default ExpansionDropdown