import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../utils/hooks/themes/ThemeContext.js';


const NotificationScreen = () => {
  const { theme } = useTheme();
  const nav = useNavigation();

  const handleBack = () => {
    nav.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.darkMode ? '#121212' : '#f9f9f9' }]}>
      {/* Navbar Atas */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name={'arrow-back'} size={30} color={theme.darkMode ? '#f9f9f9' : '#121212'} />
        </TouchableOpacity>
        <Text style={[styles.navbarText, {color: theme.darkMode ? '#f9f9f9' : '#121212'} ]}>Notification</Text>
      </View>

      {/* Konten Tengah */}
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/resetpw.png')}
          style={styles.image}
        />
        <Text style={[styles.mainText, {color: theme.darkMode ? '#f9f9f9' : '#121212' }]}>You're up to date!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#FFFFFF',  // Bisa diubah jika Anda ingin menambahkan tema
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    
  },
  navbarText: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  mainText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00bcd4',
  },
});

export default NotificationScreen;
