import React from "react";
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from "react-native";

const CategoriesFilter = ({ categories, select, setFilter }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.line} />
      <View style={styles.container}>
        <View style={styles.overlay} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                index !== categories.length - 1 && styles.categoryItemWithBorder,
              ]}
              onPress={() => setFilter(index)}
            >
              <Text style={[styles.categoryText, select === index && styles.selected]}>
                {category.name}
              </Text>
              {select === index && <View style={styles.dot} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 8,
    marginVertical: -10,
    paddingBottom:30,
  },
  container: {
    backgroundColor: 'transparent',
    position: 'relative',
    alignItems: 'center',
    paddingVertical: 5,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: -10,
    right: -10,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  scrollView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryItem: {
    paddingHorizontal:15,
    paddingVertical: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryItemWithBorder: {
    borderRightWidth: 1,
    borderRightColor: 'black',
  },
  categoryText: {
    fontSize: 13.5,
    color: 'black',
  },
  selected: {
    color: 'white',
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: '#ff6347',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 5,
  },
});

export default CategoriesFilter;
