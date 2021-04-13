import { CROSS, ZERO } from '../config';

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

export default usePositions;
