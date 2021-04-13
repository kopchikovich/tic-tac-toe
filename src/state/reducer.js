import { LayoutAnimation } from 'react-native';
import { animationConfig, MOVE, RELOAD, STOP, MAX_MOVES } from '../config';
import { getNextPlayer } from '../utils';
import getInitialState from './getInitialState';

const reducer = (state, action) => {
  LayoutAnimation.configureNext(animationConfig);
  switch (action.type) {
    case MOVE:
      const index = action.payload.index;
      if (state.field[index] === null && state.moveCounter < MAX_MOVES) {
        const nextState = {
          ...state,
          whoseMove: getNextPlayer(state.whoseMove),
          moveCounter: state.moveCounter + 1,
        };
        nextState.field[index] = state.whoseMove;
        return nextState;
      } else {
        return state;
      }
    case RELOAD:
      return getInitialState();
    case STOP:
      return { ...state, moveCounter: MAX_MOVES };
    default:
      return state;
  }
};

export default reducer;
