import React from "react";
import './HomePage.scss';
import imgV from '../../assets/images/Vectours.png';
import img1 from '../../assets/images/chort.png';
import img2 from '../../assets/images/Group.png';

export const HomePage = () => {
  return (
    <>
      <div className="home">
        <img className="home__img" src={imgV} alt="homeImage" />
        <div className="home__box container grid">
          <div className="home__container grid__item--desktop-2-7 grid__item--tablet-1-6">
            <div className="home__info">
              <p className="home__info-title">
                <span style={{ color: '#F9B129' }}>Бренд</span>{' '}
                <span style={{ color: '#EA513F' }}>Шокуючих</span><br />
                іграшок
              </p>
              <p className="home__info-text">
                Приготуйся до розквіту креативу, оскільки ти знайшов круті іграшки від нашого нового хенд-мейд бренду.
                Libra_711 - це як мистецтво зустріло шаленість, і кожна іграшка – це справжній кусень творчості!
              </p>
            </div>
            <div className="home__container-image">
              <img className="home__image" src={img1} alt="homeImage" />
            </div>
          </div>

          <div className="home__info grid__item--desktop-2-7 grid__item--tablet-1-6">
            <p className="home__info-title">
              Наша <span style={{ color: '#0087BB' }}>місія</span> {' '}
            </p>
            <p className="home__info-subtitle">
              Чудовищнооооо красиві іграшки зі своею історією та вишуконаю якістю. 
            </p>
            <p className="home__info-text">
              Ці іграшки створені геніальними ручками, ніби кожен елемент – це шедевр на підпис.
              Так що ти не тільки робиш стейтмент у своїй кімнаті, але й отримуєш щось, що буде радувати тебе довгий час.
              Ми креативно ставлемось до екології тому що  не хочемо, щоб наша планета була як космічний смітник.
              Та перевикористовуемо матеріали, багато матеріалів приходять у наші іграшки з інших старих речей.
            </p>
          </div>

          <div className="home__container grid__item--desktop-2-7 grid__item--tablet-1-6">
            <div className="home__container-image">
              <img className="home__image" src={img2} alt="homeImage" />
            </div>
            <div className="home__info ">
              <p className="home__info-title">
                Майже як{' '}
                <span style={{ color: '#F9B129' }}>дитяча</span>{' '} 
                радість,{' '}
                але{' '}
                <span style={{ color: '#0087BB' }}>для</span>{' '}
                <span style={{ color: '#EA513F' }}>дорослих</span>
              </p>
              <p className="home__info-text">
                Замовляєш іграшку, а отримуєш враження, наче розпаковуєш подарунок від космічного іншопланетянина.
                І, бро, не віриш, які там сюрпризи в середині – вони як таємні ворота в альтернативний вимір!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
