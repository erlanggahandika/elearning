import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../utils/hooks/themes/ThemeContext.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AllCoursesScreen = () => {
  const { theme } = useTheme();
  return (
    <View style={[styles.screen, { backgroundColor: theme.darkMode ? '#121212' : '#f9f9f9' }]}>
      <Text style={{ color: theme.darkMode ? '#f9f9f9' : '#121212' }}>All Courses</Text>
    </View>
  );
};

const OngoingCoursesScreen = () => {
  const { theme } = useTheme();
  return (
    <View style={[styles.screen, { backgroundColor: theme.darkMode ? '#121212' : '#f9f9f9' }]}>
      <Text style={{ color: theme.darkMode ? '#f9f9f9' : '#121212' }}>Ongoing Courses</Text>
    </View>
  );
};

const CompletedCoursesScreen = () => {
  const { theme } = useTheme();
  return (
    <View style={[styles.screen, { backgroundColor: theme.darkMode ? '#121212' : '#f9f9f9' }]}>
      <Text style={{ color: theme.darkMode ? '#f9f9f9' : '#121212' }}>Completed Courses</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const MyCourseScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: theme.darkMode ? '#121212' : '#f9f9f9',
        },
        tabBarActiveTintColor: theme.darkMode ? '#f9f9f9' : '#121212',
        tabBarInactiveTintColor: theme.darkMode ? '#666666' : '#888888',
        headerStyle: {
          backgroundColor: theme.darkMode ? '#121212' : '#f9f9f9',
        },
        headerTintColor: theme.darkMode ? '#f9f9f9' : '#121212',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'All Courses') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Ongoing') {
            iconName = focused ? 'flame' : 'flame-outline';
          } else if (route.name === 'Complete') {
            iconName = focused ? 'checkmark-done' : 'checkmark-done-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={30} color={theme.darkMode ? '#f9f9f9' : '#121212'} />
          </TouchableOpacity>
        ),
      })}
    >
      <Tab.Screen name="All Courses" component={AllCoursesScreen} />
      <Tab.Screen name="Ongoing" component={OngoingCoursesScreen} />
      <Tab.Screen name="Complete" component={CompletedCoursesScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    marginLeft: 10,
    padding: 10,
  },
});

export default MyCourseScreen;
