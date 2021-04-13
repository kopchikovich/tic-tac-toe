import { Alert } from 'react-native';
import { STOP, MAX_MOVES, ZERO, MOVE, MOVE_DELAY } from '../config';
import { findWinner, getNextMoveIndex } from '../utils';
import saveResult from './saveResult';

const onMoveEffect = (state, dispatch) => {
  const winner = findWinner(state);
  if (winner) {
    dispatch({ type: STOP });
    Alert.alert(winner + ' win!');
    saveResult(winner);
  } else if (state.moveCounter >= MAX_MOVES) {
    Alert.alert('Draw!');
    saveResult();
  } else if (state.whoseMove === ZERO) {
    setTimeout(
      () =>
        dispatch({ type: MOVE, payload: { index: getNextMoveIndex(state) } }),
      MOVE_DELAY,
    );
  }
};

export default onMoveEffect;
