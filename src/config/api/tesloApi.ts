
import axios from 'axios';
import { Platform } from 'react-native';
import { StorageAdapter } from '../adapters/storage-adapter';
import { STAGE, API_URL as PROD_URL, API_URL_IOS, API_URL_ANDROID } from '@env';
export const API_URL = 
  (STAGE === 'prod')
   ? PROD_URL
   : Platform.OS === 'ios'
      ? API_URL_IOS
      : API_URL_ANDROID;

console.log(`Current Platform: ${Platform.OS}`);
console.log(`Using API URL: ${API_URL}`);

const tesloApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// TODO: Interceptors
tesloApi.interceptors.request.use(
  async (config) => {
    const token = await StorageAdapter.getItem('token');
    if ( token )  {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  }
);

export {
  tesloApi,
}
