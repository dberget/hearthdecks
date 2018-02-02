import React from "react"

const ImportButton = ({ onClick }) => {
  return (
    <button type="button" className="import" onClick={onClick}>
      Import
    </button>
  )
}

export default ImportButton
