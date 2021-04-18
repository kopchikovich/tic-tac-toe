import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Colors } from '../config';

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={style.container}>
        <Text style={style.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.button,
    marginTop: 5,
  },
  text: {
    color: Colors.text,
    fontWeight: '600',
    fontSize: 20,
  },
});

export default Button;
