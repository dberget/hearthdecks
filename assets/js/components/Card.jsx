import React from 'react';
import { Image } from 'semantic-ui-react'


const HSCard = (props) => {
  if (props.data.count <= 2) {
    return (
      <img className="hsImage disabled" src={props.data.img} />
    );
  } else {
    return (
      <img className="hsImage" onClick={props.onClick(props.data)} src={props.data.img} />
    );
  } 
}

export default HSCard
