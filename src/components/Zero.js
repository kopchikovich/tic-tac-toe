import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Zero = () => {
  return (
    <Image source={require('../../assets/zero.png')} style={styles.item} />
  );
};

const styles = StyleSheet.create({
  item: {
    width: 67,
    height: 67,
  },
});

export default Zero;
