import React from "react"
import { Button, Icon } from "semantic-ui-react"

import { DeckConsumer } from "../../Contexts/DeckContext.jsx"
import TopNav from "./TopNav"
import BottomNav from "./BottomNav"
import HSCard from "./HSCard"
import { countDeck, countCard, flashNotice } from "../../utils"
import { encodeQueryData, scrubFilters } from "../Helpers/ApiHelpers"

export default class List extends React.Component {
  constructor(props) {
    super(props)

    this.state = { entries: [] }

    this.handlePageClick = this.handlePageClick.bind(this)
  }

  componentDidMount() {
    if (this.props.class) {
      this.cards(this.props, 1)
    } else {
      this.props.updateClass(this.props.params.class)
    }
  }

  componentWillReceiveProps(nextProps) {
    const diffFilters = nextProps.filters !== this.props.filters

    if (diffFilters) {
      this.cards(nextProps, 1)
    }
  }

  handlePageClick(pageAction) {
    let currentPage = this.state.page_number

    if (currentPage === this.state.total_pages && pageAction === "next") {
      return
    } else if (currentPage === 1 && pageAction === "prev") {
      return
    } else if (pageAction == "prev") {
      currentPage -= 1
    } else if (pageAction == "next") {
      currentPage += 1
    } else {
      return
    }

    this.cards(this.props, currentPage)
  }

  cards(props, page) {
    const filters = scrubFilters(props.filters)
    const request = encodeQueryData(filters)

    fetch(`/new/cards?page=${page}&${request}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        this.setState(prevState => json)
      })
  }

  render() {
    const { page_number, total_pages, entries } = this.state

    return (
      <DeckConsumer>
        {context => (
          <div className="list-container">
            <TopNav {...this.props} />
            <div className="list-body">
              <Button
                disabled={page_number == 1}
                className="prev-button"
                onClick={() => this.handlePageClick("prev")}
              >
                <Icon name="arrow left" />
              </Button>
              <div className="card-entries">
                {entries.map(card => (
                  <HSCard
                    rowSize={4}
                    onSelect={context.addCard()}
                    key={card.id}
                    data={card}
                  />
                ))}
              </div>
              <Button
                disabled={page_number == total_pages}
                className="next-button"
                onClick={() => this.handlePageClick("next")}
              >
                <Icon name="arrow right" />
              </Button>
            </div>
            <BottomNav {...this.props} />
          </div>
        )}
      </DeckConsumer>
    )
  }
}
