import ReactDOM from "react-dom"
import React from "react"
import { BrowserRouter } from "react-router-dom"
import register from "./registerServiceWorker"
import DeckProvider from "./Contexts/DeckContext.jsx"

import App from "./components/App"

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <BrowserRouter>
      <DeckProvider>
        <App />
      </DeckProvider>
    </BrowserRouter>,
    document.getElementById("app")
  )

  register()
})
