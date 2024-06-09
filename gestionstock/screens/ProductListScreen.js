import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProductListScreen({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const storedProducts = await AsyncStorage.getItem('products');
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts));
        }
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
  }, []);

  const handleProductPress = (product) => {
    // Navigate to product details screen (you'll need to create this screen)
    navigation.navigate('ProductDetails', { product });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProductPress(item)}>
            <View style={styles.productItem}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productQuantity}>Quantité: {item.quantity}</Text>
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
    padding: 20,
  },
  productItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productQuantity: {
    fontSize: 16,
  },
});
