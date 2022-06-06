import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert, TouchableOpacity} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BalanceModal(props) {
  const [balance, setBalance] = useState(0);

  async function handleNew() {
    try {
      if (balance == '') {
        Alert.alert('Error', 'Adicione todos os campos!');
      } else {
        // adicionando os novos valores
        await AsyncStorage.setItem(
          '@web-mercado:balance',
          JSON.stringify(balance),
        );
        setBalance(0);
        console.log(balance);
        props.closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
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
          value={balance}
          onChangeValue={setBalance}
          placeholder="Digite a quantia do seu saldo"
          prefix="R$"
          delimiter="."
          separator=","
          precision={2}
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={handleNew}>
          <Icon
            name="content-save-move-outline"
            style={[styles.iconLabel, {fontSize: 50}]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  modalContainer: {
    flex: 1,
    margin: 15,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#656D78',
  },
  iconLabel: {
    fontSize: 40,
    color: '#fff',
  },
});
