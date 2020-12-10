import React, { useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, SafeAreaView, StyleSheet, View, Button } from 'react-native';
import {
  CROSS,
  ZERO,
  MOVE,
  RELOAD,
  STOP,
  RESULT,
  MAX_MOVES,
  MOVE_DELAY,
  WIN_PATTERNS,
} from '../config/constants';
import { getPairs, randomize } from '../utils';
import { Field } from '../components';

const reducer = (state, action) => {
  switch (action.type) {
    case MOVE:
      const nextState = {
        ...state,
        whoseMove: changePlayer(state.whoseMove),
        moveCounter: state.moveCounter + 1,
      };
      nextState.field[action.payload.index] = state.whoseMove;
      return nextState;
    case RELOAD:
      return makeInitialState();
    case STOP:
      return { ...state, moveCounter: MAX_MOVES };
    default:
      throw new Error(
        'Update state error.',
        `Current state: ${state}`,
        `Action: ${action}`,
      );
  }
};

const makeInitialState = () => ({
  whoseMove: CROSS,
  field: new Array(9).fill(null),
  moveCounter: 0,
});

const changePlayer = (currentPlayer) => {
  return currentPlayer === CROSS ? ZERO : CROSS;
};

const findWinIndex = (positions, emptyPositions) => {
  let index = null;
  if (positions.length > 2) {
    const pairs = getPairs(positions);
    for (let pair of pairs) {
      index = findWinIndex(pair, emptyPositions);
      if (index !== null) break;
    }
  } else {
    WIN_PATTERNS.forEach((pattern) => {
      if (positions.every((pos) => pattern.includes(pos))) {
        const maybeIndex = pattern.filter(
          (i) => positions.indexOf(i) === -1,
        )[0];
        if (emptyPositions.includes(maybeIndex)) {
          index = maybeIndex;
        }
      }
    });
  }
  return index;
};

const usePositions = (field) => {
  const zeroPositions = [];
  const crossPositions = [];
  const emptyPositions = [];
  field.forEach((el, index) => {
    if (el === CROSS) {
      crossPositions.push(index);
    } else if (el === ZERO) {
      zeroPositions.push(index);
    } else {
      emptyPositions.push(index);
    }
  });
  return { zeroPositions, crossPositions, emptyPositions };
};

const saveResult = async (winner) => {
  const oldResult = await AsyncStorage.getItem(RESULT);
  if (!oldResult) {
    AsyncStorage.setItem(
      RESULT,
      JSON.stringify({
        win: {
          [CROSS]: winner === CROSS ? 1 : 0,
          [ZERO]: winner === ZERO ? 1 : 0,
        },
        draw: winner === undefined ? 1 : 0,
      }),
    );
  } else if (winner) {
    const result = JSON.parse(oldResult);
    result.win[winner] += 1;
    AsyncStorage.setItem(RESULT, JSON.stringify(result));
  } else {
    const result = JSON.parse(oldResult);
    result.draw += 1;
    AsyncStorage.setItem(RESULT, JSON.stringify(result));
  }
};

const GameScreen = () => {
  const [state, dispatch] = useReducer(reducer, makeInitialState());

  const checkWin = () => {
    const verifiable = changePlayer(state.whoseMove);
    const positions = usePositions(state.field)[
      `${verifiable.toLowerCase()}Positions`
    ];
    if (positions.length < 3) return;
    const isWin = WIN_PATTERNS.some((pattern) => {
      return pattern.every((pos) => positions.includes(pos));
    });
    if (isWin) {
      dispatch({ type: STOP });
      Alert.alert(verifiable + ' win!');
      saveResult(verifiable);
    } else if (state.moveCounter >= MAX_MOVES) {
      Alert.alert('Draw!');
      saveResult();
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
      const { zeroPositions, crossPositions, emptyPositions } = usePositions(
        state.field,
      );

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
        case 7:
          index = findWinIndex(zeroPositions, emptyPositions);
          if (index === null) {
            index = findWinIndex(crossPositions, emptyPositions);
          }
          break;
        default:
          break;
      }
      if (index === null) {
        index = emptyPositions[randomize(emptyPositions.length)];
      }

      setTimeout(
        () => dispatch({ type: MOVE, payload: { index } }),
        MOVE_DELAY,
      );
    }
  }, [state.whoseMove]);

  const makeMove = (index) => {
    if (
      state.whoseMove === CROSS &&
      state.field[index] === null &&
      state.moveCounter < MAX_MOVES
    ) {
      dispatch({ type: MOVE, payload: { index } });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Field content={state.field} onPress={makeMove} />
      {state.moveCounter >= MAX_MOVES && (
        <View style={styles.reloadBtn}>
          <Button
            title="Start again?"
            onPress={() => dispatch({ type: RELOAD })}
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
