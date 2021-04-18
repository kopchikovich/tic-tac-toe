import 'react-native-gesture-handler';
import React from 'react';
import { Platform, UIManager, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, GameScreen, ResultScreen } from './src/screens';
import { Colors } from './src/config';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode={'none'}
        screenOptions={{
          cardStyle: style.cardStyle,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const style = StyleSheet.create({
  cardStyle: {
    backgroundColor: Colors.background,
  },
});

export default App;
