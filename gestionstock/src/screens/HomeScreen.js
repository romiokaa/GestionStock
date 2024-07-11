// HomeScreen.js (Écran d'accueil)
import React from 'react';
import { View, Text, FlatList } from 'react-native';

export default function HomeScreen() {
  const lots = [
    // Données des lots (à récupérer depuis l'API)
  ];

  return (
    <View>
      <FlatList
        data={lots}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.nom} - {item.categorie}</Text> // Afficher les informations du lot
        )}
      />
    </View>
  );
}
