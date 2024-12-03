import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MapScreen } from '../screens/maps/MapScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native'; // Reemplaza Layout si no lo estás utilizando
import LoginScreen from '../screens/auth/LoginScreens';

export type RootTabParams = {
  LoginScreen: undefined;
  MapScreen:undefined;
};

const Tab = createBottomTabNavigator<RootTabParams>();

export const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'LoginScreen') {
            iconName = focused ? 'people-outline' : 'people-outline';
          } else if (route.name === 'MapScreen') {
            iconName = focused ? 'camera-outline' : 'camera-outline';
          }

          return (
            <View>
              <Icon name={iconName} size={size} color={color} />
            </View>
          );
        },
        headerShown: false,
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      
      <Tab.Screen name="MapScreen" component={MapScreen} />
      <Tab.Screen name="LoginScreen" component={LoginScreen} />
    </Tab.Navigator>
  );
};
