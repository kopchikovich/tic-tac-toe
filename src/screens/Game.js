import React, {useReducer, useEffect} from 'react';
import {Alert, SafeAreaView, StyleSheet, View, Button} from 'react-native';
import Field from '../components/Field';
import {
  CROSS,
  ZERO,
  MOVE,
  RELOAD,
  STOP,
  MAX_MOVES,
  WIN_PATTERNS,
} from '../config/constants';

const reducer = (state, action) => {
  const {type, payload} = action;
  switch (type) {
    case MOVE:
      const isCross = state.whoseMove === CROSS;
      const newState = {
        ...state,
        whoseMove: isCross ? ZERO : CROSS,
        moveCounter: state.moveCounter + 1,
      };
      newState.field[payload.index] = isCross ? CROSS : ZERO;
      return newState;
    case RELOAD:
      return makeInitialState();
    case STOP:
      return {...state, moveCounter: MAX_MOVES};
    default:
      throw new Error('Update state error');
  }
};

const makeInitialState = () => ({
  whoseMove: CROSS,
  field: new Array(9).fill(null),
  moveCounter: 0,
});

const randomize = (maxNum) => Math.floor(Math.random() * maxNum);

const findWinIndex = (positions, emptyPositions) => {
  let index = null;
  WIN_PATTERNS.forEach((pattern) => {
    if (positions.every((pos) => pattern.includes(pos))) {
      const maybeIndex = pattern.filter((i) => positions.indexOf(i) === -1)[0];
      if (emptyPositions.includes(maybeIndex)) {
        index = maybeIndex;
      }
    }
  });
  return index;
};

const getPairs = (arr) => {
  // TODO

  if (arr.length === 3) {
    // [0, 1, 2]
    return [
      [arr[0], arr[1]],
      [arr[0], arr[2]],
      [arr[1], arr[2]],
    ];
  } else if (arr.length === 4) {
    // [0, 1, 2, 3]
    return [
      [arr[0], arr[1]],
      [arr[0], arr[2]],
      [arr[0], arr[3]],
      [arr[1], arr[2]],
      [arr[1], arr[3]],
      [arr[2], arr[3]],
    ];
  }
};

const GameScreen = () => {
  const [state, dispatch] = useReducer(reducer, makeInitialState());

  const usePositions = () => {
    const zeroPositions = [];
    const crossPositions = [];
    const emptyPositions = [];
    state.field.forEach((el, index) => {
      if (el === CROSS) {
        crossPositions.push(index);
      } else if (el === ZERO) {
        zeroPositions.push(index);
      } else {
        emptyPositions.push(index);
      }
    });
    return {zeroPositions, crossPositions, emptyPositions};
  };

  const checkWin = () => {
    const verifiable = state.whoseMove === CROSS ? ZERO : CROSS;
    const positions = usePositions()[`${verifiable.toLowerCase()}Positions`];
    if (positions.length < 3) return;
    const isWin = WIN_PATTERNS.some((pattern) => {
      return pattern.every((pos) => positions.includes(pos));
    });
    if (isWin) {
      dispatch({type: STOP});
      Alert.alert(verifiable + ' win!');
    } else if (state.moveCounter >= MAX_MOVES) {
      Alert.alert('Draw!');
    }
    return isWin;
  };

  useEffect(() => {
    const isFinish = checkWin();
    if (
      state.whoseMove === ZERO &&
      state.moveCounter < MAX_MOVES &&
      !isFinish
    ) {
      let index = null;
      const CENTER_INDEX = 4;
      const {zeroPositions, crossPositions, emptyPositions} = usePositions();

      switch (state.moveCounter) {
        case 1:
          if (state.field[CENTER_INDEX] === null) {
            index = CENTER_INDEX;
          }
          break;
        case 3:
          index = findWinIndex(crossPositions, emptyPositions);
          break;
        case 5:
          index = findWinIndex(zeroPositions, emptyPositions);
          if (index === null) {
            const pairs = getPairs(crossPositions);
            for (let pair of pairs) {
              index = findWinIndex(pair, emptyPositions);
              if (index !== null) break;
            }
          }
          break;
        case 7:
          const pairs = getPairs(zeroPositions);
          for (let pair of pairs) {
            index = findWinIndex(pair, emptyPositions);
            if (index !== null) break;
          }
          if (index === null) {
            const pairs = getPairs(crossPositions);
            for (let pair of pairs) {
              index = findWinIndex(pair, emptyPositions);
              if (index !== null) break;
            }
          }
          break;
        default:
          break;
      }
      console.log(`step ${state.moveCounter} index:`, index);

      if (index === null) {
        index = emptyPositions[randomize(emptyPositions.length)];
        console.log(`step ${state.moveCounter} RANDOM index: `, index);
      }
      setTimeout(() => dispatch({type: MOVE, payload: {index}}), 1000);
    }
  }, [state.whoseMove]);

  const makeMove = (index) => {
    if (
      state.whoseMove === CROSS &&
      state.field[index] === null &&
      state.moveCounter < MAX_MOVES
    ) {
      dispatch({type: MOVE, payload: {index}});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Field content={state.field} onPress={makeMove} />
      {state.moveCounter >= MAX_MOVES && (
        <View style={styles.reloadBtn}>
          <Button
            title="Start again?"
            onPress={() => dispatch({type: RELOAD})}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reloadBtn: {
    position: 'absolute',
    bottom: 100,
  },
});

export default GameScreen;
