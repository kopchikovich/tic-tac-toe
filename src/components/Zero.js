import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors } from '../config';

const Zero = () => {
  return (
    <View style={[StyleSheet.absoluteFill, style.container]}>
      <Svg height="80%" width="80%" viewBox="0 0 100 100">
        <Circle stroke={Colors.zero} cx="50" cy="50" r="35" strokeWidth="20" />
      </Svg>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Zero;
