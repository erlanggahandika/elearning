import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('authToken', token); // Simpan token dengan key 'authToken'
  } catch (error) {
    console.error('Failed to store token:', error);
    throw error; // Lempar error jika penyimpanan gagal
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken'); // Ambil token dari AsyncStorage
    return token;
  } catch (error) {
    console.error('Failed to get token:', error);
    throw error;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('authToken'); // Hapus token
  } catch (error) {
    console.error('Failed to remove token:', error);
    throw error;
  }
};
