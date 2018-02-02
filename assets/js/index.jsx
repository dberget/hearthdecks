import ReactDOM from "react-dom"
import React from "react"
import { BrowserRouter } from "react-router-dom"
import register from "./registerServiceWorker"

import App from "./components/App"

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("app")
  )

  register()
})
