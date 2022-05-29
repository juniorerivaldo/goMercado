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
import {Picker} from '@react-native-picker/picker';
import {Button} from 'react-native-paper';
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native';

export default function NewItem() {
  // SETUP
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [qtd, setQtd] = useState('');
  const [qtdType, setQtdType] = useState('');

  function List() {
    navigation.navigate('Lista de Compras');
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
        <Text style={styles.subtitleText}>seu item a lista!</Text>

        <View style={styles.inputsContainer}>
          <Icon name="archive-edit-outline" style={styles.iconLabel} />
          <TextInput
            style={styles.TextInput}
            autoCapitalize={'characters'}
            placeholder="Ex: Molho de Tomate"
            placeholderTextColor={'#333'}
            onChangeText={setTitle}
            value={title}
          />
        </View>
        <View style={styles.inputsContainer}>
          <Icon name="numeric-positive-1" style={styles.iconLabel} />
          <TextInput
            style={styles.TextInput}
            onChangeText={setQtd}
            value={qtd}
            placeholder="Digite a quantidade."
            placeholderTextColor={'#333'}
            keyboardType="numeric"
          />
        </View>
        <Text style={styles.titleText}>Selecione</Text>
        <Text style={styles.subtitleText}>o tipo de unidade</Text>

        <View style={styles.inputsContainer}>
          <Icon name="format-list-checks" style={styles.iconLabel} />

          <Picker
            style={styles.picker}
            selectedValue={qtdType}
            onValueChange={(itemValue, itemIndex) => setQtdType(itemValue)}>
            <Picker.Item value={'default'} label={'Selecione...'} />
            <Picker.Item value={'Kilograma(s)'} label={'Kilograma'} key={1} />
            <Picker.Item value={'Unidade(s)'} label={'Unidade'} key={2} />
            <Picker.Item value={'Litro(s)'} label={'Litro'} key={3} />
          </Picker>
        </View>
        <View style={styles.btnContainer}>
          <Button
            icon="send"
            mode="contained"
            labelStyle={{color: '#8000ff'}}
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
    backgroundColor: '#8000ff',
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
  picker: {
    width: 280,
    color: '#333',
  },
  btnContainer: {
    flex: 1,
    height: 80,
    marginLeft: 100,
    marginRight: 100,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  TextInput: {
    marginLeft: 10,
    flex: 1,
  },
});
