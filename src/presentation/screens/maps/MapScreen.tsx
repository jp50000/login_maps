// MapScreen.tsx
import { StyleSheet, View } from 'react-native';
import { Map } from '../../components/maps/Map';
import { useLocationStore } from '../../store/location/useLocationStore';
import { LoadingScreen } from '../loading/LoadingScreen';
import { useEffect, useState } from 'react';
import { Layout } from '@ui-kitten/components';

export const MapScreen = () => {
  const { lastKnownLocation, getLocation } = useLocationStore();
  const [locationReady, setLocationReady] = useState(false);

  useEffect(() => {
    const locationInterval = setInterval(() => {
      getLocation();
    }, 5000); // Actualizar ubicación cada 5 segundos

    // Esperar a que la ubicación esté lista antes de proceder
    if (lastKnownLocation !== null) {
      setLocationReady(true);
    }

    return () => clearInterval(locationInterval); // Limpiar el intervalo al desmontar
  }, [lastKnownLocation]);

  if (!locationReady) {
    return <LoadingScreen />;
  }

  return (
    <Layout style={styles.container}>
      <Map
        initialLocation={lastKnownLocation} // Pasar la última ubicación conocida
        isLoggedIn={true} // Suponiendo que el usuario está autenticado
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
