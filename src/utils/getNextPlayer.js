import { CROSS, ZERO } from '../config';

const getNextPlayer = (currentPlayer) => {
  return currentPlayer === CROSS ? ZERO : CROSS;
};

export default getNextPlayer;
