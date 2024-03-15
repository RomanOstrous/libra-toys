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
  const [loader, setLoader] = useState(false);
  const [disable, setDisable] = useState(false);
  const [edit, setEdit] = useState(true);

  const token = Cookies.get('access_token');
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

  const onFinish = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLastNameBlur();
    handleNameBlur();
    setLoader(true);

    if (!hasError) {
      setDisable(true);
      
      const data = {
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
        setEdit(true);
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
          })}
          name="email" 
          placeholder="Ім'я"
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
          })}
          name="last name" 
          placeholder="Прізвище"
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
          className='user__input'
          name="email" 
          placeholder="Введи свою почту"
          autoComplete='off'
          value={email}
          readOnly
        />

        {edit === false && (
          <button 
            type="submit"
            className="user__button" 
            disabled={disable} 
          >
            {loader ? 'Загрузка...' : 'Підтвердити'}
          </button>
        )}
      </form>

      {edit === true && (
        <button 
          type="button"
          className="user__button"
          onClick={() => setEdit(false)}
        >
          Змінити
        </button>
      )}
    </div>
  );
};
