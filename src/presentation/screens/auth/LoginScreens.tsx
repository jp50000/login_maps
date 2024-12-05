import React, { useState, useEffect } from 'react';
import {
  Alert,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  ImageBackground,
  Image,
} from 'react-native';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuthStore } from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

const LoginScreen = ({ navigation }: Props) => {
  const { login } = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({ correo: '', password: '' });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { height, width } = useWindowDimensions();


  
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleInputChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onLogin = async () => {
    if (!form.correo || !form.password) {
      Alert.alert('Error', 'Por favor ingrese correo y contraseña');
      return;
    }

    setIsPosting(true);
    const wasSuccessful = await login(form.correo, form.password);
    setIsPosting(false);

    if (!wasSuccessful) {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <Layout style={{ flex: 1 }}>
      {/* Background Image */}
      <ImageBackground
        source={require('../../../assets/img/estrobo_acp.png')}
        style={{
          position: 'absolute',
          top: height * 0.2, // Ajusta la posición
          right: width * 0.45, // Centra horizontalmente
          height: height * 0.8, // Reduce altura
          width: width * 0.6, // Reduce ancho
        }}
        resizeMode="cover"
      />
  
      <ScrollView contentContainerStyle={{ paddingHorizontal: 40, flexGrow: 1 }}>
        {/* Logo */}
        <Layout
          style={{
            paddingTop: height * 0.2,
            alignItems: 'center',
            marginBottom: 5,
            backgroundColor: 'transparent',
          }}
        >
          <Image
            source={require('../../../assets/img/LogoBorde.png')}
            style={{ width: 250, height: 250 }}
            resizeMode="contain"
          />
        </Layout>
  
        {/* Form Inputs */}
        <Layout style={{ marginTop: -50, backgroundColor: 'transparent' }}>
          <Input
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.correo}
            onChangeText={(value) => handleInputChange('correo', value)}
            accessoryRight={<Icon name="mail-outline" size={25} />}
            style={{ marginBottom: 15, borderRadius: 30 }}
          />
  
          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            value={form.password}
            onChangeText={(value) => handleInputChange('password', value)}
            accessoryRight={() => (
              <Icon name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'} onPress={toggleSecureEntry} size={25} />
            )}
            secureTextEntry={secureTextEntry}
            style={{ marginBottom: 15, borderRadius: 30 }}
          />
        </Layout>
  
        {/* Login Button */}
        <Layout style={{ backgroundColor: 'transparent'}}>
            <Button
              disabled={isPosting}
              accessoryRight={<Icon name="arrow-forward-outline" size={25} />}
              onPress={onLogin}
            >
              Ingresar
            </Button>
        </Layout>
      </ScrollView>
    </Layout>
  );
  
  
};

export default LoginScreen;