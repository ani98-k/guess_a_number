import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

const MainButton = props => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View styl={styles.buttonContainer}>
      <TouchableComponent activeOpacity={0.8} onPress={props.onPress}>
        <View style={{...styles.button, ...props.buttonStyle}}>
          <Text style={{...styles.buttonText, ...props.textStyle}}>
            {props.children}
          </Text>
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  button: {
    // paddingHorizontal: 30,
    // width: 100,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'OpenSans-Regular',
  },
});

export default MainButton;
