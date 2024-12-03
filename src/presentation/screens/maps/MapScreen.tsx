import { StyleSheet, View } from 'react-native';
import { Map } from '../../components/maps/Map';
import { useLocationStore } from '../../store/location/useLocationStore';
import { LoadingScreen } from '../loading/LoadingScreen';
import { useEffect } from 'react';
import { Layout } from '@ui-kitten/components';


export const MapScreen = () => {

  const { lastKnownLocation, getLocation } = useLocationStore();

  useEffect(() => {
    if ( lastKnownLocation === null ) {
      getLocation();
    }
  }, [])
  
 

  if ( lastKnownLocation === null ) {
    return (<LoadingScreen />)
  }


  return (
    <Layout style={ styles.container}>



      <Map 
        initialLocation={ lastKnownLocation }
      />


   </Layout>
  )
}


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },

 });