import { CROSS } from '../config';

const getInitialState = () => ({
  whoseMove: CROSS,
  field: new Array(9).fill(null),
  moveCounter: 0,
  winner: null,
});

export default getInitialState;
