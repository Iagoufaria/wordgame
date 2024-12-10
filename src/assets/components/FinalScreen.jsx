import React from 'react'
import styles from './FinalScreen.module.css'

const FinalScreen = ( {retry} ) => {
  return (
    <div>
      <h1>Game Over</h1>
      <button onClick={retry}>RETRY</button>
    </div>
  )
}

export default FinalScreen
