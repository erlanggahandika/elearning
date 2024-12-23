import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';

const ResetPasswordScreen = () => {
    const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'https://your-backend-url.com/reset-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        Alert.alert(
          'Success',
          result.message ||
            'Password reset email has been sent. Please check your inbox or spam folder.'
        );
        setEmail('');
      } else {
        Alert.alert('Error', result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to connect to the server. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={20}
    >
      <Image
        source={require('../../assets/images/resetpw.png')} // Ganti URL ini dengan lokasi gambar Anda
        style={styles.image}
      />
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity
        style={[styles.button, loading && { backgroundColor: '#ccc' }]}
        onPress={handleResetPassword}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
         navigation.navigate('Login');
        }}
      >
        <Text style={styles.backButtonText}>Back to Login</Text>
      </TouchableOpacity>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00bcd4" />
        </View>
      )}
       
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
    backButtonText: {
      color: '#00bcd4',
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
    },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: 300,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00bcd4',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#00bcd4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResetPasswordScreen;
