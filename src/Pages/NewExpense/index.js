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
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native';

export default function NewExpense() {
  // SETUP
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [qtd, setQtd] = useState('');
  const [date, setDate] = useState(new Date());

  function NewDate() {
    console.log(date);
  }

  function Finances() {
    navigation.navigate('adicionar gastos');
  }

  async function handleNew() {
    try {
      const id = uuid.v4();
      if (title == '' || qtd == '' || qtdType == null) {
        Alert.alert('Error', 'Adicione todos os campos!');
      } else {
        const newData = {
          id,
          title,
          qtd,
          qtdType,
          isCompleted: false,
        };

        // baixando os dados e adicionando os novos com os antigos
        const response = await AsyncStorage.getItem('@web-mercado:todos');
        const previousData = response ? JSON.parse(response) : [];
        const data = [...previousData, newData];

        await AsyncStorage.setItem('@web-mercado:todos', JSON.stringify(data));
        setTitle('');
        setQtd('');
        setQtdType('');
        List();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingTop: 10}}>
        <Text style={styles.titleText}>Adicione</Text>
        <Text style={styles.subtitleText}>seu gasto lista!</Text>

        <View style={styles.inputsContainer}>
          <Icon name="currency-usd" style={styles.iconLabel} />
          <TextInput
            style={styles.TextInput}
            placeholder="Digite o valor da compra"
            placeholderTextColor={'#333'}
            onChangeText={setTitle}
            value={title}
            keyboardType="numeric"
          />
        </View>
       

       
        <View style={ styles.dataInput }>
        <Text style={styles.titleText}>Selecione</Text>
        <Text style={styles.subtitleText}>a data da compra</Text>
          <DateField
            labelDate="Dia"
            labelMonth="Mês"
            labelYear="Ano"
            defaultValue={date}
            styleInput={ [ styles.inputBorder, { color: '#fff', marginTop:30 } ] }
            onSubmit={(value) => setDate(value)}
            
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
            onPress={NewDate}>
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
