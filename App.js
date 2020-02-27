/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import Header from './src/components/Header';
import StartGameScreen from './src/screens/StartGameScreen';
import GameScreen from './src/screens/GameScreen';
import GameOverScreen from './src/screens/GameOverScreen';

const App = () => {
  const [userNumber, setUserNumber] = useState();
  const [guessRoundNumber, setGuessRoundNumber] = useState(0);

  const startGameHandler = number => {
    setUserNumber(number);
    setGuessRoundNumber(0);
  };

  const gameOverHandler = roundNumber => {
    setGuessRoundNumber(roundNumber);
  };

  const newGameHandler = () => {
    setUserNumber();
    setGuessRoundNumber(0);
  };

  let content =
    userNumber && guessRoundNumber <= 0 ? (
      <GameScreen userChoise={userNumber} onGameOver={gameOverHandler} />
    ) : (
      <StartGameScreen onGameStart={startGameHandler} />
    );

  if (guessRoundNumber > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessRoundNumber}
        userNumber={userNumber}
        onReset={newGameHandler}
      />
    );
  }

  return (
    <View style={{flex: 1}}>
      <Header title="Gess a Number" />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({});

export default App;
