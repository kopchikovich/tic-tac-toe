import React from 'react';
import { Text, Platform, StyleSheet } from 'react-native';

const Cross = () => {
  return <Text style={styles.item}>+</Text>;
};

const fixPosition = () => {
  return Platform.select({
    ios: {
      transform: [{ rotate: '45deg' }, { translateX: 2 }, { translateY: -18 }],
    },
    android: { transform: [{ rotate: '46deg' }, { translateY: -4 }] },
  });
};

const styles = StyleSheet.create({
  item: {
    fontSize: 100,
    color: 'blue',
    ...fixPosition(),
  },
});

export default Cross;
