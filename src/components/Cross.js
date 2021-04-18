import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { Colors } from '../config';

const Cross = () => {
  return (
    <View style={[StyleSheet.absoluteFill, style.container]}>
      <Svg height="70%" width="70%" viewBox="0 0 100 100">
        <Line
          x1="10"
          y1="10"
          x2="90"
          y2="90"
          stroke={Colors.cross}
          strokeWidth="25"
        />
        <Line
          x1="90"
          y1="10"
          x2="10"
          y2="90"
          stroke={Colors.cross}
          strokeWidth="25"
        />
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

export default Cross;
