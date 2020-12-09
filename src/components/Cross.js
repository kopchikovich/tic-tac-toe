import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Cross = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.item}>+</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    fontSize: 100,
    transform: [{rotate: '-45deg'}, {translateX: -2}, {translateY: -18}],
    color: 'blue',
  },
});

export default Cross;
