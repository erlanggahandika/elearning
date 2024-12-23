import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Animated, Image, TextInput, StatusBar, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Navbar from '../../utils/components/Navbar.js';
import TopBar from '../../utils/components/Topbar.js';
import { useTheme } from '../../utils/hooks/themes/ThemeContext.js'; 
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { theme, toggleDarkMode } = useTheme(); 
  const [username, setUsername] = useState('');
  const [searchText, setSearchText] = useState('');
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const [currentBanner, setCurrentBanner] = useState(0);

  //declare color dlu
  const blue = '#00bcd4';
  const white = '#f9f9f9';

  const banners = [
    require('../../assets/images/banner1.jpeg'),
    require('../../assets/images/banner2.jpeg'),
    require('../../assets/images/banner1.jpeg'),
    require('../../assets/images/banner2.jpeg'),
  ];

  const categoryBackgrounds = {
    Polri: require('../../assets/images/resetpw.png'),
    TNI: require('../../assets/images/resetpw.png'),
    CPNS: require('../../assets/images/resetpw.png'),
    OTHER: require('../../assets/images/resetpw.png'),
  };

  useEffect(() => {
    StatusBar.setBarStyle(theme.darkMode ? 'light-content' : 'dark-content');
  }, [theme.darkMode]);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error('Failed to load username:', error);
      }
    };

    fetchUsername();

    // set banner 3 detik
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor}]}>
      {/* Header Section */}
      <TopBar />

      {/* Main Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.greetingText, { color: theme.darkMode ? white : blue }]}>
          Hello, {username || 'John Doe'}!
        </Text>

        {/* Banner Section */}
        <View style={styles.banner}>
          <Image source={banners[currentBanner]} style={styles.bannerImage} resizeMode="cover" />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Lets Start Your Bimble"
            value={searchText}
            onChangeText={setSearchText}
          />
          <Ionicons name="search" size={20} color="#757575" style={styles.searchIcon} />
        </View>

        <Text style={[styles.sectionTitle, { color: theme.darkMode ? white : blue }]}>Catalog</Text>
        <ScrollView horizontal={true} contentContainerStyle={styles.categoryContainer} showsHorizontalScrollIndicator={false}>
        {['Polri', 'TNI', 'CPNS', 'OTHER'].map((category, index) => (
        <View key={index} style={[styles.categoryCard, { backgroundColor: theme.darkMode ? '#f09724' : '#fff' }]}>
        <ImageBackground 
        source={categoryBackgrounds[category]} 
        style={styles.categoryBackground} 
        imageStyle={styles.categoryImage}
        resizeMode="cover"
        >
      </ImageBackground>
        <Text style={[styles.categoryText, { color: theme.darkMode ? white : blue }]}>{category}</Text>
       </View>
        ))}
        </ScrollView>


        {/* Instructor Section */}
        <Text style={[styles.sectionTitle, { color: theme.darkMode ? white : blue }]}>Top Mentor Of The Week</Text>

        {/* Courses Section */}
        <Text style={[styles.sectionTitle, { color: theme.darkMode ? white : blue }]}>All Course</Text>
        <View style={styles.cardContainer}>
          {[1, 2, 3, 4].map((course, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>Bootcamp {course}</Text>
              <Text style={styles.cardDescription}>
                Learn the basics of coding and development in this engaging bootcamp.
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Navbar Section */}
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoryTextContainer: {
    fontSize: 12,
  fontWeight: 'bold',
  color: '#FF5722',
  marginTop: 5,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginStart: 15,
    marginTop: 15,
    marginEnd: 25,
    alignItems: 'center',
    zIndex: 2,  
  },
  headerText: {
    flex: 1,
    paddingTop: 35,
    fontSize: 28,
    fontWeight: 'bold',
  },
  notificationButton: {
    paddingTop: 35,
  },
  themeToggleButton: {
    paddingTop: 35,
    marginLeft: 10,
  },
  content: {
    flex: 1,
    marginTop: 30,
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  greetingText: {
    marginTop: 35,
    fontSize: 17,
  },
  banner: {
    height: 200,
    backgroundColor: '#e0f7fa',
    marginTop: 16,
    padding: 8,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 10,
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 8,
    paddingRight: 250, //ini buat kenanan terus
  },
  categoryCard: {
    width: '40%',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    height: 140,
    justifyContent: 'center',
  },
  categoryBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  categoryImage: {
    borderRadius: 8,
  },
  categoryCardText: {
    paddingTop: 80,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00bcd4',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 17,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  card: {
    width: '47%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00bcd4',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 12,
    color: '#757575',
  },
  
});

export default HomeScreen;
