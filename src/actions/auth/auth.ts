import { tesloApi } from '../../config/api/tesloApi';
import { User } from '../../domain/entities/user';
import type { AuthResponse } from '../../infrastructure/interfaces/auth.responses';
import { AxiosError } from 'axios';

const returnUserToken = (data: AuthResponse) => {
  const user: User = {
    id: data.id,
    correo: data.correo,
    password:data.password,
    isActive: data.isActive,
    turno: data.turno,
    rol: data.rol,
    exp: data.exp,
    id_punto: data.id_punto,
    tipo_usuario: data.tipo_usuario,
    avatar:`https://app.servicop.com/public/imagenes/Usuarios/thumbnails/${data.avatar}`,
    celular: data.celular,
    apellido_paterno: data.apellido_paterno,
    apellido_materno: data.apellido_materno,
    nombre: data.nombre,
    rol_nombre: data.rol_nombre,
    deviceId: data.deviceId,
    id_puestos_acargo: data.id_puestos_acargo
  };

  //console.log('User returned from API:', user); // Añadir este log

  return {
    user: user,
    token: data.token,
  };
};

export const authLogin = async (correo: string, password: string) => {
  correo = correo.toLowerCase(); // Convertir correo a minúsculas según tu lógica
  try {
    const { data } = await tesloApi.post<AuthResponse>('/api/login', {
      correo,
      password,
    });
    console.log('authLogin response:', data); // Log para verificar respuesta
    return returnUserToken(data);
  } catch (error) {
    console.log('authLogin error:', error); // Log para verificar errores
    return null;
  }
};

export const authCheckStatus = async () => {
  try {
    const { data } = await tesloApi.get<AuthResponse>('/api/check-status');
    console.log('authCheckStatus response:', data); // Log successful response
    return returnUserToken(data);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        console.log('authCheckStatus: No active session'); // Handle no active session
      } else {
        console.log('authCheckStatus error:', error.response?.data); // Log the error response data
      }
    } else {
      console.log('Unknown error:', error); // Handle unknown errors
    }
    return null;
  }
};
