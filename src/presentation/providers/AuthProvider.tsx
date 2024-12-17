import { PropsWithChildren, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigator';
import { useAuthStore } from '../store/auth/useAuthStore';
import { Alert } from 'react-native';

export const AuthProvider = ({ children }: PropsWithChildren) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const { checkStatus, status,user,logout } = useAuthStore();

    const leaderRoleIds = [38,39,40,41,42,43,44,45,46,47,48,49,50,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,68,69,72,73,74,75]; // IDs de roles de líderes

    const isAdmin = user?.rol.includes(1);
    const isOpjefe = user?.rol.includes(12);
    const isCoordinatorHem = user?.rol.includes(67);
    const isCoordinatorip = user?.rol.includes(33);
    const isSupervisorservicop = user?.rol.includes(32);
    const isLeader = user?.rol.some((roleId) => leaderRoleIds.includes(roleId));


    useEffect(() => {
        checkStatus();
    }, [])

    useEffect(() => {
        if (status !== 'checking') {
            if (status === 'authenticated') {
                if (isAdmin) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'BottomTabsNavigator2' }], // Replace with admin-specific screen
                    });
                }
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'BottomTabsNavigator' }],
                })
            }
        }


    }, [status])




    return (
        <>{children}</>
    )
}