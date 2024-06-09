import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ReportsScreen() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalStockValue, setTotalStockValue] = useState(0);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    const loadReportData = async () => {
      try {
        const storedProducts = await AsyncStorage.getItem('products');
        const storedMovements = await AsyncStorage.getItem('movements');

        if (storedProducts) {
          const products = JSON.parse(storedProducts);
          setTotalProducts(products.length);

          let totalValue = 0;
          let lowStock = [];
          for (const product of products) {
            totalValue += product.quantity * product.price; // Assumes you have a 'price' property on products
            if (product.quantity <= 10) { // Exemple de seuil : 10
              lowStock.push(product);
            }
          }
          setTotalStockValue(totalValue);
          setLowStockProducts(lowStock);
        }
      } catch (error) {
        console.error('Error loading report data:', error);
      }
    };

    loadReportData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Rapport de Stock</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Total Produits:</Text>
        <Text>{totalProducts}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Valeur Totale du Stock:</Text>
        <Text>{totalStockValue.toFixed(2)} €</Text> 
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Produits à Faible Stock:</Text>
        {lowStockProducts.length > 0 ? (
          lowStockProducts.map(product => (
            <Text key={product.id}>{product.name} ({product.quantity})</Text>
          ))
        ) : (
          <Text>Aucun produit à faible stock</Text>
        )}
      </View>

      {/* Autres sections de rapport (ventes, produits populaires, etc.) */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
