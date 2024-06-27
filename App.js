import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { gStyle } from './styles/style';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import MainStack from './navigate';
import { ThemeProvider } from './ThemeContext';

const fonts = () => Font.loadAsync({
  'text-r': require('./assets/fonts/Ubuntu-Regular.ttf'),
  'text-b': require('./assets/fonts/Ubuntu-Bold.ttf'),
})

export default function App() {
  const [font, setFont] = useState(false);

  if(font) {
    return (
      <ThemeProvider>
        <MainStack/>
      </ThemeProvider>
    );
  } else {
    return (
      <AppLoading startAsync={fonts} onFinish={() => setFont(true)} onError={console.warn} />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
