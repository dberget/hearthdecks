import React from "react"
import { Transition } from "semantic-ui-react"

export default class HSCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = { animation: "pulse", duration: 150, visible: true, alt: "" }

    this.handleClick = this.handleClick.bind(this)
  }

  handleImageErrored() {
    this.setState({ alt: this.props.data.name })
  }

  handleClick() {
    this.props.onSelect(this.props.data)
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const { rowSize } = this.props
    const { animation, duration, visible } = this.state
    return (
      <div className={`img-container--${rowSize}`}>
        <Transition animation={animation} duration={duration} visible={visible}>
          <img
            style={this.props.style}
            className={`hsImage--${rowSize}`}
            onClick={this.handleClick}
            alt={this.state.alt}
            onError={this.handleImageErrored}
            src={this.props.data.img}
          />
        </Transition>
      </div>
    )
  }
}
