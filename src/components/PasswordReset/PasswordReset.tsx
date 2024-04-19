import React, { useEffect, useState } from "react";
import './PasswordReset.scss';
import Cookies from "js-cookie";
import arrow from '../../assets/icons/arrow.svg';
import classNames from "classnames";
import axios from "axios";

const PasswordReset = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [checkPasswordError, setCheckPasswordError] = useState('');
  const [button, setButton] = useState(false);
  const [loader, setLoader] = useState(false);
  const [disable, setDisable] = useState(true);
  const [edit, setEdit] = useState(true);

  const userId = sessionStorage.getItem('userID');
  const base = process.env.REACT_APP_BASE_URL;
  const token = Cookies.get('access_token');
  let hasError = false;
  const validator = !hasError && checkPassword.length > 8 && oldPassword.length > 8
    && newPassword.length > 8 && newPassword === checkPassword;

useEffect(() => {
  if (validator) {
    setDisable(false);
  }
}, [validator]);

  const handleOldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOldPassword(value);
    setOldPasswordError('');
  };

  const handleNewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewPassword(value);
    setNewPasswordError('');
  };

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCheckPassword(value);
    setCheckPasswordError('');
  };

  const handleOldBlur = () => {
    if (edit === false) {
      if (oldPassword.length < 8) {
        setOldPasswordError("Довжина паролю не менше 8 символів");
        hasError = true;
      }
    }
  };

  const handleNewBlur = () => {
    if (edit === false) {
      if (newPassword.length < 8) {
        setNewPasswordError("Довжина паролю не менше 8 символів");
        hasError = true;
      }
    }
  };

  const handleCheckBlur = () => {
    if (edit === false) {
      if (checkPassword !== newPassword) {
        setCheckPasswordError("Провірте правильність паролю");
        hasError = true;
      }
    }
  };

  const onFinish = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleNewBlur();
    handleOldBlur();
    handleCheckBlur();
    setLoader(true);

    if (!hasError) {
      setDisable(false);
      
      const data = {
        old_password: oldPassword,
        password: newPassword,
        password2: checkPassword,
      };

      axios.patch(base + `user/change_password/${userId}/`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        
        console.log('пароль змінено', response);
        setEdit(true);
      })
      .catch(error => {
        console.log('Не вдалось змінити пароль', error);
      })
      .finally(() => {
        setLoader(false);
        setDisable(false);
      })
    }
  };

  return (
    <div className="password">
      <button className="password__select" onClick={() => setButton(!button)}>
        <p className="password__title">Зміна паролю</p>
        <img 
          src={arrow} alt=""
          className={classNames("password__arrow", {
              "password__arrow-active": button === false 
            })} />
      </button>

      <div className={`password__info ${button === true ? 'password__info--visible' : ''}`}>
        <form className='password__form' onSubmit={onFinish}>
          <p className='password__form-text'>
            Старий пароль
          </p>

          <input
            className={classNames('password__input', {
              'password__input--is-danger': oldPasswordError,
            })}
            type="password"
            name="старий пароль" 
            placeholder="Введи старий пароль"
            autoComplete='off'
            value={oldPassword}
            onChange={handleOldChange}
            onBlur={handleOldBlur}
            readOnly={edit}
          />

          {oldPasswordError? (
            <p className='password__input-error'>{oldPasswordError}</p>
          ) : (
            <p className='password__input-noerror'></p>
          )}

          <p className='password__form-text'>
            Новий пароль
          </p>

          <input
            className={classNames('password__input', {
              'password__input--is-danger': newPasswordError,
            })}
            type="password"
            name="новий пароль" 
            placeholder="Введи новий пароль"
            autoComplete='off'
            value={newPassword}
            onChange={handleNewChange}
            onBlur={handleNewBlur}
            readOnly={edit}
          />

          {newPasswordError? (
            <p className='password__input-error'>{newPasswordError}</p>
          ) : (
            <p className='password__input-noerror'></p>
          )}

          <p className='password__form-text'>
            Повторно введи новий пароль
          </p>

          <input
            className={classNames('password__input', {
              'password__input--is-danger': checkPasswordError,
            })}
            type="password"
            name="спідтвердження паролю" 
            placeholder="Повторно введи новий пароль"
            autoComplete='off'
            value={checkPassword}
            onChange={handleCheckChange}
            onBlur={handleCheckBlur}
            readOnly={edit}
          />

          {checkPasswordError? (
            <p className='password__input-error'>{checkPasswordError}</p>
          ) : (
            <p className='password__input-noerror'></p>
          )}

          {edit === false && (
            <button 
              type="submit"
              className="password__button" 
              disabled={disable} 
            >
              {loader ? 'Загрузка...' : 'Підтвердити'}
            </button>
          )}
        </form>

        {edit === true && (
          <button 
            type="button"
            className="password__button"
            onClick={() => setEdit(false)}
          >
            Змінити
          </button>
        )}
      </div>
    </div>
  )
}

export default PasswordReset
