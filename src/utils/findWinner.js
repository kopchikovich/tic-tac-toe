import getNextPlayer from './getNextPlayer';
import usePositions from './usePositions';
import { WIN_PATTERNS } from '../config';

const findWinner = (state) => {
  const verifiable = getNextPlayer(state.whoseMove);
  const positions = usePositions(state.field)[
    `${verifiable.toLowerCase()}Positions`
  ];

  if (positions.length < 3) {
    return null;
  }

  const isWin = WIN_PATTERNS.some((pattern) => {
    return pattern.every((pos) => positions.includes(pos));
  });

  return isWin ? verifiable : null;
};

export default findWinner;
