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
              Сонячний домик для усіх ідей 
            </p>
            <p className="about__info-text">
              Дизайнерці цього бренда прийшла ідея, чому б не створити іграшку яка буде передавати їі почуття, давати щастя іншим. 
              Та ти саме ти зайшовши на наш сайт є тою людиною для якої ідея та тем єко іграшок та цікавого мистецтва не здається такою складною чи нудною.
              Ти в неї зацікавлен також як і ми тож давай росскажу тобі більше про цей бренд і його історію...
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
                  <span style={{ color: '#F9B129' }}>лібра</span>{' '}
                  – це{' '}
                  <span style={{ color: '#F9B129' }}>дві</span>{' '}
                  персони!
                </p>
                <p className="about__info-text">
                  Подруги, котрі товаришують з 2018 року. Спочатку Libra задумувалася, як магазин ручного розпису,
                  але так за весь час не однієї роботи у нас і не купили :( 
                  Прийшлося все закинути, тому аккаунт перейшов до мене, спочатку я займалася портретами 
                  + малювала обкладинки для альбомів з піснями, і тільки два роки назад я почала виконувати іграшки.
                </p>
              </div>
            </div>

          <div className="about__container grid__item--desktop-2-7 grid__item--tablet-1-6">
            <div className="about__info">
              <p className="about__info-title">
                Чому саме &quot;
                <span style={{ color: '#0087BB' }}>Л</span>
                <span style={{ color: '#EA513F' }}>і</span>
                бр
                <span style={{ color: '#F9B129' }}>а</span>
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
                також ми були одногрупницями, навчалися в Грекова на живописі – так і почали товаришувати!
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
