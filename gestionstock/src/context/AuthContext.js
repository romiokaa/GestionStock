// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  userName: null,
  userCategories: [],
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userCategories, setUserCategories] = useState([]);

  useEffect(() => {
    // Charger les données de l'utilisateur depuis AsyncStorage au démarrage de l'application
    const loadUserData = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const id = await AsyncStorage.getItem('userId');
      const name = await AsyncStorage.getItem('userName');
      const categories = JSON.parse(await AsyncStorage.getItem('userCategories')) || [];

      if (token) {
        setIsLoggedIn(true);
        setUserId(id);
        setUserName(name);
        setUserCategories(categories);
      }
    };
    loadUserData();
  }, []);

  const login = async (userData) => {
    // Enregistrer les données de l'utilisateur dans AsyncStorage après la connexion
    await AsyncStorage.setItem('userToken', userData.token);
    await AsyncStorage.setItem('userId', userData.userId);
    await AsyncStorage.setItem('userName', userData.nom);
    await AsyncStorage.setItem('userCategories', JSON.stringify(userData.categories));

    setIsLoggedIn(true);
    setUserId(userData.userId);
    setUserName(userData.nom);
    setUserCategories(userData.categories);
  };

  const logout = async () => {
    // Supprimer les données de l'utilisateur de AsyncStorage lors de la déconnexion
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('userName');
    await AsyncStorage.removeItem('userCategories');

    setIsLoggedIn(false);
    setUserId(null);
    setUserName(null);
    setUserCategories([]);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, userName, userCategories, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
