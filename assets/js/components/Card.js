import React from 'react';

const HSCard = (props) => {
    return (
      <img className="hsImage" onClick={props.onClick(props.data)} src={props.data.img} />
    ) 
  } 

export default HSCard
