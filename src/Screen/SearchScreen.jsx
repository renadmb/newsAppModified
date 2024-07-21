import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, Alert, KeyboardAvoidingView, Platform } from "react-native";
import Header from "../components/Header";
import { getEverything } from "../../data/getData";
import Loading from "../components/Loading";

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (query.trim()) {
      setLoading(true);
      getEverything(query)
        .then((res) => {
          setResults(res.articles);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          Alert.alert("Error", "Failed to fetch search results");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handlePress = (article) => {
    navigation.navigate('Details', { article });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Header navigation={navigation} title=" news" />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for news..."
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)} style={styles.newsItem}>
              {item.urlToImage ? (
                <Image source={{ uri: item.urlToImage }} style={styles.image} />
              ) : (
                <View style={styles.placeholderImage} />
              )}
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>
                {item.description ? item.description : "No description available"}
              </Text>
              <Text style={styles.date}>{new Date(item.publishedAt).toDateString()}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2E8F0",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  searchButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  newsItem: {
    marginBottom: 13,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    backgroundColor: '#d3d3d3',
  },
  title: {
    fontSize: 16.5,
    fontWeight: 'bold',
    fontFamily: 'Merriweather-Bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    paddingTop: 8,
    textAlign: 'center',
  },
  date: {
    fontSize: 14,
    color: 'grey',
    textAlign: 'center',
  },
});

export default SearchScreen;
