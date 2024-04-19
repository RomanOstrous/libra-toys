/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import '../../styles/style/LoginForm.scss';
import { useState } from 'react';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { client } from '../../services/httpClient';
import Google from "../../assets/icons/google.svg";
import { gapi } from "gapi-script";
import Cookies from "js-cookie";
import axios from "axios";
import { useAppDispatch } from "../../app/hook";
import { actions } from "../../app/Slices/authSlice";

function SigninForm() {
  const [name, setName] = useState('');
  const [hasNameError, setHasNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [hasLastNameError, setHasLastNameError] = useState('');
  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState('');
  const [passwordOk, setPasswordOk] = useState('');
  const [hasPasswordErrorOk, setHasPasswordErrorOk] = useState('');
  const [loader, setLoader] = useState(false);
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState('');
  
  let hasError = false;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const startsWithCapitalLetter = (str: string) => {
    return str[0] === str[0].toUpperCase();
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
    setHasNameError('');
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLastName(value);
    setHasLastNameError('');
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    setHasEmailError('');
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
    setHasPasswordError('');
  };

  const handlePasswordOkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPasswordOk(value);
    setHasPasswordErrorOk('');
  };

  const handleNameBlur = () => {
    if (!name) {
      setHasNameError("Введіть ім'я");
      hasError = true;
    } else if (!startsWithCapitalLetter(name)) {
      setHasNameError("Ім'я має починатись з великої літери");
      hasError = true;
    }
  };

  const handleLastNameBlur = () => {
    if (!lastName) {
      setHasLastNameError('Введіть прізвище');
      hasError = true;
    } else if (!startsWithCapitalLetter(lastName)) {
      setHasLastNameError("Прізвище має починатись з великої літери");
      hasError = true;
    }
  };

  const handleEmailBlur = () => {
    if (!email.includes('@')) {
      setHasEmailError('Введіть коректну адресу електронної пошти');
      hasError = true;
    }
  };
  
  const handlePasswordBlur = () => {
    if (password.length < 8) {
      setHasPasswordError('Пароль повинен містити не менше 8 символів');
      hasError = true;
    }
  };
  
  const handlePasswordOkBlur = () => {
    if (password !== passwordOk) {
      setHasPasswordErrorOk('Пароль не співпадає');
      hasError = true;
    }
  };

  const onFinish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleEmailBlur();
    handlePasswordBlur();
    handlePasswordOkBlur();
    handleLastNameBlur();
    handleNameBlur();

    if (!hasError) {
      setDisable(true);
      
      const data = {
        email: email,
        password: password,
        first_name: name,
        last_name: lastName
      };
  
      try {
        setLoader(true);
        const response = await client.post('user/registration/', data);
        navigate('../login');
        setName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setPasswordOk('');

        console.log('Реєстрація успішна', response);
      } catch {
        setError('Не вдалось створити аккаунт! Спробуте ще.')
        
        setTimeout(() =>{
          setError('');
        }, 5000);
      } finally {
        setLoader(false);
        setDisable(false);
      }
    }
  };

  const base = process.env.REACT_APP_BASE_URL;
  const clientId = "88092891520-fd4c7t6lrqmgubjs2dtg4bqvfj2v513u.apps.googleusercontent.com";

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
          <h1 className='login__title'>Зареєструватись</h1>
          <button className='login__google' onClick={() => handleGoogle()}>
            <img src={Google} alt="" className='login__google-ico'/>
            <p className='login__google-text'>Через Google</p>
          </button>
          
          <div className="login__decor">
            <span className="login__decor-line"></span>
            <span className="login__decor-text">або</span>
            <span className="login__decor-line"></span>
          </div>

          <form className='login__form' onSubmit={onFinish}>
            <p className='login__form-text'>
              Ім&apos;я
            </p>

            <input
              className={classNames('login__input', {
                'login__input--is-danger': hasNameError,
                'login__input--is-ok': !hasNameError && name
              })}
              name="email" 
              placeholder="Введи своє ім'я"
              autoComplete='off'
              value={name}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
            />

            {hasNameError? (
              <p className='login__input-error'>{hasNameError}</p>
            ) : (
              <p className='login__input-noerror'></p>
            )}

            <p className='login__form-text'>
              Прізвище
            </p>

            <input
              className={classNames('login__input', {
                'login__input--is-danger': hasLastNameError,
                'login__input--is-ok': !hasLastNameError && lastName
              })}
              name="last name" 
              placeholder="Введи своє прізвище"
              autoComplete='off'
              value={lastName}
              onChange={handleLastNameChange}
              onBlur={handleLastNameBlur}
            />

            {hasLastNameError ? (
              <p className='login__input-error'>{hasLastNameError}</p>
            ) : (
              <p className='login__input-noerror'></p>
            )}

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
                'login__input--is-danger': hasPasswordError,
                'login__input--is-ok': !hasPasswordError && password
              })} 
              type="password" 
              name="password" 
              placeholder="Введи свій пароль"
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
            />

            {hasPasswordError ? (
              <p className='login__input-error'>{hasPasswordError}</p>
            ) : (
              <p className='login__input-noerror'></p>
            )}

            <p className='login__form-text'>
              Підтвердити пароль
            </p>

            <input 
              className={classNames('login__input', {
                'login__input--is-danger': hasPasswordErrorOk,
                'login__input--is-ok': !hasPasswordErrorOk && passwordOk
              })} 
              type="password" 
              name="password" 
              placeholder="Підтверди свій пароль"
              value={passwordOk}
              onChange={handlePasswordOkChange}
              onBlur={handlePasswordOkBlur}
            />

            {hasPasswordErrorOk ? (
              <p className='login__input-error'>{hasPasswordErrorOk}</p>
            ) : (
              <p className='login__input-noerror'></p>
            )}

            <button className="login__button" disabled={disable}>
              {loader ? 'Загрузка...' : 'Зареєструватись'}
            </button>

            {error ? (
              <p className='login__input-error'>{error}</p>
            ) : (
              <p className='login__input-noerror'></p>
            )}

          </form>

          <Link to='/login' className="login__link">
            Повернутись до входу
          </Link>
        </div>
      </div>
    </>
  );
}

export default SigninForm;
