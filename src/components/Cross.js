import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Cross = () => {
  return (
    <Image source={require('../../assets/cross.png')} style={styles.item} />
  );
};

const styles = StyleSheet.create({
  item: {
    width: 70,
    height: 70,
  },
});

export default Cross;
