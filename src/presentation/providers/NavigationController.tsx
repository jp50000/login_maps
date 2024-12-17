import { useEffect } from 'react';
import { useAuthStore } from '../store/auth/useAuthStore';
import { usePermissionStore } from '../store/permissions/usePermissionStore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../navigation/StackNavigator';

export const NavigationController = ({ children }: { children: JSX.Element }) => {
    const { status, checkStatus, user } = useAuthStore();
    const { locationStatus, checkLocationPermission } = usePermissionStore();
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    // IDs relacionados a roles de líder
    const leaderRoleIds = [45, 46, 47]; // Agrega los IDs correspondientes

    useEffect(() => {
        // Verifica autenticación y permisos al iniciar
        checkStatus();
        checkLocationPermission();
    }, []);

    useEffect(() => {
        // Si no tiene permisos de ubicación, navegar a PermissionsScreen
        if (locationStatus !== 'granted') {
            navigation.reset({
                index: 0,
                routes: [{ name: 'PermissionsScreen' }],
            });
            return;
        }

        // Lógica de autenticación y navegación
        const isAdmin = user?.rol.includes(1);
        const isLeader = user?.rol.some((roleId) => leaderRoleIds.includes(roleId));

        if (status === 'authenticated') {
            if (isAdmin) {
                // Admin autenticado y con permisos
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'BottomTabsNavigator2' }],
                });
            } else {
                // Otros usuarios autenticados y con permisos
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'BottomTabsNavigator' }],
                });
            }
        } else if (status === 'unauthenticated') {
            // Usuario no autenticado
            navigation.reset({
                index: 0,
                routes: [{ name: 'BottomTabsNavigator' }],
            });
        }
    }, [status, locationStatus, user]);

    return <>{children}</>;
};
