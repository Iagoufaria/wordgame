import React from 'react'
import styles from './StartScreen.module.css'

const StartScreen = ({startGame}) => {
  return (
    <div>
      <h2 className={styles.firstTitle}>SECRET WORD GAME</h2>
      <p className={styles.secondTitle}>Pressione o botão para iniciar o jogo</p>
      <button onClick={startGame}>PLAY</button>
    </div>
  )
}

export default StartScreen
