import axios from "axios";
import classNames from "classnames";
import Cookies from "js-cookie";
import './UserInfo.scss';
import { useEffect, useState } from "react";

export default function UserInfo() {
  const [name, setName] = useState('');
  const [hasNameError, setHasNameError] = useState('');

  const [lastName, setLastName] = useState('');
  const [hasLastNameError, setHasLastNameError] = useState('');

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState('');

  const [loader, setLoader] = useState(false);
  const [disable, setDisable] = useState(false);
  const [edit, setEdit] = useState(true);

  const token = Cookies.get('access_token');
  console.log(token);

  let hasError = false;

  useEffect(() => {
    axios.get('https://toy-shop-api.onrender.com/api/user/me/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      
      console.log('чотко', response);

      setName(response.data.first_name);
      setLastName(response.data.last_name);
      setEmail(response.data.email);
      setEdit(true);
    })
    .catch(error => {
      console.log('херня вийшла', error);
    });
  }, [token]);

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
  
  const onFinish = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleEmailBlur();
    handleLastNameBlur();
    handleNameBlur();
    setLoader(true);

    if (!hasError) {
      setDisable(true);
      
      const data = {
        email: email,
        first_name: name,
        last_name: lastName,
      };

      axios.patch('https://toy-shop-api.onrender.com/api/user/me/', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        
        console.log('чотко змінив', response);

        setName(response.data.first_name);
        setLastName(response.data.last_name);
        setEmail(response.data.email);
      })
      .catch(error => {
        console.log('Не вдалось Змінити', error);
      })
      .finally(() => {
        setLoader(false);
        setDisable(false);
      })
    };
  };


  return (
    <div className="user">
      <form id="formId" className='user__form' onSubmit={onFinish}>
        <p className='user__form-text'>
          Ім'я
        </p>

        <input
          className={classNames('user__input', {
            'user__input--is-danger': hasNameError,
            'user__input--is-ok': !hasNameError && name
          })}
          name="email" 
          placeholder="Введи своє ім'я"
          autoComplete='off'
          value={name}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          readOnly={edit}
        />

        {hasNameError? (
          <p className='user__input-error'>{hasNameError}</p>
        ) : (
          <p className='user__input-noerror'></p>
        )}

        <p className='user__form-text'>
          Прізвище
        </p>

        <input
          className={classNames('user__input', {
            'user__input--is-danger': hasLastNameError,
            'user__input--is-ok': !hasLastNameError && lastName
          })}
          name="last name" 
          placeholder="Введи своє прізвище"
          autoComplete='off'
          value={lastName}
          onChange={handleLastNameChange}
          onBlur={handleLastNameBlur}
          readOnly={edit}
        />

        {hasLastNameError ? (
          <p className='user__input-error'>{hasLastNameError}</p>
        ) : (
          <p className='user__input-noerror'></p>
        )}

        <p className='user__form-text'>
          Пошта
        </p>

        <input
          className={classNames('user__input', {
            'user__input--is-danger': hasEmailError,
            'user__input--is-ok': !hasEmailError && email
          })}
          name="email" 
          placeholder="Введи свою почту"
          autoComplete='off'
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          readOnly={edit}
        />

        {hasEmailError ? (
          <p className='user__input-error'>{hasEmailError}</p>
        ) : (
          <p className='user__input-noerror'></p>
        )}

        {edit === false ? (
          <button 
            type="submit"
            className="user__button" 
            disabled={disable} 
            onClick={() => setEdit(true)}
          >
            {loader ? 'Загрузка...' : 'Підтвердити'}
          </button>
        ): (
          <button 
            type="button"
            className="user__button"
            onClick={() => setEdit(false)}
          >
            Змінити
          </button>
        )}
      </form>
    </div>
  )
}
