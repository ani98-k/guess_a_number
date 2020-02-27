import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../constants/colors';

const NumberContainer = props => {
  return (
    <View style={{...styles.container, ...props.style}}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.reset,
    padding: 10,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  number: {
    fontSize: 24,
    color: Colors.confirm,
    textAlign: 'center',
  },
});

export default NumberContainer;
