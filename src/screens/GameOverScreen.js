import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';

import Card from '../components/Card';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';
import colors from '../constants/colors';

const {width, height} = Dimensions.get('window');

const GameOverScreen = props => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Card style={styles.card}>
          <TitleText style={styles.text}>Game Over!</TitleText>
          <View style={styles.imageBox}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={require('../../assets/images/success.png')}
            />
          </View>
          <BodyText style={styles.bodyText}>
            Your phone needed{' '}
            <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
            guess the number{' '}
            <Text style={styles.highlight}>{props.userNumber}</Text>
          </BodyText>
          {/* <Button
          title="Reset Game"
          color={Colors.reset}
          onPress={props.onReset}
        /> */}
          <MainButton buttonStyle={styles.resetBtn} onPress={props.onReset}>
            NEW GAME
          </MainButton>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: height < 400 ? 16 : 20,
  },
  bodyText: {
    textAlign: 'center',
    fontSize: 20,
    // marginVertical: 10,
  },
  card: {
    width: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetBtn: {
    width: width * 0.5,
    backgroundColor: colors.primary,
  },
  imageBox: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: (width * 0.7) / 2,
    borderWidth: 2,
    borderColor: 'gray',
    overflow: 'hidden',
    marginVertical: height / 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  highlight: {
    color: Colors.reset,
    fontFamily: 'OpenSans-Bold',
  },
});

export default GameOverScreen;
