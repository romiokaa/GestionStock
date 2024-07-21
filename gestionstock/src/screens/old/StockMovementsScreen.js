import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, Picker, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StockMovementsScreen() {
  const [movements, setMovements] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [movementType, setMovementType] = useState('entree'); // entrée par défaut

  useEffect(() => {
    const loadMovements = async () => {
      try {
        const storedMovements = await AsyncStorage.getItem('movements');
        if (storedMovements) {
          setMovements(JSON.parse(storedMovements));
        }

        const storedProducts = await AsyncStorage.getItem('products');
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts));
        }
      } catch (error) {
        console.error('Error loading movements/products:', error);
      }
    };

    loadMovements();
  }, []);

  const handleAddMovement = async () => {
    try {
      const newMovement = {
        id: Date.now(),
        productId: selectedProductId,
        quantity: parseInt(quantity, 10),
        type: movementType,
        timestamp: new Date().toISOString(),
      };

      const storedMovements = await AsyncStorage.getItem('movements');
      const movements = storedMovements ? JSON.parse(storedMovements) : [];
      movements.push(newMovement);
      await AsyncStorage.setItem('movements', JSON.stringify(movements));

      // Mettre à jour la quantité du produit concerné
      const updatedProducts = products.map(product =>
        product.id === selectedProductId
          ? { ...product, quantity: movementType === 'entree' ? product.quantity + newMovement.quantity : product.quantity - newMovement.quantity }
          : product
      );
      await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));

      setMovements(movements);
      setQuantity('');
    } catch (error) {
      console.error('Error adding movement:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedProductId}
        onValueChange={(itemValue) => setSelectedProductId(itemValue)}
      >
        <Picker.Item label="Sélectionnez un produit" value={null} />
        {products.map((product) => (
          <Picker.Item key={product.id} label={product.name} value={product.id} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Quantité"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <Picker
        selectedValue={movementType}
        onValueChange={(itemValue) => setMovementType(itemValue)}
      >
        <Picker.Item label="Entrée" value="entree" />
        <Picker.Item label="Sortie" value="sortie" />
      </Picker>
      <Button title="Ajouter mouvement" onPress={handleAddMovement} />

      <FlatList
        data={movements}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movementItem}>
            <Text>Produit: {products.find(p => p.id === item.productId)?.name}</Text>
            <Text>Quantité: {item.quantity}</Text>
            <Text>Type: {item.type}</Text>
            <Text>Date: {new Date(item.timestamp).toLocaleString()}</Text> 
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // ... styles
});
