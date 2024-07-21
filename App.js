import React, { useState, useEffect } from 'react';
import { LogBox, View, Text } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AppNavigator from './src/navigation/AppNavigator';

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Merriweather-Regular': require('./assets/fonts/Merriweather-Regular.ttf'),
      'Merriweather-Bold': require('./assets/fonts/Merriweather-Bold.ttf'),
    });
    setFontsLoaded(true);
    SplashScreen.hideAsync();
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading Fonts...</Text>
      </View>
    );
  }

  return <AppNavigator />;
};

LogBox.ignoreLogs(['Support for defaultProps will be removed from function components']);

export default App;
