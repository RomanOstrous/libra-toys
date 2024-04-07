import axios from 'axios';
import Cookies from 'js-cookie';
const base = process.env.REACT_APP_BASE_URL;

export function tokenRefresh(refreshToken: string) {
  try {
    axios.post(base + 'user/token/refresh/', { 
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
