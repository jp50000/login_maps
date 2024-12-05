import Geolocation from '@react-native-community/geolocation';
import {Location} from '../../infrastructure/interfaces/location';

export const getCurrentLocation = async (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      info => {
        resolve({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      error => {
        console.error('Error obteniendo la ubicación:', error); // Detalles del error
        reject(error); // Pasar el error real
      },
      {
        enableHighAccuracy: true,
        timeout: 20000, // Establecer un tiempo de espera para evitar que se quede colgado mucho tiempo
        maximumAge: 1000, // Evitar obtener ubicaciones desactualizadas
      },
    );
  });
};


export const watchCurrentLocation = (
  locationCallback: (location: Location) => void,
): number => {
  return Geolocation.watchPosition(
    info => {
      locationCallback({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      });
    },
    error => {
      console.error('Error observando la ubicación:', error); // Log del error
      // Aquí podrías lanzar una alerta o manejar el error de otra manera, si lo deseas
    },
    {
      enableHighAccuracy: true,
      distanceFilter: 10, // Solo actualizar si el dispositivo se mueve una distancia mínima de 10 metros
      interval: 15000, // Actualizar cada 15 segundos
    },
  );
};


export const clearWatchLocation = (watchId: number) => {
  if (watchId !== null && watchId !== undefined) {
    Geolocation.clearWatch(watchId);
    console.log('Watch location cleared');
  } else {
    console.error('Invalid watchId');
  }
};
