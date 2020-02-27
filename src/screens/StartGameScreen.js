import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberConatiner';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import colors from '../constants/colors';

const {width} = Dimensions.get('window');

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState('');
  const [buttonWidth, setButtonWidth] = useState(width / 4);

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    };

    Dimensions.addEventListener('change', updateLayout);
    return () => Dimensions.removeEventListener('change', updateLayout);
  });

  const inputNumberHandler = input => {
    setEnteredValue(input.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setIsConfirmed(false);
  };

  const confirmInputHandler = () => {
    const choosenNumber = parseInt(enteredValue);
    if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
      Alert.alert(
        'Invalid Number!',
        'Number has to be a number between 1 and 99.',
        [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}],
      );
      return;
    }
    setIsConfirmed(true);
    setSelectedNumber(choosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  };

  let confirmedOutput;
  if (isConfirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer style={styles.numberBox}>
          {selectedNumber}
        </NumberContainer>
        <MainButton
          buttonStyle={styles.startBtn}
          onPress={() => props.onGameStart(selectedNumber)}>
          Start a Game
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game!</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText>Select a Number</BodyText>
              <Input
                placeholder="..."
                keyboardType="numeric"
                blurOnSumbit
                maxLength={2}
                caretHidden={true}
                style={styles.input}
                onChangeText={inputNumberHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                {/* <View style={styles.button}>
              <Button
                title="Reset"
                color={colors.reset}
                onPress={resetInputHandler}
              />
            </View> */}
                <MainButton
                  onPress={resetInputHandler}
                  buttonStyle={{...styles.resetBtn, width: buttonWidth}}>
                  Reset
                </MainButton>
                <MainButton
                  onPress={confirmInputHandler}
                  buttonStyle={{...styles.confirmBtn, width: buttonWidth}}>
                  Confirm
                </MainButton>
                {/* <View style={styles.button}>
              <Button
                title="Confirm"
                color={colors.confirm}
                onPress={confirmInputHandler}
              />
            </View> */}
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    maxWidth: '95%',
    minWidth: 300,
    alignItems: 'center',
  },
  input: {
    textAlign: 'center',
    fontSize: 20,
    color: colors.primary,
  },
  title: {
    marginVertical: 10,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-around',
  },
  startBtn: {
    width: 150,
    backgroundColor: colors.primary,
  },
  resetBtn: {
    // width: width / 4,
    backgroundColor: colors.reset,
  },
  confirmBtn: {
    // width: width / 4,
    backgroundColor: colors.confirm,
  },
  button: {
    width: '40%',
  },
  summaryContainer: {
    width: '50%',
    marginVertical: 20,
    alignItems: 'center',
  },
  numberBox: {
    width: '40%',
  },
});

export default StartGameScreen;
