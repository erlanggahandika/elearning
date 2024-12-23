import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import TopBar from '../../utils/components/Topbar';

const CatalogScreen = () => {
  return (
    <View style={styles.container}>
         <TopBar />  
      <View style={styles.header}>
        <Text style={styles.headerText}>9:41</Text>
        <Image source={require('../../assets/images/resetpw.png')} style={styles.wifiIcon} />
      </View>
      <View style={styles.profile}>
        <Text style={styles.greeting}>Hello,</Text>
        <Text style={styles.name}>Alonzo Lee</Text>
        <Image source={require('../../assets/images/resetpw.png')} style={styles.profileIcon} />
      </View>
      <View style={styles.search}>
        <View style={styles.searchInput}>
          <Text style={styles.searchPlaceholder}>Search</Text>
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Image source={require('../../assets/images/resetpw.png')} style={styles.searchIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Image source={require('../../assets/images/resetpw.png')} style={styles.filterIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.coursesTitle}>Courses</Text>
      <View style={styles.courseCategories}>
        <TouchableOpacity style={styles.courseCategory}>
          <Image source={require('../../assets/images/resetpw.png')} style={styles.categoryIcon} />
          <Text style={styles.categoryText}>All Topic</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.courseCategory}>
          <Image source={require('../../assets/images/resetpw.png')} style={styles.categoryIcon} />
          <Text style={styles.categoryText}>Popular</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.courseCategories}>
        <TouchableOpacity style={styles.courseCategory}>
          <Image source={require('../../assets/images/resetpw.png')} style={styles.categoryIcon} />
          <Text style={styles.categoryText}>Newest</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.courseCategory}>
          <Image source={require('../../assets/images/resetpw.png')} style={styles.categoryIcon} />
          <Text style={styles.categoryText}>Top Rated</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  wifiIcon: {
    width: 24,
    height: 24,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#555',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 20,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
  },
  searchPlaceholder: {
    color: '#888',
  },
  searchButton: {
    padding: 10,
  },
  filterButton: {
    padding: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  filterIcon: {
    width: 20,
    height: 20,
  },
  coursesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginVertical: 10,
  },
  courseCategories: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  courseCategory: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryIcon: {
    width: 60,
    height: 60,
  },
  categoryText: {
    marginTop: 10,
    fontSize: 14,
  },
});

export default CatalogScreen;
