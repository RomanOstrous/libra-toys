import { useEffect } from "react";
import LogOut from "../../components/LogOut/LogOut";
import axios from 'axios';
import Cookies from 'js-cookie';


export const AccountPage = () => {
  const token = Cookies.get('access_token');
  console.log(token);

  useEffect(() => {
    axios.get('https://toy-shop-api.onrender.com/api/user/me/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      
      console.log('чотко', response);
    })
    .catch(error => {
      console.log('херня вийшла', error);
    });
  }, [token])

  return (
    <>
      <h1> AccountPage </h1>

      <div>{}</div>
      
      <LogOut />
    </>
  );
};