import usePositions from './usePositions';
import randomize from './randomize';
import findWinIndex from './findWinIndex';
import {
  CORNERS,
  CENTER_INDEX,
  OVERLAP_CORNERS,
  OPPOSITE_CORNERS,
} from '../config';

const getNextMoveIndex = (state) => {
  let index = null;
  const { zeroPositions, crossPositions, emptyPositions } = usePositions(
    state.field,
  );

  switch (state.moveCounter) {
    case 1:
      if (state.field[CENTER_INDEX] === null) {
        index = CENTER_INDEX;
      } else {
        index = CORNERS[randomize(CORNERS.length)];
      }
      break;
    case 3:
      index = findWinIndex(crossPositions, emptyPositions);
      if (index === null) {
        let maybePositions = CORNERS.filter(
          (el) => !crossPositions.includes(el) && emptyPositions.includes(el),
        );
        const crossIndex = crossPositions.join('');
        if (maybePositions.length === 4) {
          maybePositions = maybePositions.filter(
            (el) => el !== OPPOSITE_CORNERS[crossIndex],
          );
        } else if (maybePositions.length === 3) {
          const overlapCorner = OVERLAP_CORNERS[crossIndex];
          maybePositions = overlapCorner ? [overlapCorner] : maybePositions;
        }
        index = maybePositions[randomize(maybePositions.length)];
      }
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

  return index;
};

export default getNextMoveIndex;
