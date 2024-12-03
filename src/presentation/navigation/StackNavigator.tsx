import {createStackNavigator, StackCardStyleInterpolator} from '@react-navigation/stack';
import {LoadingScreen} from '../screens/loading/LoadingScreen';
import {MapScreen} from '../screens/maps/MapScreen';
import {PermissionsScreen} from '../screens/permissions/PermissionsScreen';
import { BottomTabsNavigator } from './BottomTabsNavigator';
import LoginScreens from '../screens/auth/LoginScreens';
import ProfileScreens from '../screens/profile/ProfileScreens';
import { BottomTabsNavigator2 } from './BottomTabsNavigator2';

export type RootStackParams = {
  LoadingScreen: undefined;
  PermissionsScreen: undefined;
  MapScreen: undefined;
  LoginScreen: undefined;
  BottomTabsNavigator: undefined;
  BottomTabsNavigator2: undefined;
  ProfileScreens: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ({current}) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  };
};

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoadingScreen"
      // initialRouteName="PermissionsScreen"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: fadeAnimation,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreens} />
      <Stack.Screen name="ProfileScreens" component={ProfileScreens} />
      <Stack.Screen name="BottomTabsNavigator" component={BottomTabsNavigator} />
      <Stack.Screen name="BottomTabsNavigator2" component={BottomTabsNavigator2} />


    </Stack.Navigator>
  );
};
