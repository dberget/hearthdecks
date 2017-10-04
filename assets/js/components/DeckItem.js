import React from 'react';

export default class DeckItem extends React.Component {

  render() {
   return (
      <div onClick={this.props.onClick(this.props)}> {this.props.name} {this.props.count} </div> 
  );
 }
}
