import axios from 'axios';
import Cookies from 'js-cookie';

export function tokenRefresh(refreshToken: string) {
  try {
    axios.post('https://toy-shop-api.onrender.com/api/user/token/refresh/', { 
      refresh: refreshToken
    })
    .then(response => {
      const { access} = response.data;
      Cookies.set('access_token', access);
      console.log('Рефреш успішний', response.data);
    })
    .catch(error => {
      console.error('Помилка рефреш токена', error);
    });
  } catch (error) {
    console.error('Помилка рефреш', error);
  }
}
