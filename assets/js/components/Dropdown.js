import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const standard = [{
    key: "All", 
    value: "all", 
    text: "All"
},{
    key: "Basic",
    value: "Basic",
    text: "Basic"
}, {
    key: "Classic",
    value: "Classic",
    text: "Classic"
}, {
    key: "Journey to Un'Goro",
    value: "Journey to Un'Goro",
    text: "Journey to Un'Goro"
}, {
    key: "Knights of the Frozen Throne",
    value: "Knights of the Frozen Throne",
    text: "Knights of the Frozen Throne"
}, {
    key: "Mean Streets of Gadgetzan",
    value: "Mean Streets of Gadgetzan",
    text: "Mean Streets of Gadgetzan"
}, {
    key: "One Night in Karazhan",
    value: "One Night in Karazhan",
    text: "One Night in Karazhan"
}, {
    key: "Whispers of the Old Gods",
    value: "Whispers of the Old Gods",
    text:  "Whispers of the Old Gods"
}]

const ExpansionDropdown = (props) => (
  <Dropdown placeholder='Select Expansion' onChange={props.onChange} inline search selection options={standard} />
)

export default ExpansionDropdown