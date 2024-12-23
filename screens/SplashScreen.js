import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Navigasi ke halaman Login setelah beberapa detik
    }, 3000); // 3000ms = 3 detik

    return () => clearTimeout(timer); // Bersihkan timer saat komponen dilepas
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash.jpeg')} // Ganti dengan path gambar splash Anda
        style={styles.backgroundImage}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
