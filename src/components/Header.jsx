import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Header = ({ navigation, title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topLine} />
      <View style={styles.innerContainer}>
        <Icon name="home-outline" size={25} color="#FF6347" onPress={() => navigation.navigate('Home')} />
        <Text style={styles.title}>{title}<Text style={styles.dot}>.</Text></Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Icon name="search-outline" size={25} color="#FF6347" />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 55,
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
    elevation: 4,
  },
  topLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
  },
  innerContainer: {
    marginHorizontal: 8,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomLine: {
    borderBottomWidth:1,
    borderBottomColor: "#000000",
  },
  title: {
    fontSize: 20,
    color: "#000000",
    fontWeight: "bold",
    fontFamily: 'Merriweather-Bold',
  },
  dot: {
    color: "#FF6347",
    fontSize: 26,
    fontWeight: "bold",
  },
});

export default Header;
