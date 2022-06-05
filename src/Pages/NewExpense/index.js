import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';
import DateField from 'react-native-datefield';
import moment from 'moment';
import CurrencyInput from 'react-native-currency-input';
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native';

export default function NewExpense() {
  // SETUP
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [expense, setExpense] = useState('');

  function Finances() {
    navigation.navigate('Finanças');
  }

  async function handleNew() {
    try {
      const id = uuid.v4();
      if (expense == '' || date == '') {
        Alert.alert('Error', 'Adicione todos os campos!');
      } else {
        const newData = {
          id,
          expense,
          date,
        };

        // baixando os dados e adicionando os novos com os antigos
        const response = await AsyncStorage.getItem('@web-mercado:finances');
        const previousData = response ? JSON.parse(response) : [];
        const data = [...previousData, newData];

        await AsyncStorage.setItem(
          '@web-mercado:finances',
          JSON.stringify(data),
        );
        setExpense('');
        setDate(new Date());
        Finances();
      }
    } catch (error) {
      console.log(error);
    }
  }
  // convert date
  function convertDate(value) {
    let newDate = moment(value).format('DD/MM/YYYY');
    setDate(newDate);
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingTop: 10}}>
        <Text style={styles.titleText}>Adicione</Text>
        <Text style={styles.subtitleText}>seu gasto lista!</Text>

        <View style={styles.inputsContainer}>
          <Icon name="currency-usd" style={styles.iconLabel} />
          <CurrencyInput
            style={{left: 30}}
            minValue={0}
            value={expense}
            onChangeValue={setExpense}
            placeholder="Digite o valor da compra"
            prefix="R$"
            delimiter="."
            separator=","
            precision={2}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.dataInput}>
          <Text style={styles.titleText}>Selecione</Text>
          <Text style={styles.subtitleText}>a data da compra</Text>
          <DateField
            labelDate="Dia"
            labelMonth="Mês"
            labelYear="Ano"
            autoFocus={true}
            defaultValue={date}
            styleInput={[styles.inputBorder, {color: '#fff', marginTop: 30}]}
            onSubmit={value => convertDate(value)}
          />
        </View>
        <View style={styles.btnContainer}>
          <Button
            icon="send"
            mode="contained"
            labelStyle={{color: 'blue'}}
            color="#fff"
            style={{
              borderRadius: 15,
              width: '100%',
              height: '60%',
              justifyContent: 'center',
            }}
            onPress={handleNew}>
            Enviar
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#656D78',
    justifyContent: 'center',
  },
  titleText: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitleText: {
    textAlign: 'center',
    color: '#FFF9',
    fontSize: 18,
    marginVertical: 10,
  },
  inputsContainer: {
    height: 55,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  iconLabel: {
    fontSize: 22,
    color: 'blue',
    marginRight: 30,
  },

  btnContainer: {
    flex: 1,
    height: 80,
    marginLeft: 100,
    marginRight: 100,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 40,
    justifyContent: 'center',
  },
  TextInput: {
    marginLeft: 10,
    flex: 1,
  },
  dataInput: {
    marginTop: 40,
  },
  inputBorder: {
    width: '30%',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 2,
  },
});
