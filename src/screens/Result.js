import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, Image, View, Text, StyleSheet } from 'react-native';
import { CROSS, ZERO, RESULT, Colors } from '../config';
import { Cross, Zero, Button } from '../components';

const SOME = 'some';

const ResultScreen = ({ navigation }) => {
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
        <Text style={styles.text}>Win {result.win[CROSS]} times</Text>
      </View>
      <View style={styles.row}>
        <Zero />
        <Text style={[styles.text, { marginLeft: 23 }]}>
          Win {result.win[ZERO]} times
        </Text>
      </View>
      <View style={styles.row}>
        <Image
          style={styles.emptyElement}
          source={require('../../assets/draw.png')}
        />
        <Text style={styles.text}>Draw {result.draw} times</Text>
      </View>
      <Button
        title="MENU"
        onPress={navigation.goBack}
        style={styles.menuButton}
      />
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
    marginTop: 10,
  },
  text: {
    fontSize: 24,
    marginLeft: 20,
    color: Colors.text,
  },
  emptyElement: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  menuButton: {
    marginTop: 20,
  },
});

export default ResultScreen;
