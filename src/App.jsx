//React
import { useState, Fragment, useEffect } from "react";

//Css
import "./App.css";

//Palavras
import Wordslist from "./data/words.jsx";

//Components
import StartScreen from "./assets/components/StartScreen";
import GameScreen from "./assets/components/GameScreen";
import FinalScreen from "./assets/components/FinalScreen";

function App() {
  const stages = [
    { id: 1, name: "start" },
    { id: 2, name: "game" },
    { id: 3, name: "final" },
  ];

  //useStates
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(Wordslist);
  const [picketWord, setPicketWord] = useState("");
  const [picketCategory, setPicketCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  //Função para sortear uma categoria e uma palavra
  const sortWordAndCategory = () => {
    //pegando uma categoria random
    const categoryKey = Object.keys(words);
    const sortCategory = Math.floor(Math.random() * categoryKey.length);
    const resultCategory = categoryKey[sortCategory];
    setPicketCategory(resultCategory);
    // pegando uma palavra random dentro da categoria
    const sortWord = Math.floor(Math.random() * 6);
    const resultWord = words[resultCategory][sortWord];
    setPicketWord(resultWord);

    return { resultCategory, resultWord };
  };

  //função para dividir a palavra em letras
  const spliceWord = () => {
    let newWord = picketWord.split("");
    newWord = newWord.map((l) => l.toLowerCase());
    console.log(newWord);
    setLetters(newWord);
  };

  //Função que será disparada assim que o picketWord ser alterado
  useEffect(() => {
    if (picketWord) {
      spliceWord();
    }
  }, [picketWord]); //Depedência: sempre que picketWord mudar

  //use effect para verificar se a palavra esta completa ou não
  useEffect(() => {
    if(guessedLetters.join("") === letters.join("") && gameStage === "game"){
      setScore((prevScore) => score + 10)
      startGame()
    }
  },[guessedLetters, letters, gameStage]);

  //Função para ir para a tela inicial do game
  const startGame = () => {
    const { resultCategory, resultWord } = sortWordAndCategory();
    setGameStage(stages[1].name);
    setGuessedLetters(Array(resultWord.length).fill("_")); // Reseta o progresso
    setWrongLetters([]); // Reseta as letras erradas
    setGuesses(3); // Reinicia as tentativas
  };

  const verifyLetter = (selectLetter) => {
    // Verifica se a letra existe na palavra
    if (letters.includes(selectLetter)) {
      // Atualiza todas as ocorrências da letra correta
      const updatedGuessedLetters = [...guessedLetters];
      letters.forEach((letter, index) => {
        if (letter === selectLetter) {
          updatedGuessedLetters[index] = selectLetter;
        }
      });
  
      setGuessedLetters(updatedGuessedLetters);
  
      // Verifica se a palavra foi completada
      if (updatedGuessedLetters.join("") === letters.join("") && gameStage === "game") {
        setScore((prevScore) => prevScore + 10); // Incrementa a pontuação
        startGame(); // Reinicia o jogo com uma nova palavra
      }
    } else {
      // Reduz tentativas se a letra não estiver na palavra
      const remainingGuesses = guesses - 1;
      setGuesses(remainingGuesses);
      setWrongLetters((prevWrongLetters) => {
        if (!prevWrongLetters.includes(selectLetter)) {
          return [...prevWrongLetters, selectLetter];
        }
        return prevWrongLetters;
      });
  
      if (remainingGuesses === 0) {
        setGameStage(stages[2].name); // Vai para a tela de "perdido"
        setGuesses(3); // Reseta o número de tentativas
      }
    }
  };
  

  //Função para tentar novamente
  //É importante lembrar que será necessário resetar todos os pontos
  const retry = () => {
    setGameStage(stages[0].name);
  };

  return (
    <Fragment>
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <GameScreen
          verifyLetter={verifyLetter}
          categoryResult={picketCategory}
          wordResult={picketWord}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "final" && <FinalScreen retry={retry} />}
    </Fragment>
  );
}

export default App;
