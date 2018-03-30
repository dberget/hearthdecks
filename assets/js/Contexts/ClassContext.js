// import React, { Component } from "react"
// import { countDeck, countCard, flashNotice, sortDeck } from "../utils"

// const ClassContext = React.createContext([])
// export const ClassConsumer = ClassContext.Consumer

// class ClassProvider extends Component {
//   constructor(props) {
//     super(props)
//     this.state = { deck: [] }

//     this.handleClassChange = this.handleClassChange.bind(this)
//   }

//   handleClassChange(playerClass) {
//     this.setState(prevState => ({
//       class: playerClass,
//       maxCardCount: 2,
//       filters: {
//         ...prevState.filters,
//         class: playerClass
//       }
//     }))
//   }

//   render() {
//     return (
//       <ClassContext.Provider
//         value={{
//           class: this.state.class,
//           changeClass: () => this.handleClassChange
//         }}
//       >
//         {this.props.children}
//       </ClassContext.Provider>
//     )
//   }
// }

// export default DeckProvider
