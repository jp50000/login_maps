import { Platform, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Location } from '../../../infrastructure/interfaces/location';
import { useEffect, useRef, useState } from 'react';
import { useLocationStore } from '../../store/location/useLocationStore';

interface Props {
  showsUserLocation?: boolean;
  initialLocation: Location;
  isLoggedIn: boolean; // Se asume que este prop se pasa desde el proveedor de autenticación
}

export const Map = ({ showsUserLocation = true, initialLocation, isLoggedIn }: Props) => {
  const mapRef = useRef<MapView>(null);
  const [isFollowingUser, setIsFollowingUser] = useState(true); // El seguimiento está activo por defecto
  const [showLocation, setShowLocation] = useState(showsUserLocation);
  const [userLocation, setUserLocation] = useState<Location | null>(null); // Estado para almacenar la ubicación del usuario

  const {
    getLocation,
    lastKnownLocation,
    watchLocation,
    clearWatchLocation,
  } = useLocationStore();

  const zoomLevel = 0.01; // Ajusta el zoom del mapa según tu necesidad

  const moveCameraToLocation = (location: Location) => {
    if (mapRef.current) {
      mapRef.current.animateCamera({
        center: location,
        zoom: 18, // Ajuste de zoom
      });
    }
  };

  // Obtener ubicación inmediatamente al iniciar el componente
  useEffect(() => {
    const fetchInitialLocation = async () => {
      const location = await getLocation();
      if (location) {
        console.log('Ubicación inicial obtenida:', location); // Muestra las coordenadas obtenidas
        setUserLocation(location); // Guarda la ubicación en el estado
        moveCameraToLocation(location); // Mover la cámara a la nueva ubicación inmediatamente
      }
    };

    fetchInitialLocation(); // Llamar a la función para obtener la ubicación inmediatamente

    // Obtener ubicación automáticamente cada 10 segundos
    const locationInterval = setInterval(async () => {
      const location = await getLocation();
      if (location) {
        console.log('Ubicación actualizada:', location); // Muestra las coordenadas obtenidas cada 10 segundos
        setUserLocation(location); // Actualiza la ubicación en el estado
        moveCameraToLocation(location); // Mover la cámara a la nueva ubicación
      }
    }, 10000); // Actualizamos cada 10 segundos

    return () => {
      clearInterval(locationInterval); // Limpiar el intervalo al desmontar
      clearWatchLocation(); // Limpiar observador de ubicación
    };
  }, []);

  // Este useEffect se encarga de manejar el estado de seguimiento de la ubicación
  useEffect(() => {
    if (isLoggedIn) {
      setShowLocation(true); // Mostrar ubicación cuando el usuario está autenticado
      watchLocation();
    } else {
      setShowLocation(false); // Ocultar ubicación cuando no está autenticado
      clearWatchLocation(); // Limpiar la ubicación cuando no es necesario
    }

    return () => {
      clearWatchLocation(); // Limpiar los observadores de ubicación al desmontar
    };
  }, [isLoggedIn]); // Este efecto se dispara cada vez que cambia el estado de isLoggedIn

  // Este useEffect es necesario para mover la cámara a la última ubicación conocida cuando cambia
  useEffect(() => {
    if (lastKnownLocation && isFollowingUser) {
      console.log('Última ubicación conocida:', lastKnownLocation); // Muestra las coordenadas de la última ubicación conocida
      setUserLocation(lastKnownLocation); // Actualiza la ubicación en el estado
      moveCameraToLocation(lastKnownLocation); // Mueve la cámara a la ubicación actual
    }
  }, [lastKnownLocation, isFollowingUser]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        showsUserLocation={showLocation} // Aquí se asegura que se muestre la ubicación del usuario
        followsUserLocation={isFollowingUser} // Asegura que el mapa siga al usuario
        provider={Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: initialLocation.latitude, // Usamos la latitud de initialLocation
          longitude: initialLocation.longitude, // Usamos la longitud de initialLocation
          latitudeDelta: 0.01, // Ajuste del zoom en el eje latitud
          longitudeDelta: 0.01, // Ajuste del zoom en el eje longitud
        }}
        onTouchStart={() => setIsFollowingUser(false)} // Evita que el mapa se mueva al tocarlo
        onRegionChangeComplete={(region) => {
          if (!isFollowingUser) {
            // Si no estamos siguiendo al usuario, se actualiza la ubicación manualmente
            moveCameraToLocation(region); 
          }
        }}
        scrollEnabled={false} // Deshabilita el desplazamiento
  zoomEnabled={false} // Deshabilita el zoom
  rotateEnabled={false} // Deshabilita la rotación
  pitchEnabled={false} // Deshabilita la inclinación
      >
        {/* Agregar el marcador para mostrar la ubicación */}
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Ubicación actual"
            description="Esta es la ubicación actual del usuario"
          />
        )}
      </MapView>
    </View>
  );
};
