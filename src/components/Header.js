import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

import colors from '../constants/colors';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Header = props => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 80,
    // backgroundColor: '#ef3939, #ac4dff',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
      },
      android: {
        backgroundColor: colors.primary,
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
      },
    }),
  },
  title: {
    color: Platform.OS === 'ios' ? colors.primary : 'white',
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
  },
});

export default Header;
