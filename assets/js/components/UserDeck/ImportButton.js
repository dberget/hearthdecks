import React from 'react'


const ImportButton = ({onClick, disabled}) => {
  return <button disabled={disabled} type="button" className="import" onClick={onClick}> Import </button>
}

export default ImportButton