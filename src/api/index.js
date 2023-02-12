import axios from 'axios';
import {Alert} from 'react-native';
import {BaseURL} from '../config';

const Client = axios.create({
  baseURL: BaseURL,
});

// Client.interceptors.request.use(
//   async config => {
//     const access_token = 'fe01587e8bbe76c3ff7ceeab5f218c1d';
//     config.headers.Authorization = `Bearer ${access_token}`;

//     return config;
//   },
//   error => Promise.reject(error),
// );

Client.interceptors.response.use(
  async res => {
    return res;
  },
  async error => {
    if (error.response) {
      // Request made and server responded
      if (error.response.status >= 500) {
        Alert.alert(
          'Error!',
          'Terjadi Kesalahan Pada Server. Silahkan coba beberapa saat lagi',
        );
      }

      if (error.response.status === 401) {
        Alert.alert('Error!', 'Anda tidak mendapatkan akses');
      }
    } else if (error.request) {
      // The request was made but no response was received
      Alert.alert('Koneksi Error', 'Harap periksa koneksi anda');
    } else {
      // Something happened in setting up the request that triggered an Error
      Alert.alert('Koneksi Error', 'Harap periksa koneksi anda');
    }

    return Promise.reject(error);
  },
);

export {Client};
