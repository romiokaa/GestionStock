import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext); // Récupérer les informations de l'utilisateur du contexte

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userCategories = JSON.parse(await AsyncStorage.getItem('userCategories')) || [];
        const categoriesString = userCategories.join(','); // Convertir le tableau en chaîne de caractères

        const response = await fetch(`https://ton-serveur.com/api/products?specialite=${categoriesString}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
        Alert.alert('Erreur', 'Impossible de récupérer les produits.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [user]); // Exécuter l'effet à chaque fois que les catégories d'intérêt de l'utilisateur changent

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetails', { product });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.idLots.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProductPress(item)}>
            <View style={styles.productItem}>
              {/* Affiche ici les informations du produit (nom, image, etc.) */}
              <Text style={styles.productName}>{item.nom}</Text>
              {/* ... */}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  productItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold'
  }
  // ... autres styles ...
});
