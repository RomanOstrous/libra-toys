/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import '../../styles/style/LoginForm.scss';
import Cookies from 'js-cookie';
import { useState } from 'react';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hook';
import { actions } from '../../app/Slices/authSlice';
import { client } from '../../services/httpClient';
import Google from "../../assets/icons/google.svg";
import {gapi} from 'gapi-script';
import axios from "axios";

interface TokenResponse {
  access: string;
  refresh: string;
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  const [disable, setDisable] = useState(false);

  const base = process.env.REACT_APP_BASE_URL;
  const clientId = process.env.REACT_APP_CLIENT_ID;
  let hasError = false;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    setHasEmailError('');
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
  };

  const handleEmailBlur = () => {
    if (!email.includes('@')) {
      setHasEmailError('Введіть коректну адресу електронної пошти');
      hasError = true;
    }
  };
  
  const onFinish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleEmailBlur();

    if (!hasError) {
      setDisable(true);

      const data = {
        email: email,
        password: password
      };

      try {
        setLoader(true);
        const response = await client.post<TokenResponse>('user/token/', data);
        const { access, refresh } = response;

        Cookies.set('access_token', access);
        Cookies.set('refresh_token', refresh);
        dispatch(actions.login());
        navigate('/account');
        setEmail('');
        setPassword('');

        console.log('Логін успішний:', response);
      } catch {
        setError('Схоже сталась помилка, перевірте правильність почти та паролю');

        setTimeout(() =>{
          setError('');
        }, 5000);
      } finally {
        setLoader(false);
        setDisable(false);
      }
    }
  };

  const handleGoogle = () => {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: clientId,
        prompt: 'select_account', // Налаштовуємо параметр prompt на 'select_account'
      }).then(() => {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signIn().then((googleUser: any) => {
          const idToken = googleUser.getAuthResponse().id_token;
  
          axios.post(base + 'user/social-auth/google/', {
            "auth_token": idToken
          }).then(resp => {
            Cookies.set('access_token', resp.data.tokens.access);
            Cookies.set('refresh_token', resp.data.tokens.refresh);
            dispatch(actions.login());
            navigate('/account');
            setEmail('');
            setPassword('');
            console.log(resp);
          });
        }).catch((error: any) => {
          console.error('Помилка авторизації Google:', error);
        });
      });
    });
  }

  return (
    <>
      <div className="login container grid ">
        <div className="login__container grid__item--desktop-3-6 grid__item--tablet-2-5">
          <h1 className='login__title'>Вхід</h1>

          <button className='login__google' onClick={() => handleGoogle()}>
            <img src={Google} alt="Google" className='login__google-ico'/>
            <p className='login__google-text'>Через Google</p>
          </button>
          
          
          <div className="login__decor">
            <span className="login__decor-line"></span>
            <span className="login__decor-text">або</span>
            <span className="login__decor-line"></span>
          </div>

          <form className='login__form' onSubmit={onFinish}>
            <p className='login__form-text'>
              Пошта
            </p>

            <input
              className={classNames('login__input', {
                'login__input--is-danger': hasEmailError,
                'login__input--is-ok': !hasEmailError && email
              })}
              name="email" 
              placeholder="Введи свою почту"
              autoComplete='off'
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
            />

            {hasEmailError ? (
              <p className='login__input-error'>{hasEmailError}</p>
            ) : (
              <p className='login__input-noerror'></p>
            )}

            <p className='login__form-text'>
              Пароль
            </p>

            <input 
              className={classNames('login__input', {
                'login__input--is-ok':  password.length >= 8
              })} 
              type="password" 
              name="password" 
              placeholder="Введи свій пароль"
              value={password}
              onChange={handlePasswordChange}
            />

          <button className="login__button" disabled={disable}>
            {loader ? 'Загрузка...' : 'Увійти'}
          </button>
          
          {error ? (
              <p className='login__input-error'>{error}</p>
            ) : (
              <p className='login__input-noerror'></p>
            )}
        </form>

        <button
          onClick={() => navigate('/res-password')}
          className="login__link"
        >
          Забув пароль?
        </button>

      </div>
        <div className="login__bottom grid__item--desktop-3-6 grid__item--tablet-2-5">
          <p className="login__question">Не маєш облікового запису?</p>
          <Link to='/signin' className="login__link">Зареєструватись</Link>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
