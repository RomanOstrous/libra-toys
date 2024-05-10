/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import '../../styles/style/PasswordReset.scss';
import classNames from 'classnames';
import { client } from '../../services/httpClient';
import { useNavigate, useSearchParams } from 'react-router-dom';
import visibleOn from '../../assets/icons/visibility_on.svg';
import visibleOff from '../../assets/icons/visibility_off.svg';


export default function PasswordResetPage() {
  const [password, setPassword] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [hasPasswordAgainError, setHasPasswordAgainError] = useState('');
  const [message, setMessage] = useState('');
  const [messageOk, setMessageOk] = useState('');
  const [loader, setLoader] = useState(false);
  const [disable, setDisable] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate= useNavigate();
  const token = searchParams.get('token');

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
    setHasPasswordError('');
    handlePasswordAgainBlur();
  };

  const handlePasswordBlur = () => {
    if (/\s/.test(password) || /[^\S ]/.test(password)) {
      setHasPasswordError('Введіть пароль без пробілів');
    } else if (password.length === 0) {
      setHasPasswordError('Введіть пароль');
    } else if (password.length < 8) {
      setHasPasswordError('Пароль повинен містити не менше 8 символів');
    }

    handlePasswordAgainBlur();
  };

  const handlePasswordAgainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPasswordAgain(value);
    setHasPasswordAgainError('');
    

    if (value === password) {
      setDisable(false);
    }
  };

  const handlePasswordAgainBlur = () => {
    if (passwordAgain.length === 0) {
      setHasPasswordAgainError('Введіть пароль повторно');
    } else if (passwordAgain !== password) {
      setHasPasswordAgainError('Схоже ви допустили помилку');
      setDisable(true);
    }
  }

  const handleClick = () => {
    handlePasswordAgainBlur();
    handlePasswordBlur();
    setLoader(true);

    if(!hasPasswordAgainError && !hasPasswordError) {
      client.post('user/password_reset/confirm/', {
        "password": password,
        "token": token,
      })
      .then((response: any) => {
        setLoader(false);
        setMessageOk('Посилання успішно надіслано');
        navigate('/login')
        console.log(response);
      })
      .catch((err: any) => {
        setLoader(false);
        setMessage('Сталась помилка, спробуй ще раз');
        console.log(err);
      })
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <div className="password-reset container grid">
      <div className="password-reset__container grid__item--desktop-3-6 grid__item--tablet-2-5">
        <p className='password-reset__title'>Новий пароль</p>
        
        <div className="password-reset__box">
          <p className='password-reset__text'>
            Новий пароль
          </p>

          <div className="login__password">
            <input
              className={classNames('password-reset__input', {
                'password-reset__input--is-danger': hasPasswordError,
                'password-reset__input--is-ok': !hasPasswordError && password
              })}
              name="Password" 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Введи новий пароль"
              autoComplete='off'
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
            />

            <button type="button" className="login__visible" onClick={togglePasswordVisibility}>
              {showPassword 
                ? <img src={visibleOn} alt="видно" />
                : <img src={visibleOff} alt="не видно" />
              }
            </button>
          </div>

          {hasPasswordError ? (
            <p className='password-reset__input-error'>{hasPasswordError}</p>
          ) : (
            <p className='password-reset__input-noerror'></p>
          )}

          <p className='password-reset__text'>
            Повторно введи новий пароль
          </p>

          <div className="login__password">
            <input
              className={classNames('password-reset__input', {
                'password-reset__input--is-danger': hasPasswordAgainError,
                'password-reset__input--is-ok': !hasPasswordAgainError && passwordAgain
              })}
              name="Password" 
              type={showPassword2 ? 'text' : 'password'} 
              placeholder="Повторно введи новий пароль"
              autoComplete='off'
              value={passwordAgain}
              onChange={handlePasswordAgainChange}
              onBlur={handlePasswordAgainBlur}
            />

            <button type="button" className="login__visible" onClick={togglePasswordVisibility2}>
              {showPassword2 
                ? <img src={visibleOn} alt="видно" />
                : <img src={visibleOff} alt="не видно" />
              }
            </button>
          </div>

          {hasPasswordAgainError ? (
            <p className='password-reset__input-error'>{hasPasswordAgainError}</p>
          ) : (
            <p className='password-reset__input-noerror'></p>
          )}
        </div>

        <button className="password-reset__button" disabled={disable} onClick={handleClick}>
          {loader ? 'Підтверджую...' : 'Підтвердити'}
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
