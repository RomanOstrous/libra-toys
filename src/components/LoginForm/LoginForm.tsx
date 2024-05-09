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
import visibleOn from '../../assets/icons/visibility_on.svg';
import visibleOff from '../../assets/icons/visibility_off.svg';

import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';

interface TokenResponse {
  access: string;
  refresh: string;
}

interface LoginFormValues {
  email: string;
  password: string;
}

function LoginForm() {
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  const [disable, setDisable] = useState(false);
  const [timeoutId, setTimeoutId] =  useState<NodeJS.Timeout | null>(null);

  const base = process.env.REACT_APP_BASE_URL;
  const clientId = process.env.REACT_APP_CLIENT_ID;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email('Неправильний формат електронної пошти')
    .required(`Поле "Пошта" є обов'язковим`)
    .test('no-special-characters', 'Поле містить недопустимі символи', (value: string | undefined) => {
      return !value || !/[#$]/.test(value);
    }),
    
    password: Yup.string()
    .min(8, 'Пароль повинен містити принаймні 8 символів')
    .required(`Поле "Пароль" є обов'язковим`)
    .test('no-whitespace', 'Пароль не може містити пробіли', (value: string | undefined) => {
      return !value || !/\s/.test(value);
    }),
  });

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
            dispatch(actions.loginGoogle());
            navigate('/account');
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

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              const data = {
                email: values.email,
                password: values.password
              };

              setDisable(true);

              if (timeoutId) {
                clearTimeout(timeoutId);
              }

              try {
                setLoader(true);
                const response = await client.post<TokenResponse>('user/token/', data);
                const { access, refresh } = response;
        
                Cookies.set('access_token', access);
                Cookies.set('refresh_token', refresh);
                dispatch(actions.login());
                navigate('/account');
        
                console.log('Логін успішний:', response);
              } catch {
                setError('Схоже сталась помилка, перевірте правильність почти та паролю');
                
                const timeout = setTimeout(() =>{
                  setError('');
                }, 5000);

                setTimeoutId(timeout);
              } finally {
                setLoader(false);
                setDisable(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <InnerForm loader={loader} disable={disable} error={error}/>
            )}
            
          </Formik>

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

type Props = {
  loader: boolean,
  disable: boolean,
  error: string,
}

const InnerForm: React.FC<Props> = ({loader, disable, error}) => {
  
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const { errors, touched } = useFormikContext<LoginFormValues>();

  return (
    <Form noValidate className='login__form'>
      <div className="login__form">
        <p className="login__form-text">Пошта</p>
        <Field
          type="email"
          name="email"
          autoComplete="off"
          className={classNames('login__input', {
            'login__input--is-danger': errors.email && touched.email,
            'login__input--is-ok': !errors.email && touched.email
          })}
        />

        {errors.email && touched.email ? (
          <ErrorMessage name="email" component="div" className="login__input-error" />
        ) : (
          <p className='login__input-noerror'></p>
        )}

        <p className="login__form-text">Пароль</p>

        <div className="login__password">
          <Field
            type={showPassword ? 'text' : 'password'} 
            name="password"
            className={classNames('login__input', {
              'login__input--is-danger': errors.password && touched.password,
              'login__input--is-ok': !errors.password && touched.password
            })}
          />

          <button type="button" className="login__visible" onClick={togglePasswordVisibility}>
            {showPassword 
              ? <img src={visibleOn} alt="видно" />
              : <img src={visibleOff} alt="не видно" />
            }
          </button>
        </div>
        
        {errors.password && touched.password? (
          <ErrorMessage name="password" component="div" className="login__input-error" />
        ) : (
          <p className='login__input-noerror'></p>
        )}

        <button className="login__button" disabled={disable}>
          {loader ? 'Загрузка...' : 'Увійти'}
        </button>

        {error ? (
          <p className='login__input-error'>{error}</p>
        ) : (
          <p className='login__input-noerror'></p>
        )}
      </div>
    </Form>
  );
};
