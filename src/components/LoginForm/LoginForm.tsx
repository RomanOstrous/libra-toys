import './LoginForm.scss';
import Cookies from 'js-cookie';
import { useState } from 'react';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hook';
import { actions } from '../../app/authSlice';
import { client } from '../../services/httpClient';

interface TokenResponse {
  access: string;
  refresh: string;
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);

  const [password, setPassword] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(false);

  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  const [disable, setDisable] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
    setHasPasswordError(value.length < 8);
  };

  const onFinish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasEmailError(!email);
    setHasPasswordError(!password);

    if(!email || !password) {
      return;
    }

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
      navigate('/');

      console.log('Registration successful:', response);
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed')
      setTimeout(() =>{
        setError('');
      }, 5000);
    } finally {
      setLoader(false);
      setDisable(false);
    }
  };

  return (
    <>
      <h1>Вхід до аккаунту</h1>
      <form className='login__form box' onSubmit={onFinish}>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              className={classNames('input', {
                'is-danger': hasEmailError
              })}
              type="email" 
              name="email" 
              placeholder="Електронна почта"
              autoComplete='off'
              value={email}
              onChange={handleEmailChange}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input 
              className={classNames('input', {
                'is-danger': hasPasswordError
              })} 
              type="password" 
              name="password" 
              placeholder="Пароль"
              value={password}
              onChange={handlePasswordChange}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>

        <div className="login__error">
          {error}
        </div>

        <div className="field">
          <p className="control">
            <button className="button is-success" disabled={disable}>
              {loader ? 'Загрузка...' : 'Вхід'}
            </button>
          </p>

          <p>Немає аккаунту?</p>
          <Link to='/signin'> Зареєструватись</Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;