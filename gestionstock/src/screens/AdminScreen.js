import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 

export default function AdminScreen() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductGrade, setNewProductGrade] = useState('');
  const [newProductSpecialite, setNewProductSpecialite] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // Pour la gestion des catégories
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          // Gérer le cas où l'utilisateur n'est pas connecté (redirection vers la page de connexion, par exemple)
          return;
        }

        // Récupérer les utilisateurs
        const usersResponse = await fetch('https://ton-serveur.com/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const usersData = await usersResponse.json();
        setUsers(usersData);

        // Récupérer les produits
        const productsResponse = await fetch('https://ton-serveur.com/api/products', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const productsData = await productsResponse.json();
        setProducts(productsData);

        // Récupérer les catégories
        const categoriesResponse = await fetch('https://ton-serveur.com/api/specialites', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        Alert.alert('Erreur', 'Impossible de récupérer les données.');
      }
    };

    fetchAllData();
  }, []);

  // ... (fonctions handleDeleteProduct, handleAddProduct, handleUpdateProduct, handleDeleteUser, etc.)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Interface Administrateur</Text>

      {/* Liste des utilisateurs */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id_user.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nom} {item.prenom} - {item.email}</Text>
            {/* ... autres informations sur l'utilisateur et boutons pour modifier/supprimer */}
          </View>
        )}
      />

      {/* Liste des produits */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.idLots.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nom} - {item.prix} €</Text>
            <Button title="Modifier" onPress={() => {
              setEditingProductId(item.idLots);
              setNewProductName(item.nom);
              setNewProductDescription(item.description);
              setNewProductPrice(item.prix);
              setNewProductGrade(item.grade);
              setNewProductSpecialite(item.specialite);
              setIsEditingProduct(true);
            }} />
            <Button title="Supprimer" onPress={() => handleDeleteProduct(item.idLots)} />
          </View>
        )}
      />

      {/* Formulaire pour ajouter/modifier un produit */}
      {isAddingProduct || isEditingProduct ? (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>{isAddingProduct ? 'Ajouter un produit' : 'Modifier le produit'}</Text>
          <TextInput
            placeholder="Nom"
            value={newProductName}
            onChangeText={setNewProductName}
            style={styles.input}
          />
          {/* ... autres champs de saisie pour le produit ... */}
          <Picker
            selectedValue={newProductSpecialite}
            onValueChange={(itemValue) => setNewProductSpecialite(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Sélectionnez une catégorie" value={null} />
            {categories.map((categorie) => (
              <Picker.Item
                key={categorie.id_specialite}
                label={categorie.nom_specialite}
                value={categorie.id_specialite}
              />
            ))}
          </Picker>
          <Button
            title={isAddingProduct ? 'Ajouter' : 'Enregistrer'}
            onPress={isAddingProduct ? handleAddProduct : handleUpdateProduct}
          />
          <Button title="Annuler" onPress={() => { setIsAddingProduct(false); setIsEditingProduct(false); }} />
        </View>
      ) : (
        <Button title="Ajouter un produit" onPress={() => setIsAddingProduct(true)} />
      )}

      {/* Gestion des catégories (à implémenter) */}
      <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
        <Text style={styles.link}>Gérer les catégories</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ... styles ...
