import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { CROSS, ZERO, RESULT } from '../config/constants';
import { Cross, Zero } from '../components';

const SOME = 'some';

const ResultScreen = () => {
  const [result, setResult] = useState({
    win: { [CROSS]: SOME, [ZERO]: SOME },
    draw: SOME,
  });

  useEffect(() => {
    AsyncStorage.getItem(RESULT).then((res) => {
      if (res) {
        setResult(JSON.parse(res));
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Cross />
        <Text style={styles.text}>win {result.win[CROSS]} times</Text>
      </View>
      <View style={styles.row}>
        <Zero />
        <Text style={styles.text}>win {result.win[ZERO]} times</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Draw {result.draw} times</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 200,
  },
  text: {
    fontSize: 24,
    marginLeft: 20,
  },
});

export default ResultScreen;
