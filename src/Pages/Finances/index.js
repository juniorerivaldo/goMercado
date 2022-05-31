import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {FAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Finances() {
  function NewExpense() {
    navigation.navigate('Adicionar Gastos');
  }
  // SETUP
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.expensesShow}>
        <Text style={styles.titleText}>Meu Saldo</Text>
        <View style={styles.expenseContaier}>
          <Icon name="wallet-outline" style={styles.iconLabel} />
          <Text style={styles.subtitleText}>R$ 2.180,90</Text>
          <TouchableOpacity style={styles.btnEditar}>
            <Icon
              name="cog-outline"
              style={[styles.iconLabel ,{fontSize: 30}]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.flatContainer}></View>
      <FAB style={styles.fab} Large icon="plus" onPress={NewExpense} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fab: {
    position: 'absolute',
    margin: 10,
    right: 50,
    bottom: 2,
    backgroundColor: '#656D78',
  },
  expensesShow: {
    flex: 1,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 10,
    backgroundColor: '#656D78',
  },
  titleText: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 10,
  },
  expenseContaier: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    right: 60,
    padding: 20,
  },
  iconLabel: {
    fontSize: 40,
    color: '#fff',
  },
  subtitleText: {
    textAlign: 'left',
    color: '#7cfc00',
    fontSize: 26,
    fontWeight: 'bold',
    left: 10,
  },
  btnEditar: {
    left: 120,
  },

  flatContainer: {
    flex: 3,
    backgroundColor: '#fff',
  },
});
