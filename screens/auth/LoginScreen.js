import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';
import { ENDPOINTS } from '../../utils/endpoint.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password tidak boleh kosong');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(ENDPOINTS.LOGIN, {
        username: email,
        password,
      });

      if (response.data && response.data.success) {
        const { token, user } = response.data.data;

        try {
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('username', user.username);
          await AsyncStorage.setItem('role', user.role);
        } catch (storageError) {
          console.error('AsyncStorage Error:', storageError);
        }

        navigation.replace('Home');
      } else {
        const errorMessage =
          typeof response.data.message === 'string'
            ? response.data.message
            : JSON.stringify(response.data.message);

        Alert.alert('Login Gagal', errorMessage || 'Periksa email/password Anda');
      }
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan, silakan coba lagi');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
    >
      <Image
        source={require('../../assets/images/bghome.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Sign in</Text>
      <Text style={styles.subtitle}>Please sign in with your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>SIGN IN</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkContainer}
        onPress={() => navigation.navigate('ResetPassword')}
      >
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Sign up Here</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: '#F9F9F9',
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#4070F4',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#808080',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  button: {
    backgroundColor: '#4070F4',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkContainer: {
    marginBottom: 30,
  },
  link: {
    color: '#4070F4',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#808080',
  },
});

export default LoginScreen;
