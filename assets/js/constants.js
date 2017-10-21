import React from 'react'
import { Header } from 'semantic-ui-react'

export const expansions = [{
    key: "Standard", 
    disabled: true,
    content: <Header as='h4' textAlign="center" content="Standard" dividing/>  
},{
  key: "All Standard",
  value: "standard",
  text: "All Standard"
}, {
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
}, {
  key: "Wild", 
  disabled: true,
  content: <Header as='h4' textAlign="center" content="Wild" dividing/>  
}, {
  key: "All Wild",
  value: "wild",
  text: "All Wild"
}, {
  key: "League of Explorers",
  value: "The League of Explorers",
  text: "League of Explorers"
}, {
  key: "Grand Tournament",
  value: "The Grand Tournament",
  text: "Grand Tournament"
}, {
  key: "Blackrock Mountain",
  value: "Blackrock Mountain",
  text: "Blackrock Mountain"
}, {
  key: "Goblins vs Gnomes",
  value: "Goblins vs Gnomes",
  text: "Goblins vs Gnomes"
}, {
  key: "Naxxramas",
  value: "Naxxramas",
  text: "Naxxramas"
}, {
  key: "Hall of Fame",
  value: "Hall of Fame",
  text:  "Hall of Fame"
}]

export const classes = [{
    value: "Mage",
    text: "Mage",
    key: "Mage"
  }, {
    value: "Warrior",
    text: "Warrior",
    key: "Warrior"
  }, {
    text: "Warlock",
    value: "Warlock",
    key: "Warlock"
  }, {
    text: "Paladin",
    value: "Paladin",
    key: "Paladin"
  }, {
    text: "Priest",
    value: "Priest",
    key: "Priest"
  }, {
    text: "Rogue",
    value: "Rogue",
    key: "Rogue"
  }, {
    text: "Druid",
    value: "Druid",
    key: "Druid"
  }, {
    value: "Hunter",
    text: "Hunter",
    key: "Hunter"
  }, {
    value: "Shaman",
    text: "Shaman",
    key: "Shaman"
  }]