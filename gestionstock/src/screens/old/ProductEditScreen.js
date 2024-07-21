// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function ProductEditScreen({ route, navigation }) {
//   const [name, setName] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [productId, setProductId] = useState(null);

//   useEffect(() => {
//     // Si on modifie un produit existant, charger ses données
//     if (route.params?.product) {
//       const { id, name, quantity } = route.params.product;
//       setName(name);
//       setQuantity(quantity.toString());
//       setProductId(id);
//     }
//   }, [route.params?.product]);

//   const handleSave = async () => {
//     try {
//       const newProduct = {
//         id: productId || Date.now(), // Générer un nouvel ID si on ajoute un produit
//         name: name,
//         quantity: parseInt(quantity, 10), // Convertir la quantité en nombre
//       };

//       const storedProducts = await AsyncStorage.getItem('products');
//       const products = storedProducts ? JSON.parse(storedProducts) : [];

//       if (productId) {
//         // Modification d'un produit existant
//         const updatedProducts = products.map(product =>
//           product.id === productId ? newProduct : product
//         );
//         await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
//       } else {
//         // Ajout d'un nouveau produit
//         products.push(newProduct);
//         await AsyncStorage.setItem('products', JSON.stringify(products));
//       }

//       navigation.goBack(); // Retourner à l'écran précédent
//     } catch (error) {
//       console.error('Error saving product:', error);
//       // Gérer l'erreur (afficher un message à l'utilisateur, etc.)
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Nom du produit"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Quantité"
//         value={quantity}
//         onChangeText={setQuantity}
//         keyboardType="numeric"
//       />
//       <Button title="Enregistrer" onPress={handleSave} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
// });
