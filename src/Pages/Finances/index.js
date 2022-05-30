import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {FAB} from 'react-native-paper';

export default function Finances() {
  function NewExpense() {
    navigation.navigate('Adicionar Gastos');
  }
  // SETUP
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Digite ou edite este texto...</Text>
      <FAB style={styles.fab} Large icon="plus" onPress={NewExpense} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 20,
    bottom: 20,
    backgroundColor: '#8000ff',
  },
});
