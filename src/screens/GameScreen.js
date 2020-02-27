/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import Card from '../components/Card';
import NumberContainer from '../components/NumberConatiner';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const {width, height} = Dimensions.get('window');

const randomNumberGeneratorBetwen = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return randomNumberGeneratorBetwen(min, max, exclude);
  }
  return randomNumber;
};

const listItem = (listLenght, itemData) => (
  <View key={itemData.item} style={styles.listItem}>
    <BodyText>#{listLenght - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = props => {
  const initialGuess = randomNumberGeneratorBetwen(1, 100, userChoise);
  const [currentGuess, setCurrentGues] = useState(initialGuess);
  // const [roundNumber, setRoundNumber] = useState(0);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get('window').width,
  );
  const [isPortrait, setIsPortrait] = useState(
    Dimensions.get('window').width < Dimensions.get('window').height,
  );

  const lowestNumber = useRef(1);
  const greaterNumber = useRef(100);

  const {userChoise, onGameOver} = props;

  useEffect(() => {
    const updateLayout = () => {
      setIsPortrait(isPortrait => !isPortrait);
      setButtonWidth(Dimensions.get('window').width);
    };
    Dimensions.addEventListener('change', updateLayout);
    return () => Dimensions.removeEventListener('change', updateLayout);
  });

  useEffect(() => {
    if (currentGuess === userChoise) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, onGameOver, userChoise]);

  const nextGuesshandler = isLower => {
    if (
      (isLower && userChoise > currentGuess) ||
      (!isLower && userChoise < currentGuess)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        {text: 'Sorry!', style: 'cancel'},
      ]);
      return;
    }
    if (isLower) {
      greaterNumber.current = currentGuess;
    } else {
      lowestNumber.current = currentGuess + 1;
    }
    const nextGuessNumber = randomNumberGeneratorBetwen(
      lowestNumber.current,
      greaterNumber.current,
      currentGuess,
    );
    setCurrentGues(nextGuessNumber);
    setPastGuesses(curPastGuesses => [
      nextGuessNumber.toString(),
      ...curPastGuesses,
    ]);
  };

  if (!isPortrait) {
    return (
      <View style={styles.gameConatiner}>
        <TitleText>
          <Text style={styles.title}>Opponent's Guess</Text>
        </TitleText>
        <Card style={styles.card}>
          <View style={styles.buttonContainer}>
            <MainButton
              buttonStyle={{
                backgroundColor: Colors.reset,
                width: buttonWidth * 0.2,
                ...styles.button,
              }}
              onPress={() => nextGuesshandler(true)}>
              <Icon name="minus" size={40} color="white" />
            </MainButton>
            <NumberContainer>{currentGuess}</NumberContainer>
            <MainButton
              buttonStyle={{
                backgroundColor: Colors.confirm,
                width: buttonWidth * 0.2,
                ...styles.button,
              }}
              onPress={() => nextGuesshandler(false)}>
              <Icon name="plus" size={40} color="white" />
            </MainButton>
          </View>
        </Card>
        <View style={styles.listContainer}>
          {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            listItem(guess, pastGuesses.length - index),
          )}
        </ScrollView> */}
          <FlatList
            keyExtractor={item => item}
            data={pastGuesses}
            renderItem={listItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.gameConatiner}>
      <TitleText>
        <Text style={styles.title}>Opponent's Guess</Text>
      </TitleText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.card}>
        <View style={styles.buttonContainer}>
          <MainButton
            buttonStyle={{
              backgroundColor: Colors.reset,
              width: buttonWidth * 0.25,
              ...styles.button,
            }}
            onPress={() => nextGuesshandler(true)}>
            <Icon name="minus" size={40} color="white" />
          </MainButton>
          <MainButton
            buttonStyle={{
              backgroundColor: Colors.confirm,
              width: buttonWidth * 0.25,
              ...styles.button,
            }}
            onPress={() => nextGuesshandler(false)}>
            <Icon name="plus" size={40} color="white" />
          </MainButton>
        </View>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            listItem(guess, pastGuesses.length - index),
          )}
        </ScrollView> */}
        <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={listItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gameConatiner: {
    alignItems: 'center',
    padding: 15,
    flex: 1,
    // backgroundColor: 'white',
  },
  listItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
  },
  listContainer: {
    flex: 1,
    width: width > 350 ? '60%' : '80%',
  },
  list: {
    flexGrow: 1,
    // alignItems: 'center',
    justifyContent: 'flex-end',
  },
  card: {
    width: '80%',
    marginVertical: height > 600 ? 20 : 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    // width: 120,
    height: 60,
    borderRadius: 30,
  },
  buttonTitle: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
  },
});

export default GameScreen;
