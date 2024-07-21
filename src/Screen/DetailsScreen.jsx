import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import RenderHtml from 'react-native-render-html';
import Icon from 'react-native-vector-icons/Ionicons';

const DetailsScreen = ({ route, navigation }) => {
  const { article } = route.params;
  const contentWidth = Dimensions.get('window').width;

  // Helper function to remove placeholder text like "[+8922 chars]"
  const cleanContent = (content) => {
    if (!content) return ''; // Check if content is null or undefined
    const index = content.indexOf('[');
    return index > -1 ? content.substring(0, index).trim() : content;
  };

  // Combine description and cleaned content into a single HTML string
  const combinedContent = `
    ${article.description ? `<p>${article.description}</p>` : ''}
    ${cleanContent(article.content)}
  `;

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: article.urlToImage }} style={styles.imageBackground}>
        <View style={styles.overlay}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={30} color="#FF6347" />
          </TouchableOpacity>
          <Text style={styles.category}>{article.source?.name || 'Unknown Source'}</Text>
          <Text style={styles.title}>{article.title || 'No Title Available'}</Text>
          <Text style={styles.date}>{new Date(article.publishedAt).toDateString()}</Text>
        </View>
      </ImageBackground>
      <ScrollView style={styles.contentContainer}>
        <RenderHtml
          contentWidth={contentWidth}
          source={{ html: combinedContent }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageBackground: {
    width: '100%',
    height: 350,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    paddingTop: 40, 
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  category: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Merriweather-Bold',
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Merriweather-Bold',
  },
  date: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 5,
    fontFamily: 'Merriweather-Bold',
    textAlign: 'right',
  },
  contentContainer: {
    padding: 16,
  },
  content: {
    fontSize: 16,
    fontFamily: 'Merriweather-Bold',
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DetailsScreen;
