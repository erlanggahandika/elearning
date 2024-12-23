import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../utils/hooks/themes/ThemeContext.js';

const Navbar = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const darkwhite = '#b3b0ad';
  const white = '#f9f9f9';

  return (
    <View style={[styles.navbar, { backgroundColor: theme.darkMode ? '#121212' : '#f9f9f9' }]}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
        <Ionicons
          name="home"
          size={30}
          color={theme.darkMode ? white : darkwhite} 
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={ () => navigation.navigate('Catalog')}>
        <Ionicons
          name="book"
          size={30}
          color={theme.darkMode ? white : darkwhite} 
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons
          name="wallet-outline"
          size={30}
          color={theme.darkMode ? white : darkwhite} 
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Settings')}>
        <Ionicons
          name="settings-outline"
          size={30}
          color={theme.darkMode ? white : darkwhite} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 0, // Stick to the bottom of the screen
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Navbar;
