// SignupScreen.js (Écran d'inscription)
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [categories, setCategories] = useState([]); // Tableau pour stocker les catégories d'intérêt
  const [error, setError] = useState(''); // Message d'erreur

  const handleSignup = async () => {
    // Validation des données
    if (!name || !email || !password) {
      setError('Tous les champs sont obligatoires');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email invalide');
      return;
    }

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    // Appel à l'API pour l'inscription
    try {
      // ... (code pour envoyer les données à l'API)
      navigation.navigate('Home'); // Naviguer vers l'écran d'accueil en cas de succès
    } catch (error) {
      setError('Erreur lors de l\'inscription');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        placeholder="Nom"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
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
      {/* Ajoute ici des éléments pour sélectionner les catégories d'intérêt (ex: Checkboxes, Dropdown) */}
      <Button title="S'inscrire" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  // ... (styles similaires à LoginScreen)
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
