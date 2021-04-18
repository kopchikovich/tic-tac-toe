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
    <SafeAreaView style={style.container}>
      <View style={style.row}>
        <View style={style.box}>
          <Cross />
        </View>
        <Text style={style.text}>Win {result.win[CROSS]} times</Text>
      </View>
      <View style={style.row}>
        <View style={style.box}>
          <Zero />
        </View>
        <Text style={[style.text, { marginLeft: 23 }]}>
          Win {result.win[ZERO]} times
        </Text>
      </View>
      <View style={style.row}>
        <Image
          style={style.emptyElement}
          source={require('../../assets/draw.png')}
        />
        <Text style={style.text}>Draw {result.draw} times</Text>
      </View>
      <View style={style.menuButton}>
        <Button title="MENU" onPress={navigation.goBack} />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
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
  box: {
    width: 60,
    height: 60,
  },
  text: {
    fontSize: 24,
    marginLeft: 20,
    color: Colors.text,
  },
  emptyElement: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  menuButton: {
    marginTop: 20,
  },
});

export default ResultScreen;
