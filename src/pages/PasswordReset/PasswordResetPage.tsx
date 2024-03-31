import React, { useEffect } from 'react'
import { client } from '../../services/httpClient';

export default function PasswordResetPage() {
  const email = localStorage.getItem('email');
  console.log(email)
  
  useEffect(() => {
    if (email) {
      client.post('user/password_reset/', {
        email: email
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('Помилка скидання пароля:', error)
      });
    }
  }, [email]);

  return (
    <>
    <p>{email}</p>
    </>
  )
}
