import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const Input = props => {
  return <TextInput {...props} style={{...props.style, ...styles.input}} />;
};

const styles = StyleSheet.create({
  input: {
    height: 45,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default Input;
