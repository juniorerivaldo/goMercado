import React, {useState} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import of pages
import StackRoutes from '../Routes/StackRoutes';
import StackRoutesFinances from './StackRoutesFinances';

export default function Routes() {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      barStyle={{backgroundColor: '#5D9CEC'}}
      tabBarCo
      activeColor="#f0edf6"
      shifting={true}
      inactiveColor="#3e2465">
      <Tab.Screen
        name="StackRoutes"
        component={StackRoutes}
        options={{
          tabBarLabel: 'Lista de Compras',
          tabBarColor: '#8000ff',
          tabBarIcon: color => (
            <Icon name="cart-plus" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="StackRoutesFinances"
        component={StackRoutesFinances}
        options={{
          tabBarLabel: 'Finanças',
          tabBarColor: '#656D78',
          tabBarIcon: ({color}) => (
            <Icon name="account-cash-outline" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
