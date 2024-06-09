import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    // Charger les produits à faible stock depuis AsyncStorage
    const loadLowStockProducts = async () => {
      const storedProducts = await AsyncStorage.getItem('products');
      if (storedProducts) {
        const products = JSON.parse(storedProducts);
        const lowStock = products.filter(product => product.quantity <= 10); // Exemple de seuil : 10
        setLowStockProducts(lowStock);
      }
    };
    loadLowStockProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestion de Stock</Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Produits à faible stock :</Text>
        {lowStockProducts.length > 0 ? (
          lowStockProducts.map(product => (
            <Text key={product.id}>{product.name} ({product.quantity})</Text>
          ))
        ) : (
          <Text>Aucun produit à faible stock</Text>
        )}
      </View>

      {/* Autres sections : dernières entrées/sorties, total produits, etc. */}

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('ProductList')}
      >
        <Text style={styles.buttonText}>Voir tous les produits</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
