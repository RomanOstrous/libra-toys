import React from "react";
import './SigninForm.scss';
import { useState } from 'react';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { client } from '../../services/httpClient';
import Google from "../../assets/icons/google.svg";

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
  //const [error, setError] = useState('');
  
  let hasError = false;
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
        console.log('Реєстрація успішна', response);
      } catch (error) {
        console.log('Не вдалось створити аккаунт', error);
        setName('');
        setLastName('')
        setEmail('');
        setPassword('');
        setPasswordOk('');
        // setError('Не вдалось створити аккаунт! Перевірте правильність даних.')
        setTimeout(() =>{
          // setError('');
        }, 5000);
      } finally {
        setLoader(false);
        setDisable(false);
      }
    }
  };

  return (
    <>
      <div className="signin container grid ">
        <div className="signin__container grid__item--desktop-3-6 grid__item--tablet-2-5">
          <h1 className='signin__title'>Зареєструватись</h1>
          <button className='signin__google'>
            <img src={Google} alt="" className='signin__google-ico'/>
            <p className='signin__google-text'>Через Google</p>
          </button>
          
          <div className="signin__decor">
            <span className="signin__decor-line"></span>
            <span className="signin__decor-text">або</span>
            <span className="signin__decor-line"></span>
          </div>

          <form className='signin__form' onSubmit={onFinish}>
            <p className='signin__form-text'>
              Ім&apos;я
            </p>

            <input
              className={classNames('signin__input', {
                'signin__input--is-danger': hasNameError,
                'signin__input--is-ok': !hasNameError && name
              })}
              name="email" 
              placeholder="Введи своє ім'я"
              autoComplete='off'
              value={name}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
            />

            {hasNameError? (
              <p className='signin__input-error'>{hasNameError}</p>
            ) : (
              <p className='signin__input-noerror'></p>
            )}

            <p className='signin__form-text'>
              Прізвище
            </p>

            <input
              className={classNames('signin__input', {
                'signin__input--is-danger': hasLastNameError,
                'signin__input--is-ok': !hasLastNameError && lastName
              })}
              name="last name" 
              placeholder="Введи своє прізвище"
              autoComplete='off'
              value={lastName}
              onChange={handleLastNameChange}
              onBlur={handleLastNameBlur}
            />

            {hasLastNameError ? (
              <p className='signin__input-error'>{hasLastNameError}</p>
            ) : (
              <p className='signin__input-noerror'></p>
            )}

            <p className='signin__form-text'>
              Пошта
            </p>

            <input
              className={classNames('signin__input', {
                'signin__input--is-danger': hasEmailError,
                'signin__input--is-ok': !hasEmailError && email
              })}
              name="email" 
              placeholder="Введи свою почту"
              autoComplete='off'
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
            />

            {hasEmailError ? (
              <p className='signin__input-error'>{hasEmailError}</p>
            ) : (
              <p className='signin__input-noerror'></p>
            )}

            <p className='signin__form-text'>
              Пароль
            </p>

            <input 
              className={classNames('signin__input', {
                'signin__input--is-danger': hasPasswordError,
                'signin__input--is-ok': !hasPasswordError && password
              })} 
              type="password" 
              name="password" 
              placeholder="Введи свій пароль"
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
            />

            {hasPasswordError ? (
              <p className='signin__input-error'>{hasPasswordError}</p>
            ) : (
              <p className='signin__input-noerror'></p>
            )}

            <p className='signin__form-text'>
              Підтвердити пароль
            </p>

            <input 
              className={classNames('signin__input', {
                'signin__input--is-danger': hasPasswordErrorOk,
                'signin__input--is-ok': !hasPasswordErrorOk && passwordOk
              })} 
              type="password" 
              name="password" 
              placeholder="Підтверди свій пароль"
              value={passwordOk}
              onChange={handlePasswordOkChange}
              onBlur={handlePasswordOkBlur}
            />

            {hasPasswordErrorOk ? (
              <p className='signin__input-error'>{hasPasswordErrorOk}</p>
            ) : (
              <p className='signin__input-noerror'></p>
            )}

            <button className="signin__button" disabled={disable}>
              {loader ? 'Загрузка...' : 'Зареєструватись'}
            </button>
          </form>

          <Link to='/login' className="signin__link">
            Повернутись до входу
          </Link>
        </div>
      </div>
    </>
  );
}

export default SigninForm;
