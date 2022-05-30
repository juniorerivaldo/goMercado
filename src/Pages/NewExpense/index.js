import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';


export default function NewExpense() {
  return (
    <View style={styles.container}>
      <Text>Digite ou edite este texto...</Text>
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
});
