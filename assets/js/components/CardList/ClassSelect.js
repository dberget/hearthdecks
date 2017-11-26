import React from 'react'
import { classes } from "../../constants"
import { Dropdown } from 'semantic-ui-react'
import HSCard from './HSCard'

const style = {borderRadius: '50%'};

export default class ClassSelect extends React.Component {


    render() {

    return(
        <div className="card-entries">
           {classes.map(hero => <HSCard style={style} key={hero.id} data={hero} /> 
        )}
        </div>
    )
  }
}