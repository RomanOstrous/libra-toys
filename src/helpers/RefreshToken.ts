import axios from 'axios';
import Cookies from 'js-cookie';

export function tokenRefresh(refreshToken: string) {
  try {
    axios.post('https://toy-shop-api.onrender.com/api/user/token/refresh/', { 
      refresh: refreshToken
    })
    .then(response => {
      const { access, refresh} = response.data;
      Cookies.set('access_token', access);
      Cookies.set('refresh_token', refresh);
      console.log('Token refreshed successfully:', response.data);
    })
    .catch(error => {
      console.error('Failed to refresh token:', error);
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
  }
}