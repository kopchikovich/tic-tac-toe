import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Zero = () => {
  return <Text style={styles.item}>O</Text>;
};

const styles = StyleSheet.create({
  item: {
    fontSize: 60,
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default Zero;
