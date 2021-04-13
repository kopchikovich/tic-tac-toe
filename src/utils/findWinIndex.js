import { WIN_PATTERNS } from '../config';
import getPairs from './getPairs';

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

export default findWinIndex;
