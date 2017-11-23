import React from 'react';
import { Transition } from 'semantic-ui-react';

export default class HSCard extends React.Component {
  constructor(props) {
  super(props)

  this.state = { animation: 'pulse', duration: 150, visible: true }

  this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
      this.props.onSelect(this.props.data)
      this.setState({visible: !this.state.visible})
  }

  render() {
    const {animation, duration, visible} = this.state
    return (
      <div className="img-container"> 
       <Transition animation={animation} duration={duration} visible={visible}>
        <img className="hsImage" onClick={this.handleClick} src={this.props.data.img} />
       </Transition>
      </div>
    )
  }
}

