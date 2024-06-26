/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import '../../styles/style/PasswordReset.scss';
import classNames from 'classnames';
import { client } from '../../services/httpClient';

export default function PasswordRecoveryPage() {
  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState('');

  const [message, setMessage] = useState('');
  const [messageOk, setMessageOk] = useState('');
  const [loader, setLoader] = useState(false);
  const [disable, setDisable] = useState(true);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    setHasEmailError('');
    setDisable(false);

    if (value.length < 0) {
      setDisable(true);
    }
  };

  const handleEmailBlur = () => {
    if (
      !email.includes('@') 
      || email[0] === '@' 
      || /[#\$ ]/.test(email) 
      || !email.includes('.') 
      || !/\.[A-Za-z]+$/.test(email)
    ) {
      setHasEmailError('Введіть коректну адресу електронної пошти');
      setDisable(true);
    }
  };

  const handleClick = () => {
    setLoader(true);

    client.post('user/password_reset/', {
      email: email,
    })
    .then((response: any) => {
      setLoader(false);
      setMessageOk('Посилання успішно надіслано');
      setMessage('');
      console.log(response);
    })
    .catch((err: any) => {
      setLoader(false);
      setMessage('Сталась помилка, спробуй ще раз');
      setMessageOk('');
      console.log(err);
    })
  }

  return (
    <div className="password container grid">
      <div className="password-reset__container grid__item--desktop-3-6 grid__item--tablet-2-5">
        <p className='password-reset__title'>Відновлення паролю</p>

        <p className='password-reset__info'>
        Щоб відновити пароль, будь ласка, введіть свою пошту. Ми надішлемо на неї посилання, за яким ви зможете створити новий пароль.
        Будь ласка, зачекайте, це може зайняти кілька хвилин, щоб лист до вас дійшов.
        </p>
        
        <div className="password-reset__box">
          <p className='password-reset__text'>
            Пошта
          </p>

          <input
            className={classNames('password-reset__input', {
              'password-reset__input--is-danger': hasEmailError,
              'password-reset__input--is-ok': !hasEmailError && email
            })}
            name="email" 
            placeholder="Введи свою почту"
            autoComplete='off'
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
          />

          {hasEmailError ? (
            <p className='password-reset__input-error'>{hasEmailError}</p>
          ) : (
            <p className='password-reset__input-noerror'></p>
          )}
        </div>


        <button className="password-reset__button" disabled={disable} onClick={handleClick}>
          {loader ? 'Відправка...' : 'Відправити'}
        </button>

        {(!message && !messageOk) && (
            <p className='password-reset__input-noerror'></p>
        )}
        
        {message && (
            <p className='password-reset__input-error'>{message}</p>
          ) 
        }

        {messageOk && (
            <p className='password-reset__input-ok'>{messageOk}</p>
          )
        }
      </div>
    </div>
  )
}
