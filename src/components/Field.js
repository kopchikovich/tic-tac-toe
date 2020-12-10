import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
} from 'react-native';
import { ZERO, CROSS } from '../config/constants';
import Cross from './Cross';
import Zero from './Zero';

const Field = ({ content, onPress }) => {
  return (
    <View style={styles.container}>
      {content.map((cell, index) => {
        return (
          <TouchableWithoutFeedback key={index} onPress={() => onPress(index)}>
            <View style={[styles.cell, styles[`cell-${index + 1}`]]}>
              {cell === ZERO ? <Zero /> : cell === CROSS ? <Cross /> : null}
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

const CELL_SIZE = 100;
const BORDER_WIDTH = 4;

const fixAndroidBorder = () => {
  if (Platform.OS === 'android') {
    return {
      borderBottomWidth: BORDER_WIDTH + 1,
      transform: [{ translateY: 1 }],
    };
  } else {
    return {};
  }
};

const styles = StyleSheet.create({
  container: {
    width: CELL_SIZE * 3,
    height: CELL_SIZE * 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    borderWidth: BORDER_WIDTH,
    borderColor: 'red',
    width: CELL_SIZE,
    height: CELL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  'cell-1': {
    borderLeftWidth: 0,
    borderTopWidth: 0,
    ...fixAndroidBorder(),
  },
  'cell-2': {
    borderTopWidth: 0,
    ...fixAndroidBorder(),
  },
  'cell-3': {
    borderTopWidth: 0,
    borderRightWidth: 0,
    ...fixAndroidBorder(),
  },
  'cell-4': {
    borderLeftWidth: 0,
  },
  'cell-5': {},
  'cell-6': {
    borderRightWidth: 0,
  },
  'cell-7': {
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  'cell-8': {
    borderBottomWidth: 0,
  },
  'cell-9': {
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
});

export default Field;
