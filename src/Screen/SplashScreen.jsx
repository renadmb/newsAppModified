import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home"); 
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Animatable.Text
          animation="bounceInLeft"
          duration={2000}
          style={styles.newsText}
        >
          news
        </Animatable.Text>
        <Animatable.Text
          animation="bounceInRight"
          duration={2000}
          style={styles.dotText}
        >
          .
        </Animatable.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsText: {
    fontWeight: 'bold',
    fontSize: 60,
    color: '#000000', 
    fontFamily: 'Merriweather-Bold',
  },
  dotText: {
    fontWeight: 'bold',
    fontSize: 60,
    color: '#ff6347',
    fontFamily: 'Merriweather-Bold',
  },
});

export default SplashScreen;
