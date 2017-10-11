import React from 'react';

export default class HSCard extends React.Component {
  constructor(props) {
  super(props)

  this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.data)
    }
  }

  render() {
    return (
      <div className="img-container"> 
        <img className="hsImage" onClick={this.handleClick} src={this.props.data.img} />
      </div>
    )
  }
}

