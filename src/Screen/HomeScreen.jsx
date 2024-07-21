import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, FlatList, Text, TouchableOpacity, Alert, ScrollView, Dimensions } from "react-native";
import Header from "../components/Header";
import { getTopHeadlines } from "../../data/getData";
import CategoriesFilter from "../components/CategoriesFilter";
import Loading from "../components/Loading";
import { categoryList } from "../../data/categoryList";
import { getRandomCategories } from "../../data/utils";
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');


//useState: Manages the component's state for articles, loading status, selected category, and page index
const HomeScreen = ({ navigation, route }) => {
  const [dataTopHeadline, setDataTopHeadline] = useState([]);
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState(0);
  const [currentCategory, setCurrentCategory] = useState('');
  const [homeArticles, setHomeArticles] = useState([]);
  const [pageIndex, setPageIndex] = useState({});



  //useEffect: Handles side effects like data fetching when the component mounts,when the selected category changes, or when the route parameters change.

  useEffect(() => {
    // Load home category articles immediately when app loads
    setSelect(0);
    loadHomeArticles();
  }, []);

  const loadHomeArticles = () => {
    const randomCategories = getRandomCategories(categoryList.slice(1), 3); // Get 3 random categories excluding Home
    Promise.all(randomCategories.map(cat => getTopHeadlines(cat.category)))
      .then(results => {
        const mixedArticles = results.map((res, index) => ({
          category: randomCategories[index].name,
          articles: res.articles.slice(0, 5)
        }));
        setHomeArticles(mixedArticles);
      })
      .catch(error => {
        console.error('Error fetching home articles:', error);
        Alert.alert("Error", "Failed to fetch home articles");
      });
  };

  useEffect(() => {
    if (select === 0) {
      loadHomeArticles();
    } else {
      const categoryToFetch = currentCategory || (categoryList.length > 0 && categoryList[select]?.category);
      if (categoryToFetch) {
        setLoading(true);
        getTopHeadlines(categoryToFetch)
          .then((res) => {
            console.log('Fetched articles:', res.articles);
            setDataTopHeadline(res.articles);
          })
          .catch((error) => {
            console.error('Error fetching articles:', error);
            Alert.alert("Error", "Failed to fetch articles");
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, [select, currentCategory]);

  useEffect(() => {
    if (route.params?.category) {
      setCurrentCategory(route.params.category);
      setSelect(-1);
    } else {
      setCurrentCategory('');
    }
  }, [route.params?.category]);

  const setFilter = (index) => {
    setSelect(index);
    setCurrentCategory('');
  };

  const handlePress = (article) => {
    navigation.navigate('Details', { article });
  };

  const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
  };

  const renderCategoryNews = ({ category, articles }) => {
    const currentIndex = pageIndex[category] || 0;

    return (
      <View key={category} style={styles.categorySection}>
        <View style={styles.categoryTitleContainer}>
          <Text style={[styles.categoryTitle, { fontFamily: 'Merriweather-Bold' }]}>
            {capitalizeFirstLetter(category)}
          </Text>
          <Text style={styles.dot}>•</Text>
        </View>
        <FlatList
          horizontal
          data={articles}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)} style={styles.newsItemHorizontal}>
              {item.urlToImage ? (
                <Image source={{ uri: item.urlToImage }} style={styles.imageHorizontal} />
              ) : (
                <View style={styles.placeholderImageHorizontal} />
              )}
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>
                {item.description ? item.description : "No description available"}
              </Text>
              <Text style={styles.date}>{new Date(item.publishedAt).toDateString()}</Text>
            </TouchableOpacity>
          )}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          snapToInterval={width * 0.8 + 16}
          decelerationRate="fast"
          onScroll={(event) => {
            const newIndex = Math.round(event.nativeEvent.contentOffset.x / (width * 0.8 + 16));
            setPageIndex((prevState) => ({ ...prevState, [category]: newIndex }));
          }}
        />
        <View style={styles.dotsContainer}>
          {articles.map((_, i) => (
            <View key={i} style={[styles.dot, { opacity: currentIndex === i ? 1 : 0.3 }]} />
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={currentCategory ? capitalizeFirstLetter(currentCategory) : 'news'} />
      <CategoriesFilter
        categories={categoryList}
        select={select}
        setFilter={setFilter}
      />
      <View style={styles.extraLine} />
      {loading ? (
        <Loading />
      ) : (
        <ScrollView contentContainerStyle={styles.newsContainer}>
          {select === 0 ? (
            homeArticles.map(renderCategoryNews)
          ) : (
            dataTopHeadline.slice(0, 5).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)).map(item => (
              <TouchableOpacity key={item.url} onPress={() => handlePress(item)} style={styles.newsItem}>
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
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E8F0',
  },
  extraLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    marginVertical: -10,
  },
  newsContainer: {
    paddingTop: 16,
    paddingHorizontal: 8,
  },
  newsItem: {
    marginBottom: 13,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  newsItemHorizontal: {
    width: width * 0.8, 
    marginHorizontal: 8,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  imageHorizontal: {
    width: '100%',
    height: 150, 
    borderRadius: 5,
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    backgroundColor: '#d3d3d3',
  },
  placeholderImageHorizontal: {
    width: '100%',
    height: 150, 
    borderRadius: 5,
    backgroundColor: '#d3d3d3',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Merriweather-Bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 12.5,
    paddingTop: 8,
    textAlign: 'center',
 
  },
  date: {
    fontSize: 12,
    color: 'grey',
    textAlign: 'center',
    paddingTop: 8,
  },
  categorySection: {
    marginTop: 20,
    
  },
  categoryTitleContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginLeft: 10,
    marginBottom: 9,
    marginTop: -10,
  },
  categoryTitle: {
    marginTop: 10,
    fontSize: 14.5,
    fontWeight: 'bold',
    color: 'black',
  },
  dot: {
    fontSize: 14,
    color: '#ff6347',
    lineHeight: 14,
    marginLeft: -1,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default HomeScreen;
