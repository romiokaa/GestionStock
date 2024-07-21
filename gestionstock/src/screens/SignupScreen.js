import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Picker, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

export default function SignupScreen({ navigation }) {
  const [nom_entreprise, setNomEntreprise] = useState('');
  const [specialite, setSpecialite] = useState(null);
  const [civilite, setCivilite] = useState('h');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [mdp, setMdp] = useState('');
  const [adresse, setAdresse] = useState('');
  const [codePostale, setCodePostale] = useState('');
  const [pays, setPays] = useState('');
  const [specialites, setSpecialites] = useState([]);
  const [error, setError] = useState('');

  const { signUp } = useContext(AuthContext);

  useEffect(() => {
    // Récupérer la liste des spécialités depuis l'API
    fetch('https://ton-serveur.com/api/specialites') // Remplace par l'URL de ton API
      .then(response => response.json())
      .then(data => setSpecialites(data))
      .catch(error => {
        console.error('Erreur lors de la récupération des spécialités :', error);
        Alert.alert('Erreur', 'Impossible de récupérer les spécialités.');
      });
  }, []);

  const handleSignup = async () => {
    // Validation des données
    if (!nom_entreprise || !specialite || !civilite || !nom || !prenom || !pseudo || !tel || !email || !mdp || !adresse || !codePostale || !pays) {
      setError('Tous les champs sont obligatoires');
      return;
    }

    // Validation de l'email avec un regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email invalide');
      return;
    }

    // Validation du mot de passe (au moins 8 caractères, une majuscule, une minuscule, un chiffre, un caractère spécial)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(mdp)) {
      setError('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial');
      return;
    }

    try {
      const response = await fetch('https://ton-serveur.com/api/signup', { // Remplace par l'URL de ton API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nom_entreprise,
          specialite_id: specialite,
          civilite,
          nom,
          prenom,
          pseudo,
          tel,
          email,
          mdp,
          adresse,
          codePostale,
          pays
        })
      });

      if (response.ok) {
        const data = await response.json();
        // Stocke les informations de l'utilisateur (token, id, etc.) dans AsyncStorage
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('userId', data.userId);
        await AsyncStorage.setItem('userName', data.nom);

        // Met à jour le contexte d'authentification
        signUp(data);

        // Redirige vers l'écran d'accueil
        navigation.navigate('Home');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setError('Une erreur est survenue lors de l\'inscription.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}> 
      <Text style={styles.title}>Inscription</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Champs de saisie */}
      <TextInput
        placeholder="Nom de l'entreprise"
        value={nom_entreprise}
        onChangeText={setNomEntreprise}
        style={styles.input}
      />
      <Picker
        selectedValue={civilite}
        onValueChange={(itemValue) => setCivilite(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Civilité" value={null} />
        <Picker.Item label="Homme" value="h" />
        <Picker.Item label="Femme" value="f" />
      </Picker>
      <TextInput
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
        style={styles.input}
      />
      <TextInput
        placeholder="Prénom"
        value={prenom}
        onChangeText={setPrenom}
        style={styles.input}
      />
      <TextInput
        placeholder="Pseudo"
        value={pseudo}
        onChangeText={setPseudo}
        style={styles.input}
      />
      <TextInput
        placeholder="Téléphone"
        value={tel}
        onChangeText={setTel}
        style={styles.input}
        keyboardType="phone-pad" // Pour afficher un clavier numérique
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address" // Pour afficher un clavier avec "@"
      />
      <TextInput
        placeholder="Mot de passe"
        value={mdp}
        onChangeText={setMdp}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Adresse"
        value={adresse}
        onChangeText={setAdresse}
        style={styles.input}
      />
      <TextInput
        placeholder="Code postal"
        value={codePostale}
        onChangeText={setCodePostale}
        style={styles.input}
        keyboardType="numeric" // Pour afficher un clavier numérique
      />
      <TextInput
        placeholder="Pays"
        value={pays}
        onChangeText={setPays}
        style={styles.input}
      />

      <Picker
        selectedValue={specialite}
        onValueChange={(itemValue) => setSpecialite(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Sélectionnez une catégorie" value={null} />
        {specialites.map((specialite) => (
          <Picker.Item
            key={specialite.id_specialite}
            label={specialite.nom_specialite}
            value={specialite.id_specialite}
          />
        ))}
      </Picker>

      <Button title="S'inscrire" onPress={handleSignup} />
    </ScrollView>
  );
}

// Styles 
const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Permet au ScrollView de s'adapter au contenu
    justifyContent: 'center',
    padding: 20
  },
  // ... autres styles ...
});
