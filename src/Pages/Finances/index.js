import React, {useState, useCallback, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {FAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BalanceModal from './../BalanceModal/index';

export default function Finances() {
  function NewExpense() {
    navigation.navigate('Adicionar Gastos');
  }
  // definição de estados
  const navigation = useNavigation();
  const [balance, setBalance] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [_balance, set_Balance] = useState([]);

  // recebendo os dados de compras
  async function handleFetchData() {
    const response = await AsyncStorage.getItem('@web-mercado:finances');
    const data = response ? JSON.parse(response) : [];
    setData(data);

    const _response = await AsyncStorage.getItem('@web-mercado:_balance');
    const _data = _response ? JSON.parse(_response) : [];
    set_Balance(_data);
  }

  // funcao para recarregar a tela quando adiciona um novo item
  useFocusEffect(
    useCallback(() => {
      handleFetchData();
      handleLoadBalance();
    }, []),
  );

  // chama a funcão de calculo
  useEffect(() => {
    handleCalculate();
  }, [_balance]);

  // fechar a modal e atualizar o valor do balance
  function updateBalance() {
    setModalVisible(!isModalVisible);
    handleLoadBalance();
  }

  // deletando os dados
  async function handleRemove(id) {
    const response = await AsyncStorage.getItem('@web-mercado:finances');
    const previousData = response ? JSON.parse(response) : [];
    const data = previousData.filter(item => item.id !== id);
    await AsyncStorage.setItem('@web-mercado:finances', JSON.stringify(data));

    const _response = await AsyncStorage.getItem('@web-mercado:_balance');
    const _previousData = _response ? JSON.parse(_response) : [];
    const _data = _previousData.filter(item => item.id !== id);
    await AsyncStorage.setItem('@web-mercado:_balance', JSON.stringify(_data));

    handleFetchData();
  }

  // atualiza o valor do saldo quando abre ou fecha a modal
  async function handleLoadBalance() {
    const balanceResponse = await AsyncStorage.getItem('@web-mercado:balance');
    const balance = balanceResponse ? JSON.parse(balanceResponse) : [];
    setBalance(balance);
  }

  // calculando o balance quando adicionar um novo item
  function handleCalculate() {
    let _newBalance = [];
    _balance.forEach(item => {
      console.log(item);
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.expensesShow}>
        <Text style={styles.titleText}>Meu Saldo</Text>
        <View style={styles.expenseContaier}>
          <Icon name="wallet-outline" style={styles.iconLabel} />
          <Text style={styles.subtitleText}>
            R$:{' '}
            {Number(balance)
              .toFixed(2)
              .replace('.', ',')
              .replace(/(\d)(?=(\d{3})+\,)/g, '$1.')}
          </Text>
        </View>
        <TouchableOpacity onPress={updateBalance} style={styles.btnEditar}>
          <Icon name="cog-outline" style={[styles.iconLabel, {fontSize: 30}]} />
        </TouchableOpacity>
        <Modal visible={isModalVisible} animationType={'slide'}>
          <BalanceModal closeModal={updateBalance} />
        </Modal>
      </View>
      <View style={styles.flatContainer}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View
              style={[styles.flatContainer, {backgroundColor: 'lightgray'}]}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>
                  Valor da Compra: R${' '}
                  {Number(item.expense)
                    .toFixed(2)
                    .replace('.', ',')
                    .replace(/(\d)(?=(\d{3})+\,)/g, '$1.')}
                </Text>
                <Text style={styles.text}>Data da compra: {item.date}</Text>
              </View>
              <View>
                <IconButton
                  icon="trash-can-outline"
                  size={40}
                  color="blue"
                  onPress={() => handleRemove(item.id)}
                />
              </View>
            </View>
          )}
        />
      </View>

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
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#656D78',
  },

  flatContainer: {
    flex: 3,
    flexDirection: 'row',
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  text: {
    padding: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
