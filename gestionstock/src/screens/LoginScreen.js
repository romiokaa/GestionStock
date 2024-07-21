import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext'; // Assure-toi d'avoir un contexte pour gérer l'authentification

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext); // Fonction pour mettre à jour le contexte d'authentification

  const handleLogin = async () => {
    try {
      const response = await fetch('https://ton-serveur.com/api/login', { // Remplacer par l'URL API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          mdp: password 
        })
      });

      if (response.ok) {
        const data = await response.json();
        // Stocke les informations de l'utilisateur (token, id, etc.) dans AsyncStorage
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('userId', data.userId);
        await AsyncStorage.setItem('userName', data.nom); // Stocke le nom de l'utilisateur
        await AsyncStorage.setItem('userCategories', JSON.stringify(data.categories)); // Stocke les catégories en tant que JSON

        // Met à jour le contexte d'authentification
        signIn(data); 

        // Redirige vers l'écran d'accueil
        navigation.navigate('Home'); 
      } else {
        const errorData = await response.json();
        Alert.alert('Erreur', errorData.error);
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Se connecter" onPress={handleLogin} />
      <Button
        title="Créer un compte"
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10
  }
});
