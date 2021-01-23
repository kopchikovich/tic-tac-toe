export const CROSS = 'CROSS';
export const ZERO = 'ZERO';
export const MOVE = 'MOVE';
export const RELOAD = 'RELOAD';
export const STOP = 'STOP';
export const RESULT = 'RESULT';
export const MAX_MOVES = 9;
export const MOVE_DELAY = 1000;

export const CENTER_INDEX = 4;
export const CORNERS = [0, 2, 6, 8];
export const OPPOSITE_CORNERS = {
  13: 8,
  15: 6,
  37: 2,
  57: 0,
};
export const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
