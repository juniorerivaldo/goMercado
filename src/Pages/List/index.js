import React, {useState, useCallback} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {IconButton} from 'react-native-paper';

import {FAB} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function List() {
  function NewItem() {
    navigation.navigate('Adicionar item');
  }

  // SETUP
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [color, setColor] = useState('lightgray');

  // recebendo os dados
  async function handleFetchData() {
    const response = await AsyncStorage.getItem('@web-mercado:todos');
    const data = response ? JSON.parse(response) : [];
    setData(data);
  }

  // funcao para recarregar a tela quando adiciona um novo item
  useFocusEffect(
    useCallback(() => {
      handleFetchData();
      setColor('lightgray');
    }, []),
  );

  // deletando os dados
  async function handleRemove(id) {
    const response = await AsyncStorage.getItem('@web-mercado:todos');
    const previousData = response ? JSON.parse(response) : [];

    const data = previousData.filter(item => item.id !== id);
    await AsyncStorage.setItem('@web-mercado:todos', JSON.stringify(data));
    handleFetchData();
  }

  // alterando um item
  async function handleEdit(item) {
    const newData = {
      id: item.id,
      title: item.title,
      qtd: item.qtd,
      qtdType: item.qtdType,
      isCompleted: !item.isCompleted,
    };
    await handleRemove(item.id);

    const response = await AsyncStorage.getItem('@web-mercado:todos');
    const previousData = response ? JSON.parse(response) : [];
    const data = [...previousData, newData];

    await AsyncStorage.setItem('@web-mercado:todos', JSON.stringify(data));
    handleFetchData();
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View
            style={[
              styles.flatContainer,
              {backgroundColor: item.isCompleted ? '#90ee90' : 'lightgray'},
            ]}>
            <IconButton
              icon="checkbox-outline"
              size={40}
              color="#8000ff"
              onPress={() => handleEdit(item)}
            />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Item: {item.title}</Text>
              <Text style={styles.text}>
                Quantidade: {item.qtd} {item.qtdType}
              </Text>
            </View>
            <View>
              <IconButton
                icon="trash-can-outline"
                size={40}
                color="#8000ff"
                onPress={() => handleRemove(item.id)}
              />
            </View>
          </View>
        )}
      />

      <FAB style={styles.fab} Large icon="plus" onPress={NewItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 10,
    right: 50,
    bottom: 2,
    backgroundColor: '#8000ff',
  },
  flatContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 10,
    alignItems: 'center',
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
