import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../utils/hooks/themes/ThemeContext.js'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../../utils/components/Navbar.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { setStatusBarHidden } from 'expo-status-bar';

const SettingsScreen = () => {
  const [username, setUsername] = useState(''); 
  const [phoneNumber, setPhoneNumber] = useState(''); 
  const { theme, toggleDarkMode } = useTheme(); 
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const handleProfilePress = () => {
    Alert.alert('Profile', 'Navigate to Profile screen');
  };

  const handleChangePasswordPress = () => {
    Alert.alert('Change Password', 'Navigate to Change Password screen');
  };

  const toggleNotifications = () => {
    setNotificationsEnabled((previousState) => !previousState);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber'); 
        if (storedUsername) {
          setUsername(storedUsername);
        }
        if (storedPhoneNumber) {
          setPhoneNumber(storedPhoneNumber);
        }
      } catch (error) {
        console.error('Failed to load user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ backgroundColor: theme.backgroundColor }}
        contentContainerStyle={styles.contentContainer}
        enableOnAndroid
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.settings}>
          <Text style={[styles.settingsText, { color: theme.textColor }]}>Settings</Text>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.profileBorder}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/80' }}
              style={styles.profileImage} 
            />
          </View>
          <View>
            <Text style={[styles.username, { color: theme.textColor }]}>{username}</Text>
            <Text style={[styles.phoneNumber, { color: theme.textColor }]}>{phoneNumber}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Account</Text>
          <TouchableOpacity style={styles.row} onPress={handleProfilePress}>
            <Ionicons name="person" size={20} color="#00bcd4" />
            <Text style={[styles.rowText, { color: theme.textColor }]}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={handleChangePasswordPress}>
            <Ionicons name="lock-closed" size={20} color="#00bcd4" />
            <Text style={[styles.rowText, { color: theme.textColor }]}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={handleChangePasswordPress}>
            <Ionicons name="log-out-outline" size={20} color="#00bcd4" />
            <Text style={[styles.rowText, { color: theme.textColor }]}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Preferences</Text>
          <View style={styles.row}>
            <Ionicons name="moon-outline" size={20} color="#00bcd4" />
            <Text style={[styles.rowText, { color: theme.textColor }]}>Dark Mode</Text>
            <Switch
              value={theme.darkMode} 
              onValueChange={toggleDarkMode} 
              thumbColor={theme.darkMode ? '#facd05' : '#ccc'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
          </View>
          <View style={styles.row}>
            <Ionicons name="notifications-off" size={20} color="#00bcd4" />
            <Text style={[styles.rowText, { color: theme.textColor }]}>Turn Off Notifications</Text>
            <Switch
              value={!notificationsEnabled}
              onValueChange={toggleNotifications}
              thumbColor={!notificationsEnabled ? '#00bcd4' : '#ccc'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Help</Text>
          <TouchableOpacity style={styles.row}>
            <Ionicons name="information-outline" size={20} color="#00bcd4" />
            <Text style={[styles.rowText, { color: theme.textColor }]}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Ionicons name="help" size={20} color="#00bcd4" />
            <Text style={[styles.rowText, { color: theme.textColor }]}>Help Center</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.hidden , styles.row]}>
            <Ionicons name="mail" size={20} color="#00bcd4" />
            <Text style={[styles.rowText, { color: theme.textColor }]}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    paddingBottom: 80,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 50,
  },
  settings: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 30,
  },
  settingsText: {
    fontSize: 24,       
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 30,
  },
  profileBorder: {
    borderWidth: 2,
    borderColor: '#00bcd4',
    borderRadius: 50,
    padding: 5,
    marginBottom: 12,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  phoneNumber: {
    fontSize: 14,
    color: '#888',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  rowText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
});

export default SettingsScreen;
