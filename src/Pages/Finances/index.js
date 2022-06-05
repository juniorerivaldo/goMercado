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
import CurrencyInput from 'react-native-currency-input';

export default function Finances() {
  function NewExpense() {
    navigation.navigate('Adicionar Gastos');
  }
  // SETUP
  const navigation = useNavigation();
  const [saldo, setSaldo] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  const [data, setData] = useState([]);

  // Open and close modal upon button clicks.
  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  // recebendo os dados
  async function handleFetchData() {
    const response = await AsyncStorage.getItem('@web-mercado:finances');
    const data = response ? JSON.parse(response) : [];
    setData(data);
  }

  // funcao para recarregar a tela quando adiciona um novo item
  useFocusEffect(
    useCallback(() => {
      handleFetchData();
    }, []),
  );

  // check array changes
  useEffect(() => {
    handleSumItems();
  }, [data]);

  // deletando os dados
  async function handleRemove(id) {
    const response = await AsyncStorage.getItem('@web-mercado:finances');
    const previousData = response ? JSON.parse(response) : [];

    const data = previousData.filter(item => item.id !== id);
    await AsyncStorage.setItem('@web-mercado:finances', JSON.stringify(data));
    handleFetchData();
  }
  // removendo valor do total soma por cada item que integrar o array
  let soma = [];
  somaS = 0;
  function handleSumItems() {
    data.forEach(item => {
      if (!soma.includes(item.id)) {
        soma.push(item.expense, item.id);
        somaS += item.expense;
        console.log(somaS);
        setSaldo(saldo - somaS);
      }
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
            {Number(saldo)
              .toFixed(2)
              .replace('.', ',')
              .replace(/(\d)(?=(\d{3})+\,)/g, '$1.')}
          </Text>
        </View>
        <TouchableOpacity
          onPress={toggleModalVisibility}
          style={styles.btnEditar}>
          <Icon name="cog-outline" style={[styles.iconLabel, {fontSize: 30}]} />
        </TouchableOpacity>
        <Modal visible={isModalVisible} animationType={'slide'}>
          <View style={styles.modalContainer}>
            <Text style={{fontSize: 28, fontWeight: 'bold', color: '#fff'}}>
              Digite o Novo saldo aqui!
            </Text>
            <CurrencyInput
              style={{
                marginBottom: 100,
                marginTop: 30,
                textAlign: 'center',
                backgroundColor: '#fff',
                borderRadius: 10,
              }}
              minValue={0}
              maxValue={100000}
              value={saldo}
              onChangeValue={setSaldo}
              placeholder="Digite a quantia do seu saldo"
              prefix="R$"
              delimiter="."
              separator=","
              precision={2}
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={toggleModalVisibility}>
              <Icon
                name="content-save-move-outline"
                style={[styles.iconLabel, {fontSize: 50}]}
              />
            </TouchableOpacity>
          </View>
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
