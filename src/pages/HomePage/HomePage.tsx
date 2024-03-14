import './HomePage.scss';
import imgV from '../../assets/images/Vectours.png';

export const HomePage = () => {
  return (
    <>
      <img className="home__img" src={imgV} alt="homeImage" />
    </>
  );
};