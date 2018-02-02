import React from "react"

export default class Ad extends React.Component {
  componentDidMount() {
    ;(adsbygoogle = window.adsbygoogle || []).push({})
  }

  render() {
    return (
      <div className="ad">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-1158795338565606"
          data-ad-slot="7337287012"
          data-ad-format="auto"
        />
      </div>
    )
  }
}
