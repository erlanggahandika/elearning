import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ThemeContext = createContext();


const defaultTheme = {
  darkMode: false, 
  backgroundColor: '#fff',
  textColor: '#000',
};

//gunain themeporvider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  // Fungsi untuk toggle dark mode
  const toggleDarkMode = async () => {
    const newTheme = !theme.darkMode;
    const updatedTheme = {
      darkMode: newTheme,
      backgroundColor: newTheme ? '#000' : '#fff',
      textColor: newTheme ? '#fff' : '#000',
    };
    setTheme(updatedTheme);

    // Simpan pengaturan dark mode ke AsyncStorage
    await AsyncStorage.setItem('darkMode', JSON.stringify(newTheme));
  };

  // Cek pengaturan dark mode di AsyncStorage saat aplikasi dimulai
  useEffect(() => {
    const loadTheme = async () => {
      const savedDarkMode = await AsyncStorage.getItem('darkMode');
      if (savedDarkMode !== null) {
        const darkMode = JSON.parse(savedDarkMode);
        const updatedTheme = {
          darkMode,
          backgroundColor: darkMode ? '#000' : '#fff',
          textColor: darkMode ? '#fff' : '#000',
        };
        setTheme(updatedTheme);
      }
    };

    loadTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook untuk akses theme
export const useTheme = () => {
  return useContext(ThemeContext);
};
