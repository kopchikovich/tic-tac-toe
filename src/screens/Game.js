import React, { useReducer, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { MOVE, CROSS, RELOAD, MAX_MOVES } from '../config';
import { reducer, getInitialState, onMoveEffect } from '../state';
import { Field, Button } from '../components';

const GameScreen = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  useEffect(() => onMoveEffect(state, dispatch), [state.whoseMove]);

  const makeMove = (index) => {
    if (state.whoseMove === CROSS) {
      dispatch({ type: MOVE, payload: { index } });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Field content={state.field} onPress={makeMove} />
      {state.moveCounter >= MAX_MOVES && (
        <View>
          <View style={styles.buttons}>
            <Button
              title="PLAY AGAIN?"
              onPress={() => dispatch({ type: RELOAD })}
            />
            <Button title="MENU" onPress={() => navigation.goBack()} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    position: 'absolute',
    bottom: -100,
    left: -100,
  },
});

export default GameScreen;
