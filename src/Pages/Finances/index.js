import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {FAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Finances() {
  function NewExpense() {
    navigation.navigate('Adicionar Gastos');
  }
  // SETUP
  const navigation = useNavigation();
  const [saldo, setSaldo] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  // Open and close modal upon button clicks.
  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.expensesShow}>
        <Text style={styles.titleText}>Meu Saldo</Text>
        <View style={styles.expenseContaier}>
          <Icon name="wallet-outline" style={styles.iconLabel} />
          <Text style={styles.subtitleText}>R$: {saldo}</Text>
        </View>
        <TouchableOpacity
          onPress={toggleModalVisibility}
          style={styles.btnEditar}>
          <Icon name="cog-outline" style={[styles.iconLabel, {fontSize: 30}]} />
        </TouchableOpacity>
        <Modal visible={isModalVisible} animationType={'slide'}>
          <View style={styles.modalContainer}>
            <TextInput
              style={{
                marginBottom: 100,
                marginTop: 30,
                backgroundColor: '#fff',
                borderRadius: 10,
              }}
              onChangeText={setSaldo}
              keyboardType="numeric"
              placeholder="Digite o novo saldo EX: 2.193,00"
            />
            <Button onPress={toggleModalVisibility} title="Fechar" />
          </View>
        </Modal>
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
    paddingTop: 10,
  },

  expenseContaier: {
    flexDirection: 'row',
    alignItems: 'center',
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
    left: 330,
    bottom: 55,
  },
  modalContainer: {
    flex: 1,
    margin: 15,
    alignItems: 'center',
    borderRadius:10,
    justifyContent: 'center',
    backgroundColor: '#656D78',
  },

  flatContainer: {
    flex: 3,
    backgroundColor: '#fff',
  },
});
