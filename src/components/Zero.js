import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Zero = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.item}>0</Text>
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
    fontSize: 60,
    color: 'blue',
    fontWeight: 'bold',
    transform: [{skewY: '5deg'}]
  },
});

export default Zero;
