import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuthStore } from '../../store/auth/useAuthStore';

const ProfileScreens = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout(); // Llama a la función de cerrar sesión
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.username}>Usuario: {user?.correo}</Text>
      <Button title="Cerrar Sesión" onPress={handleLogout} color="#FF4E3A" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  username: {
    fontSize: 16,
    marginBottom: 32,
  },
});

export default ProfileScreens;
