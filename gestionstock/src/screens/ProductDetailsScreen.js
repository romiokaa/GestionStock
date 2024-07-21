import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext'; // Assure-toi d'avoir créé ce contexte

export default function ProductDetailsScreen({ route }) {
  const { product } = route.params; // Récupère les détails du produit depuis les paramètres de navigation
  const [isInterested, setIsInterested] = useState(false);
  const [isBought, setIsBought] = useState(false);
  const { userToken } = useContext(AuthContext); // Récupère le token de l'utilisateur

  useEffect(() => {
    // Vérifie si l'utilisateur est déjà intéressé ou a déjà acheté le produit
    // (Tu devras implémenter la logique pour récupérer ces informations depuis ton API ou le stockage local)
  }, [product.idLots]); // Exécuter l'effet chaque fois que le produit change

  const handleInterested = async () => {
    try {
      const response = await fetch(`https://ton-serveur.com/api/products/${product.idLots}/interested`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}` // Inclure le token dans l'en-tête d'autorisation
        }
      });

      if (response.ok) {
        setIsInterested(true); // Mettre à jour l'état local
        Alert.alert('Succès', 'Vous avez marqué ce produit comme intéressant.');
      } else {
        // Gérer l'erreur (par exemple, afficher un message d'erreur)
      }
    } catch (error) {
      console.error('Erreur lors de la requête "intéressé" :', error);
      Alert.alert('Erreur', 'Une erreur est survenue.');
    }
  };

  const handleBuy = async () => {
    try {
      const response = await fetch(`https://ton-serveur.com/api/products/${product.idLots}/buy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        }
      });

      if (response.ok) {
        setIsBought(true); // Mettre à jour l'état local
        Alert.alert('Succès', 'Vous avez acheté ce produit.');
      } else {
        // Gérer l'erreur
      }
    } catch (error) {
      console.error('Erreur lors de la requête "acheter" :', error);
      Alert.alert('Erreur', 'Une erreur est survenue.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.nom}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>{product.prix} €</Text>
      {!isBought && (
        <Button title={isInterested ? 'Intéressé(e)' : 'Marquer comme intéressé(e)'} onPress={handleInterested} disabled={isInterested} />
      )}
      {!isInterested && (
        <Button title="Acheter" onPress={handleBuy} disabled={isBought} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5
  },
  description: {
    marginBottom: 5
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  }
});
