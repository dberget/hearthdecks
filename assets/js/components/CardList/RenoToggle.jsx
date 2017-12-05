import React from 'react'
import { Radio } from 'semantic-ui-react'

export default class RenoToggle extends React.Component {
    constructor(props) {
        super(props)
        this.state = { checked: false }

        this.handleToggle = this.handleToggle.bind(this)
    }

    handleToggle(e, { value }) {
        this.props.handleCardLimit(!this.state.checked)
        this.setState({ checked: !this.state.checked })
    }

    render() {
        return (
            <Radio
                className="reno-mode"
                onChange={this.handleToggle}
                checked={this.props.cardLimit === 1}
                label='Reno Mode?'
                toggle
            />
        )
    }
}