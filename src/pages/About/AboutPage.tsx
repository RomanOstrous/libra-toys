import React from "react";
import './About.scss';
import img1 from '../../assets/images/demon.png';
import img2 from '../../assets/images/divki.png';

export const AboutPage = () => {
  return (
    <> 
      <div className="about">
        <div className="about__box container grid">
          <div className="about__info grid__item--desktop-2-7 grid__item--tablet-1-6">
            <p className="about__info-title">
              <span style={{ color: '#0087BB' }}>Дитячий</span>{' '}
              д
              <span style={{ color: '#F9B129' }}>ом</span>{' '}
              іг
              <span style={{ color: '#EA513F' }}>раш</span>
              ок
            </p>
            <p className="about__info-subtitle">
              Сонячний домік для всіх ідей 
            </p>
            <p className="about__info-text">
              Дизайнерці цього бренда прийшла ідея: чому б не створити іграшку, яка буде передавати її почуття, дарувати щастя іншим.
              Та ти, саме ти, зайшовши на наш сайт, є тою людиною, для якої ідея та тема еко-іграшок та цікавого мистецтва не здаються такими складними чи нудними. 
              Ти в неї зацікавлений так само, як і ми, тож давай розкажу тобі більше про цей бренд і його історію...
            </p>
          </div>

            <div className="about__container grid__item--desktop-2-7 grid__item--tablet-1-6">
              <div className="about__container-image">
                <img className="about__image" src={img2} alt="aboutImage" />
              </div>
              <div className="about__info ">
                <p className="about__info-title">
                  <span style={{ color: '#EA513F' }}>Мало хто</span>{' '}
                  <span style={{ color: '#0087BB' }}>знає</span>
                  , але{' '}
                  <span style={{ color: '#F9B129' }}>Лібра</span>{' '}
                  – це{' '}
                  <span style={{ color: '#F9B129' }}>дві</span>{' '}
                  персони!
                </p>
                <p className="about__info-text">
                Подруги, які дружать з 2018 року. Спочатку Libra задумувалася як магазин ручного розпису,
                але за весь цей час ні однієї роботи у нас і не купили :( Прийшлося все закинути, тому аккаунт перейшов до мене.
                  Спочатку я займалася портретами і малювала обкладинки для альбомів з піснями,
                  і тільки два роки тому я почала виготовляти іграшки.
                </p>
              </div>
            </div>

          <div className="about__container grid__item--desktop-2-7 grid__item--tablet-1-6">
            <div className="about__info">
              <p className="about__info-title">
                Чому саме &quot;
                <span style={{ color: '#0087BB' }}>L</span>
                <span style={{ color: '#EA513F' }}>i</span>
                br
                <span style={{ color: '#F9B129' }}>a</span>
                _711&quot;?
              </p>
              <p className="about__info-subtitle">
                Ми двоє терезів, котрі народилися в жовтні:
              </p>
              <p className="about__info-text">
                <span style={{ color: '#F9B129' }}>11</span>{' '}
                – моє щасливе число;<br />
                <span style={{ color: '#0087BB' }}>7</span>{' '}
                – подруги;<br />
                А{' '}
                <span style={{ color: '#0087BB' }}>7</span>
                <span style={{ color: '#F9B129' }}>11</span>{' '}
                також номер кімнати в гуртожитку,
                де я проживала 4 роки; 
                також ми були одногрупницями, навчалися в Грекова на живописі - саме так ми і почали товаришувати!
              </p>
            </div>
            <div className="about__container-image">
              <img className="about__image" src={img1} alt="aboutImage" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
