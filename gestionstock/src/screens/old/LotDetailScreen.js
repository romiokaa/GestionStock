// LotDetailsScreen.js (Écran de détails du lot)
import React from 'react';
import { View, Text, Image, Button } from 'react-native';

export default function LotDetailsScreen({ route }) {
  const { lot } = route.params; // Récupérer les détails du lot depuis la navigation

  return (
    <View>
      <Image source={{ uri: lot.image }} />
      <Text>{lot.nom}</Text>
      <Text>{lot.description}</Text>
      <Button title="Intéressé" onPress={() => {}} />
      <Button title="Acheter" onPress={() => {}} />
    </View>
  );
}
