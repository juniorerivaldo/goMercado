import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import stack pages
import NewExpense from '../Pages/NewExpense';
import Finances from '../Pages/Finances';


const Stack = createNativeStackNavigator();

export default function StackRoutesFinances() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Finanças"
        component={Finances}
        options={{
          headerStyle: {
            backgroundColor: '#656D78',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="Adicionar Gastos"
        component={NewExpense}
        options={{
          headerStyle: {
            backgroundColor: '#656D78',
          },
          headerTintColor: '#fff',
        }}
      />
   
    </Stack.Navigator>
  );
}
