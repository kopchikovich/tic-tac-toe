import AsyncStorage from '@react-native-async-storage/async-storage';
import { CROSS, ZERO, RESULT } from '../config';

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

export default saveResult;
