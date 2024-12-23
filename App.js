import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './utils/hooks/themes/ThemeContext.js';
import SplashScreen from './screens/SplashScreen.js';
import LoginScreen from './screens/auth/LoginScreen.js';
import HomeScreen from './screens/users/HomeScreen.js';
import RegisterScreen from './screens/auth/RegisterScreen.js';
import ResetPasswordScreen from './screens/auth/ResetPasswordScreen.js';
import SettingsScreen from './screens/users/SettingsScreen.js';
import NotificationScreen from './screens/users/NotificationScreen.js';
import MyCourseScreen from './screens/users/MyCourseScreen.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Notification" component={NotificationScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="MyCourse" component={MyCourseScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
