import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../utils/hooks/themes/ThemeContext.js';
import { useNavigation } from '@react-navigation/native';

const TopBar = () => {
  const { theme, toggleDarkMode } = useTheme();
  const navigation = useNavigation();
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const blue = '#00bcd4';
  const white = '#f9f9f9';

  const handleNotificationPress = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => navigation.navigate('Notification'));
  };

  const shakeInterpolation = shakeAnimation.interpolate({
    inputRange: [-1, 1],
    outputRange: [-10, 10],
  });

  const animatedStyle = {
    transform: [{ translateX: shakeInterpolation }],
  };

  return (
    <View style={[styles.header, { backgroundColor: theme.backgroundColor }]}>
    <Text style={[styles.headerText, { color: theme.darkMode ? white : blue }]}>
      APATCHE
    </Text>
    <View style={styles.rightSection}>
      <TouchableOpacity style={styles.notificationButton} onPress={handleNotificationPress}>
        <Animated.View style={animatedStyle}>
          <Ionicons name="notifications" size={30} color={theme.darkMode ? '#ffb300' : '#f5d611'} />
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleDarkMode} style={styles.themeToggleButton}>
        <Ionicons name={theme.darkMode ? 'sunny' : 'moon'} size={30} color={theme.darkMode ? '#fff' : '#000'} />
      </TouchableOpacity>
    </View>
  </View>
  
  );
};
const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between', 
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 40,
    },
    headerText: {
      fontSize: 25,
      paddingTop: 5,
      fontWeight: 'bold',
    },
    rightSection: {
      flexDirection: 'row', 
      alignItems: 'center',
    },
    notificationButton: {
      marginRight: 10, 
    },
    themeToggleButton: {
      marginRight: 0, 
    },
  });
  
  

export default TopBar;
