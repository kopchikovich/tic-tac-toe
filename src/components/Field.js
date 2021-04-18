import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
} from 'react-native';
import { ZERO, CROSS, Colors } from '../config';
import Cross from './Cross';
import Zero from './Zero';

const Field = ({ content, onPress }) => {
  return (
    <View style={style.container}>
      {content.map((cell, index) => {
        return (
          <TouchableWithoutFeedback key={index} onPress={() => onPress(index)}>
            <View style={[style.cell, style[`cell-${index + 1}`]]}>
              {cell === ZERO ? <Zero /> : cell === CROSS ? <Cross /> : null}
            </View>
          </TouchableWithoutFeedback>
        );
      })}
      {/* {isWin && <View style={style.winLine} />} */}
    </View>
  );
};

const CELL_SIZE = 100;
const BORDER_WIDTH = 6;

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

const style = StyleSheet.create({
  container: {
    width: CELL_SIZE * 3,
    height: CELL_SIZE * 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    borderWidth: BORDER_WIDTH,
    borderColor: Colors.border,
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
  // winLine: {
  //   width: BORDER_WIDTH * 2,
  //   height: CELL_SIZE * 3,
  //   backgroundColor: 'limegreen',
  //   position: 'absolute',
  //   top: 0,
  //   left: CELL_SIZE / 2 - (BORDER_WIDTH + BORDER_WIDTH / 2),
  // },
});

export default Field;
