import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button } from '../components';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Button title="START GAME" onPress={() => navigation.navigate('Game')} />
      <Button
        title="RESULTS"
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
