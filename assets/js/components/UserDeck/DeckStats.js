import React from 'react'
import { Segment } from 'semantic-ui-react'

export default class DeckStats extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            costs: {
                1: 0,
                2: 0,
                3: 0
            }
        }

    }

    render() {
        const { costs } = this.state

        let row1 = `bar__${costs[1]}`
        let row2 = `bar__${costs[2]}`
        let row3 = `bar__${costs[3]}`

        return ( 
            <div className = "deck--stats_container">
              <Segment className="deck-stats" >
                <div className={row1}> 1 </div>
                <div className={row2}> 2 </div>
                <div className={row3}> 3 </div>
              </Segment> 
            </div>
        );
    }
}