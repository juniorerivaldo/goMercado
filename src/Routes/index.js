import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import of pages
import Finances from '../Pages/Finances';
import StackRoutes from '../Routes/StackRoutes';

export default function Routes() {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      barStyle={{backgroundColor: '#694fad'}}
      activeColor="#f0edf6"
      inactiveColor="#3e2465">
      <Tab.Screen
        name="StackRoutes"
        component={StackRoutes}
        options={{
          tabBarLabel: 'Lista de Compras',
          tabBarIcon: ({color}) => (
            <Icon name="cart-plus" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Finances"
        component={Finances}
        options={{
          tabBarLabel: 'Finanças',
          tabBarIcon: ({color}) => (
            <Icon name="account-cash-outline" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
