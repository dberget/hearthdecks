import React from 'react'
import { Dropdown, Image } from 'semantic-ui-react'


export default class ClassSelect extends React.Component {
    constructor(props){
        super(props)


    }

    render() {
        let imgsrc = '../../static/images/Druid.png'
        
        return (
        <div>
            <img src={imgsrc} /> 
        </div>
        )
      }
}