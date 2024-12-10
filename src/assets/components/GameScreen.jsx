import React from "react";
import styles from "./GameScreen.module.css";
import { useState, useRef } from "react";
import wordsList from "../../data/words";

const GameScreen = ({
  verifyLetter,
  categoryResult,
  wordResult,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {

  const [selectLetter, setSelectLetter] = useState("")
  const letterInputRef = useRef("null")

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita o redirecionamento da página
    verifyLetter(selectLetter);
    setSelectLetter("");
    letterInputRef.current.focus()
  }

  return (
    <div className={styles.game}>
      <p className={styles.points}>
        <span>Sua pontuação: {score}</span>
      </p>
      <h1>Adivinhe a palavra</h1>
      <h3 className={styles.tip}>
        <p>Tentativas: {guesses}</p>
        Dica sobre a palavra : <span>{categoryResult.toUpperCase()}</span>
      </h3>
      <div className={styles.wordContainer}>
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className={styles.letter}>
              {letter}
            </span>
          ) : (
            <span key={i} className={styles.blankSquare}>
              
            </span>
          )
        )}
      </div>
      <div className={styles.letterContainer}>
        <p>Tente adivinha uma letra da palavra: </p>
        <form onSubmit={handleSubmit}>
          <input 
          type="text" 
          name="letter"
          maxLength={1} 
          value={selectLetter}
          onChange={(e) => setSelectLetter(e.target.value)}
          ref={letterInputRef}
          />
          <button>Jogar</button>
        </form>
      </div>
      <div className={styles.wrongLettersContainer}>
        <p>Letras já utilizadas</p>
        <span>{wrongLetters.slice(",")}</span>
      </div>
    </div>
  );
};

export default GameScreen;
