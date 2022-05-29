import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import stack pages
import List from '../Pages/List';
import NewItem from '../Pages/NewItem';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lista de Compras"
        component={List}
        options={{
          headerStyle: {
            backgroundColor: '#8000ff',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="Adicionar item"
        component={NewItem}
        options={{
          headerStyle: {
            backgroundColor: '#8000ff',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}
