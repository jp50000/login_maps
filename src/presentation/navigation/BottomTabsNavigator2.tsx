import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MapScreen } from '../screens/maps/MapScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native'; // Reemplaza Layout si no lo estás utilizando
import LoginScreen from '../screens/auth/LoginScreens';
import ProfileScreens from '../screens/profile/ProfileScreens';

export type RootTabParams = {
    ProfileScreens: undefined;
  MapScreen:undefined;

};

const Tab = createBottomTabNavigator<RootTabParams>();

export const BottomTabsNavigator2 = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'ProfileScreens') {
            iconName = focused ? 'person-outline' : 'person-outline';
          } else if (route.name === 'MapScreen') {
            iconName = focused ? 'map-outline' : 'map-outline';
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
    <Tab.Screen name="ProfileScreens" component={ProfileScreens} />
    </Tab.Navigator>
  );
};
