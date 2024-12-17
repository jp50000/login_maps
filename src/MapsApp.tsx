import 'react-native-gesture-handler';

import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { useColorScheme } from 'react-native';
import { AuthProvider } from './presentation/providers/AuthProvider';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PermissionsChecker } from './presentation/providers/PermissionsChecker';
import { NavigationController } from './presentation/providers/NavigationController';

const queryClient = new QueryClient();

export const MapsApp = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;
  const backgroundColor =
    colorScheme === 'dark'
      ? theme['color-basic-800']
      : theme['color-basic-100'];

  return (
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme} customMapping={eva.mapping}>
        <NavigationContainer
          theme={{
            dark: colorScheme === 'dark',
            colors: {
              primary: theme['color-primary-500'],
              background: backgroundColor,
              card: theme['color-basic-100'],
              text: theme['text-basic-color'],
              border: theme['color-basic-800'],
              notification: theme['color-primary-500'],
            },
            fonts: {
              regular: { fontFamily: 'Roboto-Regular', fontWeight: 'normal' },
              medium: { fontFamily: 'Roboto-Medium', fontWeight: 'normal' },
              bold: { fontFamily: 'Roboto-Bold', fontWeight: 'normal' },
              heavy: { fontFamily: 'Roboto-Bold', fontWeight: 'normal' },
            },
          }}>
          <AuthProvider>
            <PermissionsChecker>
                <StackNavigator />
            </PermissionsChecker>
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </QueryClientProvider>
  );
};
