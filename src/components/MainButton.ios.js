import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const MainButton = props => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
      <View style={{...styles.button, ...props.buttonStyle}}>
        <Text style={{...styles.buttonText, ...props.textStyle}}>
          {props.children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
