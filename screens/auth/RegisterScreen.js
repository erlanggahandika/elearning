import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ENDPOINTS } from '../../utils/endpoint.js';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!name || !phone || !email || !password || !address) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(ENDPOINTS.REGISTER, {
        name,
        phone,
        email,
        address,
        password,
      });

      if (response.data.success) {
        Alert.alert('Success', 'User registered successfully');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', response.data.message || 'Registration failed');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error Response:', error.response.data);
        Alert.alert('Error', error.response.data.message || 'Registration failed');
      } else {
        console.error('Error Message:', error.message);
        Alert.alert('Error', 'An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </>
        );
      case 2:
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </>
        );
      case 3:
        return (
          <TextInput
            style={styles.input}
            placeholder="Enter your address"
            value={address}
            onChangeText={setAddress}
          />
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (step === 1 && (!name || !phone)) {
      Alert.alert('Error', 'Please fill in all fields');
    } else if (step === 2 && (!email || !password)) {
      Alert.alert('Error', 'Please fill in all fields');
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../assets/images/bghome.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Step {step} of 3</Text>

      {renderStep()}

      <View style={styles.buttonContainer}>
        {step > 1 && (
          <TouchableOpacity style={[styles.button, styles.backButton]} onPress={handleBack}>
            <Text style={styles.buttonText}>BACK</Text>
          </TouchableOpacity>
        )}
        {step < 3 ? (
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>REGISTER</Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      {step === 1 && (
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signInLink}>Already have an account? Sign in here</Text>
        </TouchableOpacity>
      )}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#4070F4',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#808080',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4070F4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  backButton: {
    backgroundColor: '#B0BEC5',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInLink: {
    color: '#4070F4',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default RegisterScreen;
