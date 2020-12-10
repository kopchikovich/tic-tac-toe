import React from 'react';
import { Button, SafeAreaView, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Button
        style={styles.button}
        title="START GAME"
        onPress={() => navigation.navigate('Game')}
      />
      <Button
        style={styles.button}
        title="VIEW RESULTS"
        onPress={() => navigation.navigate('Result')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 5,
  },
});

export default HomeScreen;
